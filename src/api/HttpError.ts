export type HttpErrorKind = 'http' | 'network' | 'timeout' | 'invalid-response';

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
    public kind: HttpErrorKind = 'http',
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
