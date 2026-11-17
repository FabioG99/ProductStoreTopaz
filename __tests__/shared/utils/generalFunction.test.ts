jest.mock('react-native-config', () => ({
  __esModule: true,
  default: { API_BASE_URL: 'https://dummyjson.com/' },
}));

import { buildUrl, formatPrice, getDiscountValue, getDiscountedPrice } from '../../../src/shared/utils/generalFunction';

describe('generalFunction', () => {
  it('formatea los precios con dos decimales', () => {
    expect(formatPrice(12)).toBe('$12.00');
    expect(formatPrice(12.5)).toBe('$12.50');
  });

  it('limita el descuento entre 0 y 100', () => {
    expect(getDiscountValue(undefined)).toBe(0);
    expect(getDiscountValue(-10)).toBe(0);
    expect(getDiscountValue(125)).toBe(100);
    expect(getDiscountValue(12.345)).toBe(12.35);
    expect(getDiscountedPrice(100, 25)).toBe(75);
  });

  it('construye la URL con parámetros codificados y omite los undefined', () => {
    expect(
      buildUrl('/products/search', {
        q: 'phone case',
        limit: 10,
        skip: undefined,
      }),
    ).toBe('https://dummyjson.com/products/search?q=phone%20case&limit=10');
  });
});
