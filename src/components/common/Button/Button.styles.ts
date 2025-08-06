import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

export const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: spacing.small,
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
  },
  textVariant: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  // Sizes
  small: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.large,
    minHeight: 52,
  },
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: fontSizes.medium,
  },
  secondaryText: {
    color: '#fff',
    fontSize: fontSizes.medium,
  },
  outlineText: {
    color: colors.primary,
    fontSize: fontSizes.medium,
  },
  textText: {
    color: colors.primary,
    fontSize: fontSizes.medium,
  },
  smallText: {
    fontSize: fontSizes.small,
  },
  mediumText: {
    fontSize: fontSizes.medium,
  },
  largeText: {
    fontSize: fontSizes.large,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
