import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.large,
    padding: spacing.medium,
  },
  content: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    marginLeft: spacing.medium,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.small,
  },
  title: {
    flex: 1,
    fontSize: fontSizes.medium,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 20,
  },
  removeButton: {
    padding: spacing.small,
    marginLeft: spacing.small,
  },
  removeIcon: {
    fontSize: fontSizes.large,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  brand: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  lowStock: {
    fontSize: fontSizes.small,
    color: colors.secondary,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.medium,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  savings: {
    fontSize: fontSizes.small,
    color: colors.success,
    fontWeight: '600',
  },
  quantityContainer: {
    marginLeft: spacing.medium,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.small,
  },
  totalLabel: {
    fontSize: fontSizes.medium,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
  },
});
