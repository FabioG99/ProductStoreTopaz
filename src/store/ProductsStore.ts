// Libraries
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Interface
import { Product } from '../api/interface/Product';

interface ProductState {
  products: Product[]
}

interface Actions {
  addProductsFavorites: (product: Product) => void;
  removeProductsFavorites: (id: number) => void;
}

const initialState: ProductState = {
  products: [],
}

export const useProductStore = create<ProductState & Actions>()(
  devtools(
    immer((set) => ({
      ...initialState,

      addProductsFavorites: (product) =>
        set((state) => {
          state.products.push(product)
        }, false, 'addProductsFavorites'),

      removeProductsFavorites: (id) =>
        set((state) => {
          state.products = state.products.filter((product) => product.id !== id);
        }, false, 'removeProductsFavorites'),
    })),
  )
)