import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.medium,
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  label: {
    fontSize: fontSizes.medium,
    color: colors.textSecondary,
  },
  value: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    color: colors.text,
  },
  savingsLabel: {
    fontSize: fontSizes.medium,
    color: colors.success,
  },
  savingsValue: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.medium,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  totalLabel: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
