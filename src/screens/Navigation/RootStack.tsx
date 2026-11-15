// Libraries
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { Products } from '../Products/ProductsScreen';
import { ProductDetails } from '../ProductDetails/ProductDetailsScreen';
import { FavoriteProducts } from '../FavoriteProducts/FavoriteProductsScreen';

// Types
import type { ProductsStackParamList, RootStackParamList, RootTabParamList } from './types';

const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();
const ProductsStackNavigator = createNativeStackNavigator<ProductsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

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

function DashboardTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{ title: "Productos", headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteProducts}
        options={{ title: "Favoritos", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const RootStack = () => {
  return (
    <RootStackNavigator.Navigator initialRouteName='Dashboard'>
      <RootStackNavigator.Screen
        name="Dashboard"
        component={DashboardTabs}
        options={{ headerShown: false }}
      />
      <RootStackNavigator.Screen
        name="Details"
        component={ProductDetails}
        options={{ title: 'Detalles del producto' , headerShown: false}}
      />
    </RootStackNavigator.Navigator>
  );
}

export default RootStack;