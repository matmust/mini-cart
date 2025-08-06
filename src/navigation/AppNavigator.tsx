import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../types';
import { CartScreen, ProductDetailScreen, ProductListScreen } from '../screens';
import { CartHeaderButton } from '../components';
import { colors } from '../constants';

const Stack = createStackNavigator<RootStackParamList>();

const renderCartHeaderButton = () => <CartHeaderButton />;

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='ProductList'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: renderCartHeaderButton,
      }}
    >
      <Stack.Screen
        name='ProductList'
        component={ProductListScreen}
        options={{
          title: 'Products',
        }}
      />
      <Stack.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={{
          title: 'Product Details',
        }}
      />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: 'Shopping Cart',
          headerRight: undefined,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
