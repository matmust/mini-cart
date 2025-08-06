import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './src/context';
import { AppNavigator } from './src/navigation';

const App: React.FC = () => {
  return (
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
  );
};

export default App;
