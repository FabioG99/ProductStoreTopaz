import { HttpError } from "./HttpError";
import { RequestOptions } from "./interface/RequestOptions";
import { buildUrl, isAbortError } from "../shared/utils/generalFunction";

export async function http<T>(
  path: string,
  requestOptions: RequestOptions = {}
): Promise<T> {
  try {
    const { body, params, headers, ...fetchOptions } = requestOptions;
    const url = buildUrl(path, params);

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });

    const data = await response.json().catch(() => undefined);

    if (!response.ok) throw new HttpError(response.status, response.statusText, data);
    return data as T;

  } catch (err) {
    if (isAbortError(err) || err instanceof HttpError) throw err;
    throw new HttpError(0, "No se pudo conectar con el servidor");
  }

}