// Libraries
import { NavigationProp, useNavigation } from "@react-navigation/native";

// Interface
import { DashboardList } from "../Navigation/types";

// Store
import { useProductStore } from "../../store/ProductsStore";

export const FavoriteProductsPresenter = () => {

  const { navigate } = useNavigation<NavigationProp<DashboardList>>();

  // Store - States
  const productStore = useProductStore((state) => state.products);

  const handlePressProducst = () => {
    navigate("Products");
  }

  return {
    // Variables
    productStore,

    // Actions
    handlePressProducst
  }
}
