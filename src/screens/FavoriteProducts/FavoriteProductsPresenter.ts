// Libraries
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Interface
import { RootTabParamList } from '../Navigation/types';

// Store
import { useProductStore } from '../../store/ProductsStore';

export const FavoriteProductsPresenter = () => {
  const { navigate } = useNavigation<NavigationProp<RootTabParamList>>();

  // Store - States
  const productStore = useProductStore(state => state.products);

  const handlePressProducst = () => {
    navigate('Products', { screen: 'ProductList' });
  };

  return {
    // Variables
    productStore,

    // Actions
    handlePressProducst,
  };
};
