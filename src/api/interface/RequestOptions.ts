export type Params = Record<string, string | number | undefined>;

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: Params;
}