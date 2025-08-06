import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.large,
    left: spacing.xl,
  },
  discountBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: 8,
  },
  content: {
    paddingTop: spacing.small,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.small,
  },
  brandCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  brand: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  category: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.small,
    paddingVertical: 4,
    borderRadius: 4,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
    lineHeight: 32,
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ratingStockContainer: {
    flexDirection: 'column',
    gap: spacing.small,
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.small,
    fontSize: fontSizes.medium,
  },
  ratingText: {
    fontSize: fontSizes.medium,
    color: colors.textSecondary,
  },
  stock: {
    fontSize: fontSizes.small,
    color: colors.success,
    fontWeight: '600',
  },
  outOfStock: {
    color: colors.secondary,
  },
  priceContainer: {
    marginBottom: spacing.small,
  },
  price: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: fontSizes.large,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginBottom: spacing.xs,
  },
  discountedPrice: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  savings: {
    fontSize: fontSizes.small,
    color: colors.success,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginBottom: spacing.small,
  },
  descriptionTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.small,
  },
  description: {
    fontSize: fontSizes.medium,
    color: colors.text,
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: spacing.small,
  },
  quantitySection: {
    alignItems: 'center',
    gap: spacing.medium,
  },
});
