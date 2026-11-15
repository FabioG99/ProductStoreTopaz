// Libraries
import { NavigationProp, useNavigation } from "@react-navigation/native";

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

  const discount = getDiscountValue(item.discountPercentage);
  const hasDiscount = discount > 0;
  const displayPrice = hasDiscount ? getDiscountedPrice(item.price, discount) : item.price;

  const handlePressDetails = (ProductId: number) => {
    navigate("Details", { ProductId });
  }

  return {
    // Variables
    discount,
    hasDiscount,
    displayPrice,
    isFavoriteStore,

    // Actions
    addProductStore,
    removeProductStore,
    handlePressDetails,
  }
}