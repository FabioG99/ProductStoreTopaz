import { fireEvent, render, screen } from '@testing-library/react-native';
import { Product } from '../../../src/api/interface/Product';
import { ProductCard } from '../../../src/components/ProductCard/ProductCard';
import { useProductStore } from '../../../src/store/ProductsStore';

// useNavigation devuelve solo `navigate`; se declara con prefijo "mock" para poder usarla dentro de jest.mock
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

// Config falso: constants.ts lanza error si API_BASE_URL no existe
jest.mock('react-native-config', () => ({
  __esModule: true,
  default: { API_BASE_URL: 'https://dummyjson.com' },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock('@d11/react-native-fast-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockFastImage = (props: object) => React.createElement(View, props);
  MockFastImage.cacheControl = { immutable: 'immutable' };

  return { __esModule: true, default: MockFastImage };
});

jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name }: { name: string }) =>
      React.createElement(Text, null, name),
  };
});

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (value: number) => ({ value }),
    useAnimatedStyle: (factory: () => object) => factory(),
    withSequence: (...animations: unknown[]) =>
      animations[animations.length - 1],
    withSpring: (value: number) => value,
  };
});

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
  thumbnail: 'https://example.test/phone.png',
} satisfies Product;

describe('ProductCard integration', () => {
  beforeEach(() => {
    // Reinicia el store y el mock de navegación entre pruebas
    useProductStore.setState({ products: [] });
    mockNavigate.mockClear();
  });

  it('muestra la información del producto y alterna su estado de favorito', () => {
    render(<ProductCard item={product} />);

    // Título, precio con descuento y precio original
    expect(screen.getByText('Phone')).toBeTruthy();
    expect(screen.getByText('$90.00')).toBeTruthy();
    expect(screen.getByText('$100.00')).toBeTruthy();

    // Primer press: agrega el producto a favoritos
    fireEvent.press(screen.getByText('heart'), {
      stopPropagation: jest.fn(),
    });
    expect(useProductStore.getState().products).toEqual([product]);

    // Segundo press: lo quita de favoritos
    fireEvent.press(screen.getByText('heart'), {
      stopPropagation: jest.fn(),
    });
    expect(useProductStore.getState().products).toEqual([]);
  });
});
