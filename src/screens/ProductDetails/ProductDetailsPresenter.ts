// Librerias
import { useEffect, useState } from 'react';
import {
  withSpring,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// Interfaces
import { ProductDetailsRoute } from '../Navigation/types';
import { Product } from '../../api/interface/Product';
import { HttpError } from '../../api/HttpError';

// Services
import { getByIdProductService } from '../../api/services';

// Store
import { useProductStore } from '../../store/ProductsStore';

// Utils
import { isAbortError } from '../../shared/utils/generalFunction';
import {
  getDiscountedPrice,
  getDiscountValue,
} from '../../shared/utils/generalFunction';

export const ProductDetailsPresenter = (route: ProductDetailsRoute) => {
  const [productDetail, setProducDetail] = useState<Product | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const productId = route.params?.ProductId;

    setProducDetail(undefined);
    setError(null);
    setLoading(true);

    if (!productId) {
      setError('No se indicó qué producto se debe cargar.');
      setLoading(false);
      return () => controller.abort();
    }

    async function loadProduct() {
      try {
        const product = await getByIdProductService(
          productId,
          controller.signal,
        );
        if (!controller.signal.aborted) setProducDetail(product);
      } catch (requestError) {
        if (isAbortError(requestError)) return;
        setError(
          requestError instanceof HttpError
            ? requestError.message
            : 'No se pudo cargar el producto. Inténtalo de nuevo.',
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [route.params?.ProductId, attempt]);

  // Store - States
  const isFavoriteStore = useProductStore(state =>
    state.products.some(product => product.id === productDetail?.id),
  );

  // Store - Actions
  const addProductStore = useProductStore(state => state.addProductsFavorites);
  const removeProductStore = useProductStore(
    state => state.removeProductsFavorites,
  );

  const discount = getDiscountValue(productDetail?.discountPercentage);
  const hasDiscount = discount > 0;
  const displayPrice = hasDiscount
    ? getDiscountedPrice(productDetail?.price || 0, discount)
    : productDetail?.price || 0;

  const favoriteScale = useSharedValue(1);

  const favoriteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  function animateFavorite() {
    favoriteScale.value = withSequence(
      withSpring(1.3, { damping: 5 }),
      withSpring(1),
    );
  }

  function retry() {
    setAttempt(prev => prev + 1);
  }

  return {
    //Variables
    loading,
    error,
    discount,
    displayPrice,
    productDetail,
    isFavoriteStore,
    favoriteAnimatedStyle,

    // Actions
    addProductStore,
    removeProductStore,
    animateFavorite,
    retry,
  };
};
