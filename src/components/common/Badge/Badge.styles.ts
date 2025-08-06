import { StyleSheet } from 'react-native';
import { fontSizes } from '../../../constants';

export const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    minHeight: 16,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minHeight: 20,
  },
  large: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 24,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: fontSizes.small - 2,
  },
  mediumText: {
    fontSize: fontSizes.small,
  },
  largeText: {
    fontSize: fontSizes.medium,
  },
});
