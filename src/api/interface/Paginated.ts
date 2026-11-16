import { Product } from './Product';

export interface Paginated {
  total: number;
  skip: number;
  limit: number;
  products: Product[];
}
