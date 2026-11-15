// Librerias
import { useEffect, useState } from "react"

// Interfaces
import { DashboardList } from "../Navigation/types";
import { RouteProp } from "@react-navigation/native";
import { Product } from "../../api/interface/Product";

// Services
import { getByIdProductService } from "../../api/services";
import { useProductStore } from "../../store/ProductsStore";
import { getDiscountedPrice, getDiscountValue } from "../../shared/utils/generalFunction";


export const ProductDetailsPresenter = (route: RouteProp<DashboardList, "Details">) => {

  const [productDetail, setProducDetail] = useState<Product | undefined>(undefined)

  useEffect(() => {
    if (route.params?.ProductId) {
      getByIdProduct(route.params.ProductId)
    }
  }, [route.params?.ProductId]);

  // Store - States
  const isFavoriteStore = useProductStore((state) => state.products.some((product) => product.id === productDetail?.id));

  // Store - Actions
  const addProductStore = useProductStore((state) => state.addProductsFavorites);
  const removeProductStore = useProductStore((state) => state.removeProductsFavorites);

  const discount = getDiscountValue(productDetail?.discountPercentage);
  const hasDiscount = discount > 0;
  const displayPrice = hasDiscount ? getDiscountedPrice(productDetail?.price || 0, discount) : productDetail?.price || 0;

  async function getByIdProduct(ProductId: number) {
    try {
      const resp = await getByIdProductService(ProductId)
      setProducDetail(resp);
    } catch (error) {
      console.error(error)
    }
  };

  return {
    //Variables
    discount,
    displayPrice,
    productDetail,
    isFavoriteStore,

    // Actions
    addProductStore,
    removeProductStore
  }
}
