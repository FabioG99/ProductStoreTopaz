// Librerias
import { useEffect, useState } from "react";
import {
  withSpring,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// Interfaces
import { ProductDetailsRoute } from "../Navigation/types";
import { Product } from "../../api/interface/Product";

// Services
import { getByIdProductService } from "../../api/services";

// Store
import { useProductStore } from "../../store/ProductsStore";

// Utils
import { isAbortError } from "../../shared/utils/generalFunction";
import { getDiscountedPrice, getDiscountValue } from "../../shared/utils/generalFunction";


export const ProductDetailsPresenter = (route: ProductDetailsRoute) => {

  const [productDetail, setProducDetail] = useState<Product | undefined>(undefined);
  
  useEffect(() => {
    const controller = new AbortController();
    if (route.params?.ProductId) {
      getByIdProduct(route.params.ProductId, controller.signal)
    }
    return () => controller.abort();
  }, [route.params?.ProductId]);
  
  // Store - States
  const isFavoriteStore = useProductStore((state) => state.products.some((product) => product.id === productDetail?.id));
  
  // Store - Actions
  const addProductStore = useProductStore((state) => state.addProductsFavorites);
  const removeProductStore = useProductStore((state) => state.removeProductsFavorites);
  
  const discount = getDiscountValue(productDetail?.discountPercentage);
  const hasDiscount = discount > 0;
  const displayPrice = hasDiscount ? getDiscountedPrice(productDetail?.price || 0, discount) : productDetail?.price || 0;

  const favoriteScale = useSharedValue(1);

  const favoriteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  function animateFavorite() {
    favoriteScale.value = withSequence(
      withSpring(1.30, { damping: 5 }),
      withSpring(1),
    );
  }

  async function getByIdProduct(ProductId: number, signal: AbortSignal) {
    try {
      const resp = await getByIdProductService(ProductId, signal)
      if (signal.aborted) return;
      setProducDetail(resp);
    } catch (error) {
      if (isAbortError(error)) return;
      console.error(error)
    }
  };

  return {
    //Variables
    discount,
    displayPrice,
    productDetail,
    isFavoriteStore,
    favoriteAnimatedStyle,

    // Actions
    addProductStore,
    removeProductStore,
    animateFavorite
  }
}
