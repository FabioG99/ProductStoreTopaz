jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

import { Product } from '../src/api/interface/Product';
import { useProductStore } from '../src/store/ProductsStore';

const product = {
  id: 1,
  title: 'Phone',
  description: 'A phone',
  category: 'smartphones',
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 5,
  tags: [],
  brand: 'Example',
  sku: 'PHONE-1',
  weight: 1,
  dimensions: { width: 1, height: 1, depth: 1 },
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: '',
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
  thumbnail: '',
} satisfies Product;

describe('useProductStore', () => {
  beforeEach(() => {
    useProductStore.setState({ products: [] });
  });

  it('añade y elimina un favorito por ID del producto', () => {
    useProductStore.getState().addProductsFavorites(product);
    expect(useProductStore.getState().products).toEqual([product]);

    useProductStore.getState().removeProductsFavorites(product.id);
    expect(useProductStore.getState().products).toEqual([]);
  });

  it('elimina solo el favorito solicitado', () => {
    const anotherProduct = { ...product, id: 2, title: 'Tablet' };
    useProductStore.setState({ products: [product, anotherProduct] });

    useProductStore.getState().removeProductsFavorites(product.id);

    expect(useProductStore.getState().products).toEqual([anotherProduct]);
  });
});
