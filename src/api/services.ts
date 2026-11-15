// Api - Infraestructure
import { http } from "./http";
import { Categories } from "./interface/Categories";

// Interface
import { Product } from "./interface/Product";
import { Paginated } from "./interface/Paginated";

const getProductListServices = (limit = 0, skip = 0, signal?: AbortSignal) =>
  http<Paginated>("/products", { params: { limit, skip }, signal });

const getAllCategoryListService = () => http<Categories[]>("/products/categories");

const getFilterCategoryService = (category: string, limit = 0, skip = 0, signal?: AbortSignal) =>
  http<Paginated>(`/products/category/${category}`, { params: { limit, skip }, signal });

const getFilterProductService = (productName: string, limit = 0, skip = 0, signal?: AbortSignal) =>
  http<Paginated>(`/products/search`, { params: { q: productName, limit, skip }, signal });

const getByIdProductService = (id: number) =>
  http<Product>(`/products/${id}`);

export {
  getProductListServices,
  getAllCategoryListService,
  getFilterCategoryService,
  getFilterProductService,
  getByIdProductService
};