import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    gap: spacing.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.large,
    paddingTop: spacing.medium,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.text,
  },
  clearText: {
    fontSize: fontSizes.medium,
    color: colors.secondary,
    fontWeight: '600',
  },
  footer: {
    padding: spacing.large,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.medium,
    marginTop: spacing.large,
  },
  continueButton: {
    flex: 1,
  },
  checkoutButton: {
    flex: 1,
  },
});
