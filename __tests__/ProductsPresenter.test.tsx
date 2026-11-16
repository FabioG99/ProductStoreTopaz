import { act, renderHook, waitFor } from '@testing-library/react-native';
import {
  getAllCategoryListService,
  getFilterCategoryService,
  getFilterProductService,
  getProductListServices,
} from '../src/api/services';
import { Categories } from '../src/api/interface/Categories';
import { Paginated } from '../src/api/interface/Paginated';
import { Product } from '../src/api/interface/Product';
import { ProductsPresenter } from '../src/screens/Products/ProductsPresenter';

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: { API_BASE_URL: 'https://dummyjson.com' },
}));

jest.mock('../src/api/services', () => ({
  getAllCategoryListService: jest.fn(),
  getFilterCategoryService: jest.fn(),
  getFilterProductService: jest.fn(),
  getProductListServices: jest.fn(),
}));

const productoBase: Product = {
  id: 1,
  title: 'Teléfono de prueba',
  description: 'Un producto para las pruebas',
  category: 'smartphones',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 5,
  tags: ['teléfono'],
  brand: 'Marca de prueba',
  sku: 'PHONE-1',
  weight: 1,
  dimensions: { width: 1, height: 1, depth: 1 },
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: 'En stock',
  reviews: [],
  returnPolicy: '',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: '',
    updatedAt: '',
    barcode: '',
    qrCode: '',
  },
  images: [],
  thumbnail: 'https://example.test/phone.png',
};

const categoriaTelefonos: Categories = {
  slug: 'smartphones',
  name: 'Teléfonos',
  url: 'https://dummyjson.com/products/category/smartphones',
};

function createProduct(id: number, title: string): Product {
  return { ...productoBase, id, title, sku: `PHONE-${id}` };
}

function createPage(
  products: Product[],
  skip = 0,
  total = products.length,
): Paginated {
  return { products, skip, total, limit: 10 };
}

describe('ProductsPresenter', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .mocked(getAllCategoryListService)
      .mockResolvedValue([categoriaTelefonos]);

    jest
      .mocked(getProductListServices)
      .mockResolvedValue(createPage([productoBase]));

    jest.mocked(getFilterProductService).mockResolvedValue(createPage([]));

    jest.mocked(getFilterCategoryService).mockResolvedValue(createPage([]));
  });

  // Verifica que al montar el presenter se piden la primera página y las categorías,
  // y que las respuestas quedan disponibles en el estado.
  it('carga la primera página de productos al iniciar', async () => {
    const { result } = renderHook(() => ProductsPresenter());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getProductListServices).toHaveBeenCalledWith(
      10,
      0,
      expect.anything(),
    );
    expect(result.current.optionsProducts.products).toEqual([productoBase]);
    expect(result.current.optionsCategories).toContainEqual(categoriaTelefonos);
    expect(result.current.isInitialLoading).toBe(false);
  });

  // Verifica que el texto de búsqueda se envía al servicio después del debounce
  // y que los productos devueltos reemplazan los resultados anteriores.
  it('busca productos después del debounce', async () => {
    const productoBuscado = createProduct(2, 'Teléfono encontrado');
    jest
      .mocked(getFilterProductService)
      .mockResolvedValue(createPage([productoBuscado]));

    const { result } = renderHook(() => ProductsPresenter());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    jest.mocked(getFilterProductService).mockClear();

    act(() => {
      result.current.setFilterProduct('teléfono');
    });

    await waitFor(
      () => {
        expect(getFilterProductService).toHaveBeenCalledWith(
          'teléfono',
          10,
          0,
          expect.anything(),
        );
      },
      { timeout: 1500 },
    );

    await waitFor(() => {
      expect(result.current.optionsProducts.products).toEqual([
        productoBuscado,
      ]);
      expect(result.current.loading).toBe(false);
    });
  });

  // Verifica que seleccionar una categoría llama al endpoint correcto,
  // actualiza la categoría activa y borra el texto de búsqueda.
  it('filtra por categoría y limpia el texto de búsqueda', async () => {
    const productoCategoria = createProduct(3, 'Teléfono de la categoría');

    jest
      .mocked(getFilterProductService)
      .mockResolvedValue(createPage([productoBase]));

    jest
      .mocked(getFilterCategoryService)
      .mockResolvedValue(createPage([productoCategoria]));

    const { result } = renderHook(() => ProductsPresenter());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.setFilterProduct('teléfono');
    });

    await waitFor(() => {
      expect(getFilterProductService).toHaveBeenCalledWith(
        'teléfono',
        10,
        0,
        expect.anything(),
      );
    });

    jest.mocked(getFilterCategoryService).mockClear();

    act(() => {
      result.current.getFilterCategory(categoriaTelefonos);
    });

    expect(result.current.filterProduct).toBe('');

    await waitFor(() => {
      expect(getFilterCategoryService).toHaveBeenCalledWith(
        'smartphones',
        10,
        0,
        expect.anything(),
      );
      expect(result.current.optionsProducts.products).toEqual([
        productoCategoria,
      ]);
    });

    expect(result.current.activeCategory).toEqual(categoriaTelefonos);
  });

  // Verifica que loadMore solicita el siguiente skip y concatena esa página
  // con los productos que ya estaban cargados.
  it('carga la siguiente página y agrega sus productos a la lista', async () => {
    const primeraPagina = Array.from({ length: 10 }, (_, index) =>
      createProduct(index + 1, `Producto ${index + 1}`),
    );
    const segundaPagina = Array.from({ length: 10 }, (_, index) =>
      createProduct(index + 11, `Producto ${index + 11}`),
    );

    jest
      .mocked(getProductListServices)
      .mockResolvedValueOnce(createPage(primeraPagina, 0, 20))
      .mockResolvedValueOnce(createPage(segundaPagina, 10, 20));

    const { result } = renderHook(() => ProductsPresenter());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.optionsProducts.products).toHaveLength(10);
    });

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(getProductListServices).toHaveBeenCalledWith(
        10,
        10,
        expect.anything(),
      );
      expect(result.current.optionsProducts.products).toHaveLength(20);
    });
  });

  // Simula un fallo inicial y confirma que retry vuelve a consultar,
  // limpia el error y guarda los productos de la respuesta exitosa.
  it('muestra el error de productos y permite reintentar', async () => {
    const productoRecuperado = createProduct(4, 'Producto recuperado');

    jest
      .mocked(getProductListServices)
      .mockRejectedValueOnce(new Error('Fallo de red'))
      .mockResolvedValueOnce(createPage([productoRecuperado]));

    const { result } = renderHook(() => ProductsPresenter());

    await waitFor(() => {
      expect(result.current.error).toBe(
        'No se pudieron cargar los productos. Inténtalo de nuevo.',
      );
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(getProductListServices).toHaveBeenCalledTimes(2);
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.optionsProducts.products).toEqual([
        productoRecuperado,
      ]);
    });
  });

  // Simula un fallo al cargar categorías y confirma que retryCategories
  // vuelve a pedirlas y elimina el mensaje de error tras recuperarse.
  it('muestra el error de categorías y permite reintentar su carga', async () => {
    jest
      .mocked(getAllCategoryListService)
      .mockRejectedValueOnce(new Error('Fallo de red'))
      .mockResolvedValueOnce([categoriaTelefonos]);

    const { result } = renderHook(() => ProductsPresenter());

    await waitFor(() => {
      expect(result.current.categoriesError).toBe(
        'No se pudieron cargar las categorías. Inténtalo de nuevo.',
      );
    });

    act(() => {
      result.current.retryCategories();
    });

    await waitFor(() => {
      expect(getAllCategoryListService).toHaveBeenCalledTimes(2);
      expect(result.current.categoriesError).toBeNull();
      expect(result.current.optionsCategories).toContainEqual(
        categoriaTelefonos,
      );
    });
  });
});
