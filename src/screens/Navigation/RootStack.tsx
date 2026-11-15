// Libraries
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { Products } from '../Products/ProductsScreen';
import { ProductDetails } from '../ProductDetails/ProductDetailsScreen';
import { FavoriteProducts } from '../FavoriteProducts/FavoriteProductsScreen';

// Types
import type { DashboardList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<DashboardList>();

function DashboardTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={Products}
        options={{ title: "Productos", headerShown: false }}
      />
      <Tab.Screen
        name="Details"
        component={ProductDetails}
        options={{ title: "Detalles del Producto", headerShown: false }}
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
    <Stack.Navigator initialRouteName='Dashboard'>
      <Stack.Screen
        name="Dashboard"
        component={DashboardTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType { }
}

export default RootStack