import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './src/context';
import { AppNavigator } from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
};

export default App;
