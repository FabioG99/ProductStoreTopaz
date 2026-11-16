import { HttpError } from './HttpError';
import { RequestOptions } from './interface/RequestOptions';
import { buildUrl, isAbortError } from '../shared/utils/generalFunction';

const REQUEST_TIMEOUT_MS = 15000;

function getHttpErrorMessage(status: number, statusText: string): string {
  if (status === 404) return 'No se encontró el recurso solicitado.';
  if (status >= 500)
    return 'El servidor no está disponible. Inténtalo más tarde.';
  if (statusText) return `La solicitud falló (${status}): ${statusText}.`;
  return `La solicitud falló con el código HTTP ${status}.`;
}

export async function http<T>(
  path: string,
  requestOptions: RequestOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const { signal: requestSignal } = requestOptions;
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  const abortRequest = () => controller.abort();

  if (requestSignal?.aborted) {
    controller.abort();
  } else {
    requestSignal?.addEventListener('abort', abortRequest, { once: true });
  }

  try {
    const { body, params, headers, ...fetchOptions } = requestOptions;
    const url = buildUrl(path, params);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });

    const responseText = await response.text();
    let data: unknown;

    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch {
        if (response.ok) {
          throw new HttpError(
            0,
            'El servidor devolvió una respuesta inválida.',
            undefined,
            'invalid-response',
          );
        }
        data = responseText;
      }
    }

    if (!response.ok) {
      throw new HttpError(
        response.status,
        getHttpErrorMessage(response.status, response.statusText),
        data,
      );
    }
    return data as T;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (timedOut) {
      throw new HttpError(
        0,
        'La solicitud tardó demasiado. Comprueba tu conexión e inténtalo de nuevo.',
        undefined,
        'timeout',
      );
    }
    if (requestSignal?.aborted || isAbortError(err)) throw err;
    throw new HttpError(
      0,
      'No se pudo conectar con el servidor. Comprueba tu conexión.',
      undefined,
      'network',
    );
  } finally {
    clearTimeout(timeoutId);
    requestSignal?.removeEventListener('abort', abortRequest);
  }
}
