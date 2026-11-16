// Libraries
import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { Products } from '../Products/ProductsScreen';
import { ProductDetails } from '../ProductDetails/ProductDetailsScreen';
import { FavoriteProducts } from '../FavoriteProducts/FavoriteProductsScreen';

// Styles
import { createRootStackStyles } from './RootStackStyle';
import { useAppTheme } from '../../shared/theme/colors';

// Store
import { useProductStore } from '../../store/ProductsStore';

// Types
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type {
  ProductsStackParamList,
  RootStackParamList,
  RootTabParamList,
} from './types';

type TabBarIconProps = Parameters<
  NonNullable<BottomTabNavigationOptions['tabBarIcon']>
>[0];

const Tab = createBottomTabNavigator<RootTabParamList>();
const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();
const ProductsStackNavigator =
  createNativeStackNavigator<ProductsStackParamList>();

function ProductsStack() {
  return (
    <ProductsStackNavigator.Navigator>
      <ProductsStackNavigator.Screen
        name="ProductList"
        component={Products}
        options={{ title: 'Productos', headerShown: false }}
      />
    </ProductsStackNavigator.Navigator>
  );
}

function ProductsTabIcon({ focused, color, size }: TabBarIconProps) {
  return (
    <Ionicons
      size={size}
      color={color}
      name={focused ? 'storefront' : 'storefront-outline'}
    />
  );
}

function FavoritesTabIcon({ focused, color, size }: TabBarIconProps) {
  const favoritesCount = useProductStore(state => state.products.length);

  const { colors } = useAppTheme();
  const RootStackStyles = createRootStackStyles(colors);

  return (
    <View>
      <Ionicons
        size={size}
        color={color}
        name={focused ? 'heart' : 'heart-outline'}
      />
      {favoritesCount > 0 && (
        <View style={RootStackStyles.badge}>
          <Text style={RootStackStyles.badgeText}>
            {favoritesCount > 99 ? '99+' : favoritesCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function DashboardTabs() {
  const { colors } = useAppTheme();
  const RootStackStyles = createRootStackStyles(colors);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: RootStackStyles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedLight,
        tabBarItemStyle: RootStackStyles.tabBarItem,
        tabBarLabelStyle: RootStackStyles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          title: 'Productos',
          headerShown: false,
          tabBarIcon: ProductsTabIcon,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteProducts}
        options={{
          title: 'Favoritos',
          headerShown: false,
          tabBarIcon: FavoritesTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const RootStack = () => {
  return (
    <RootStackNavigator.Navigator initialRouteName="Dashboard">
      <RootStackNavigator.Screen
        name="Dashboard"
        component={DashboardTabs}
        options={{ headerShown: false }}
      />
      <RootStackNavigator.Screen
        name="Details"
        component={ProductDetails}
        options={{ title: 'Detalles del producto', headerShown: false }}
      />
    </RootStackNavigator.Navigator>
  );
};

export default RootStack;
