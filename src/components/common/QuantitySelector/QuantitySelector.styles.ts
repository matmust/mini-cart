import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    height: 36,
  },
  button: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  smallButton: {
    width: 35,
  },
  largeButton: {
    width: 120,
  },
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonTextDisabled: {
    color: '#ccc',
  },
  quantityContainer: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  quantityText: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.text,
  },
});
