// Libraries
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  withSpring,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

// Interface
import { Product } from "../../api/interface/Product";
import { RootStackParamList } from "../../screens/Navigation/types";

// Store
import { useProductStore } from "../../store/ProductsStore";

// Utils
import { getDiscountedPrice, getDiscountValue } from "../../shared/utils/generalFunction";

export const ProductCardPresenter = (item: Product) => {

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  // Store - States
  const isFavoriteStore = useProductStore((state) => state.products.some((product) => product.id === item.id));
  
  // Store - Actions
  const addProductStore = useProductStore((state) => state.addProductsFavorites);
  const removeProductStore = useProductStore((state) => state.removeProductsFavorites);

  const favoriteScale = useSharedValue(1);

  const favoriteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  const discount = getDiscountValue(item.discountPercentage);
  const hasDiscount = discount > 0;
  const displayPrice = hasDiscount ? getDiscountedPrice(item.price, discount) : item.price;

  const toggleFavorite = () => {
    favoriteScale.value = withSequence(
      withSpring(1.35, { damping: 5 }),
      withSpring(1),
    );
  };

  const handlePressDetails = (ProductId: number) => {
    navigate("Details", { ProductId });
  }

  return {
    // Variables
    discount,
    hasDiscount,
    displayPrice,
    isFavoriteStore,
    favoriteAnimatedStyle,

    // Actions
    toggleFavorite,
    addProductStore,
    removeProductStore,
    handlePressDetails,
  }
}