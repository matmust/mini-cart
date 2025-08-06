import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

jest.mock('@react-navigation/stack', () => {
  const React = require('react');
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => 
        React.createElement('StackNavigator', {}, children),
      Screen: ({ children }: { children: React.ReactNode }) => 
        React.createElement('Screen', {}, children),
    }),
  };
});

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});
