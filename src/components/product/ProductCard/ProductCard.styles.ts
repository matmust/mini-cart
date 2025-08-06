import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - spacing.medium * 3) / 2;

export const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 100,
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.small,
    left: spacing.small,
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.small,
    paddingVertical: 2,
    borderRadius: 4,
  },
  content: {
    padding: spacing.small,
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.small,
    lineHeight: 20,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  price: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: fontSizes.medium,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: spacing.small,
  },
  discountedPrice: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  rating: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  stock: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  outOfStock: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
});
