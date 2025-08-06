import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../types';
import { ProductDetailScreen, ProductListScreen } from '../screens';
import { CartHeaderButton } from '../components';
import { colors } from '../constants';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const headerRightComponent = useCallback(() => <CartHeaderButton />, []);

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
        headerRight: headerRightComponent,
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
