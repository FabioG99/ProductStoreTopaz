import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Dashboard: NavigatorScreenParams<DashboardList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type DashboardList = {
  Products: undefined;
  Details: { ProductId: number };
  Favorites: undefined;
};

export type HomeTabScreenProps<T extends keyof DashboardList> =
  CompositeScreenProps<
    BottomTabScreenProps<DashboardList, T>,
    RootStackScreenProps<'Dashboard'>
  >;