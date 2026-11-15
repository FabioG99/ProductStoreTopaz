// Api - Error
import { HttpError } from "../../api/HttpError";

// Hooks
import { useDebounce } from "../../hooks/useDebounce";

// Interface
import { Paginated } from "../../api/interface/Paginated";
import { Categories } from "../../api/interface/Categories";

// Libraries
import { useEffect, useRef, useState } from "react";

// Services
import {
  getAllCategoryListService,
  getFilterCategoryService,
  getFilterProductService,
  getProductListServices
} from "../../api/services";

// Utils
import { isAbortError } from "../../shared/utils/generalFunction";

export const ProductsPresenter = () => {

  const PAGE_SIZE = 10;
  const allCategory: Categories = { slug: 'all', name: 'Todas', url: '' };
  const emptyPage: Paginated = { skip: 0, total: 0, limit: 0, products: [] };

  type Mode =
    | { type: 'all' }
    | { type: 'category'; category: Categories }
    | { type: 'search'; text: string };

  const [loading, setLoading] = useState<boolean>(false);
  const [filterProduct, setFilterProduct] = useState<string>("")
  const [optionsCategories, setOptionsCategories] = useState<Categories[]>([])
  const [activeCategory, setActiveCategory] = useState<Categories | undefined>(allCategory);
  const [optionsProducts, setoptionProducts] = useState<Paginated>(emptyPage)

  const modeRef = useRef<Mode>({ type: 'all' });
  const loadingRef = useRef<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  const productDebounce = useDebounce(filterProduct)

  useEffect(() => {
    if (productDebounce) getSearchProduct(productDebounce)
    else if (modeRef.current.type === 'search') getProductList(); // se vació el buscador
  }, [productDebounce])


  useEffect(() => {
    getProductList();
    getAllCategories();
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  async function getAllCategories() {
    try {
      const resp = await getAllCategoryListService();
      setOptionsCategories([allCategory, ...resp]);
    } catch (error) {
      console.error(error)
    }
  };

  async function getProductList(reset = true) {
    const { products, total } = optionsProducts;
    const hasMore = products.length > 0 && products.length < total;

    if (!reset && (loadingRef.current || !hasMore)) return;

    if (reset) {
      controllerRef.current?.abort();
      modeRef.current = { type: 'all' };
      setActiveCategory(allCategory);
      setoptionProducts(emptyPage);
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    loadingRef.current = true;
    setLoading(true);

    try {
      const skip = reset ? 0 : products.length;
      const resp = await getProductListServices(PAGE_SIZE, skip, controller.signal);
      if (controller.signal.aborted) return;

      setoptionProducts(prev =>
        reset ? resp : { ...resp, products: [...prev.products, ...resp.products] }
      );
    } catch (error) {
      if (isAbortError(error)) return; // cancelación: se ignora
      console.log('error:', error instanceof HttpError ? `${error.status} ${error.message}` : error);
    } finally {
      if (!controller.signal.aborted) {
        loadingRef.current = false;
        setLoading(false);
      }
    }
  }

  async function getFilterCategory(category: Categories, reset = true) {
    if (reset) setFilterProduct('');
    if (category.slug === 'all') return getProductList(reset);

    const { products, total } = optionsProducts;
    const hasMore = products.length > 0 && products.length < total;

    if (!reset && (loadingRef.current || !hasMore)) return;

    if (reset) {
      controllerRef.current?.abort();
      modeRef.current = { type: 'category', category };
      setActiveCategory(category);
      setFilterProduct(''); // categoría y búsqueda son excluyentes
      setoptionProducts(emptyPage);
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    loadingRef.current = true;
    setLoading(true);

    try {
      const skip = reset ? 0 : products.length;
      const resp = await getFilterCategoryService(category.slug, PAGE_SIZE, skip, controller.signal);
      if (controller.signal.aborted) return;

      setoptionProducts(prev =>
        reset ? resp : { ...resp, products: [...prev.products, ...resp.products] }
      );
    } catch (error) {
      if (isAbortError(error)) return;
      console.log('error:', error instanceof HttpError ? `${error.status} ${error.message}` : error);
    } finally {
      if (!controller.signal.aborted) {
        loadingRef.current = false;
        setLoading(false);
      }
    }
  }

  async function getSearchProduct(text: string, reset = true) {
    const { products, total } = optionsProducts;
    const hasMore = products.length > 0 && products.length < total;

    if (!reset && (loadingRef.current || !hasMore)) return;

    if (reset) {
      controllerRef.current?.abort();
      modeRef.current = { type: 'search', text };
      setActiveCategory(undefined); // durante una búsqueda no hay categoría activa
      setoptionProducts(emptyPage);
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    loadingRef.current = true;
    setLoading(true);

    try {
      const skip = reset ? 0 : products.length;
      const resp = await getFilterProductService(text, PAGE_SIZE, skip, controller.signal);
      if (controller.signal.aborted) return;

      setoptionProducts(prev =>
        reset ? resp : { ...resp, products: [...prev.products, ...resp.products] }
      );
    } catch (error) {
      if (isAbortError(error)) return;
      console.log('error:', error instanceof HttpError ? `${error.status} ${error.message}` : error);
    } finally {
      if (!controller.signal.aborted) {
        loadingRef.current = false;
        setLoading(false);
      }
    }
  };

  function loadMore() {
    const mode = modeRef.current;
    if (mode.type === 'search') getSearchProduct(mode.text, false);
    else if (mode.type === 'category') getFilterCategory(mode.category, false);
    else getProductList(false);
  }

  return {
    // Variables
    loading,
    filterProduct,
    activeCategory,
    optionsProducts,
    optionsCategories,

    // Actions
    loadMore,
    setFilterProduct,
    getFilterCategory,
  }
}
