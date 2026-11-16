// Libraries
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// Interface
import { Product } from '../api/interface/Product';

interface ProductState {
  products: Product[];
}

interface Actions {
  addProductsFavorites: (product: Product) => void;
  removeProductsFavorites: (id: number) => void;
}

const initialState: ProductState = {
  products: [],
};

export const useProductStore = create<ProductState & Actions>()(
  devtools(
    persist(
      immer(set => ({
        ...initialState,

        addProductsFavorites: product =>
          set(
            state => {
              state.products.push(product);
            },
            false,
            'addProductsFavorites',
          ),

        removeProductsFavorites: id =>
          set(
            state => {
              state.products = state.products.filter(
                product => product.id !== id,
              );
            },
            false,
            'removeProductsFavorites',
          ),
      })),
      {
        name: 'productStore-favorites',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: state => ({ products: state.products }),
      },
    ),
  ),
);
