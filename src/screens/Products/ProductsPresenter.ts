// Api - Error
import { HttpError } from '../../api/HttpError';

// Hooks
import { useDebounce } from '../../hooks/useDebounce';

// Interface
import { Paginated } from '../../api/interface/Paginated';
import { Categories } from '../../api/interface/Categories';

// Libraries
import { useEffect, useState } from 'react';

// Services
import {
  getAllCategoryListService,
  getFilterCategoryService,
  getFilterProductService,
  getProductListServices,
} from '../../api/services';

// Utils
import { isAbortError } from '../../shared/utils/generalFunction';

type Mode =
  | { type: 'all' }
  | { type: 'category'; category: Categories }
  | { type: 'search'; text: string };

// page = página a cargar, attempt = contador para forzar reintentos
type Request = { mode: Mode; page: number; attempt: number };

const PAGE_SIZE = 10;
const allCategory: Categories = { slug: 'all', name: 'Todas', url: '' };
const emptyPage: Paginated = { skip: 0, total: 0, limit: 0, products: [] };
const initialRequest: Request = { mode: { type: 'all' }, page: 0, attempt: 0 };

function fetchProducts(mode: Mode, skip: number, signal: AbortSignal) {
  switch (mode.type) {
    case 'search':
      return getFilterProductService(mode.text, PAGE_SIZE, skip, signal);
    case 'category':
      return getFilterCategoryService(
        mode.category.slug,
        PAGE_SIZE,
        skip,
        signal,
      );
    default:
      return getProductListServices(PAGE_SIZE, skip, signal);
  }
}

export const ProductsPresenter = () => {
  const [loading, setLoading] = useState<boolean>(true); // true: evita el parpadeo del "vacío" en el primer render
  const [initialLoadDone, setInitialLoadDone] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [categoriesAttempt, setCategoriesAttempt] = useState(0);
  const [filterProduct, setFilterProduct] = useState<string>('');
  const [optionsCategories, setOptionsCategories] = useState<Categories[]>([]);
  const [optionsProducts, setoptionProducts] = useState<Paginated>(emptyPage);
  const [request, setRequest] = useState<Request>(initialRequest);

  const productDebounce = useDebounce(filterProduct);

  // Derivado del modo: ya no hace falta un estado aparte
  const { mode } = request;
  const activeCategory =
    mode.type === 'category'
      ? mode.category
      : mode.type === 'all'
      ? allCategory
      : undefined;

  // 1) Categorías: cargar al montar y permitir reintentos
  useEffect(() => {
    const controller = new AbortController();
    setCategoriesError(null);
    getAllCategoryListService(controller.signal)
      .then(resp => {
        if (controller.signal.aborted) return;
        setOptionsCategories([allCategory, ...resp]);
      })
      .catch(categoryError => {
        if (isAbortError(categoryError)) return;
        setCategoriesError(
          categoryError instanceof HttpError
            ? categoryError.message
            : 'No se pudieron cargar las categorías. Inténtalo de nuevo.',
        );
      });
    return () => controller.abort();
  }, [categoriesAttempt]);

  // 2) El buscador solo traduce el texto (con debounce) a un request
  useEffect(() => {
    setRequest(prev => {
      if (productDebounce) {
        return {
          mode: { type: 'search', text: productDebounce },
          page: 0,
          attempt: 0,
        };
      }
      // se vació el buscador: vuelve a 'all' solo si estaba buscando
      return prev.mode.type === 'search' ? initialRequest : prev;
    });
  }, [productDebounce]);

  // 3) Único efecto que hace fetch; cada cambio de request cancela el anterior
  useEffect(() => {
    const controller = new AbortController();
    const skip = request.page * PAGE_SIZE;

    if (request.page === 0) setoptionProducts(emptyPage);
    setLoading(true);
    setError(null);

    fetchProducts(request.mode, skip, controller.signal)
      .then(resp => {
        if (controller.signal.aborted) return;
        // if (__DEV__) {
        //   console.log('[Products]', {
        //     mode: request.mode,
        //     requestedSkip: skip,
        //     responseSkip: resp.skip,
        //     limit: resp.limit,
        //     total: resp.total,
        //     returned: resp.products.length,
        //   });
        // }
        setoptionProducts(prev =>
          skip === 0
            ? resp
            : { ...resp, products: [...prev.products, ...resp.products] },
        );
      })
      .catch(requestError => {
        if (isAbortError(requestError)) return;
        setError(
          requestError instanceof HttpError
            ? requestError.message
            : 'No se pudieron cargar los productos. Inténtalo de nuevo.',
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          setInitialLoadDone(true);
        }
      });

    return () => controller.abort();
  }, [request]);

  // Handlers: solo cambian estado
  function getFilterCategory(category: Categories) {
    setFilterProduct(''); // categoría y búsqueda son excluyentes
    setRequest({
      mode:
        category.slug === 'all'
          ? { type: 'all' }
          : { type: 'category', category },
      page: 0,
      attempt: 0,
    });
  }

  function loadMore() {
    const { products, total } = optionsProducts;
    if (products.length === 0 || products.length >= total) return;

    const nextPage = Math.ceil(products.length / PAGE_SIZE);
    // idempotente: si esa página ya está pedida, no se crea un request nuevo
    setRequest(prev =>
      prev.page === nextPage ? prev : { ...prev, page: nextPage },
    );
  }

  function retry() {
    setRequest(prev => ({ ...prev, attempt: prev.attempt + 1 }));
  }

  function retryCategories() {
    setCategoriesAttempt(prev => prev + 1);
  }

  return {
    // Variables
    error,
    loading,
    filterProduct,
    activeCategory,
    optionsProducts,
    optionsCategories,
    categoriesError,
    isInitialLoading: !initialLoadDone,

    // Actions
    retry,
    retryCategories,
    loadMore,
    setFilterProduct,
    getFilterCategory,
  };
};
