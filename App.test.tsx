import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(() => ({
    Navigator: jest.fn(({ children }) => children),
    Screen: jest.fn(({ children }) => children),
  })),
}));

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});
