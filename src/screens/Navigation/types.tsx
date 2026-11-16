import type {
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Dashboard: NavigatorScreenParams<RootTabParamList>;
  Details: { ProductId: number };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootTabParamList = {
  Products: NavigatorScreenParams<ProductsStackParamList>;
  Favorites: undefined;
};

export type ProductsStackParamList = {
  ProductList: undefined;
};

export type ProductDetailsRoute = RouteProp<RootStackParamList, 'Details'>;
export type ProductDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;
