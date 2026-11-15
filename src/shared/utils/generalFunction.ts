import { Params } from "../../api/interface/RequestOptions";
import { BASE_URL } from "./constants";

// Se arma a mano porque URLSearchParams está incompleto en React Native
export const buildUrl = (path: string, params?: Params): string => {
  const query = Object.entries(params ?? {})
    .filter(([, value]) => value !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return `${BASE_URL}${path}${query ? `?${query}` : ""}`;
};

export const isAbortError = (err: unknown): boolean =>
  typeof err === "object" &&
  err !== null &&
  (err as { name?: string }).name === "AbortError";


export const formatPrice = (value: number) => `$${value.toFixed(2)}`;

/* 
  Deja el descuento en un número válido entre 0 y 100
  (cubre undefined, null, NaN, negativos y valores mayores a 100)
*/
const normalizeDiscount = (discountPercentage?: number) =>
  Number.isFinite(discountPercentage)
    ? Math.min(Math.max(discountPercentage as number, 0), 100)
    : 0;

// Porcentaje real de la API (máx. 2 decimales) o null si no hay descuento
export const getDiscountValue = (discountPercentage?: number) =>
  Number(normalizeDiscount(discountPercentage).toFixed(2));

export const getDiscountedPrice = (price: number, discount: number) =>
  price * (1 - discount / 100);