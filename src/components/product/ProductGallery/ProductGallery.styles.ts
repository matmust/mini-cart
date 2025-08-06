import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xs,
  },
  galleryContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.medium,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.small,
    gap: spacing.small,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  activeIndicator: {
    backgroundColor: colors.primary,
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  emptyGallery: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: spacing.medium,
  },
  placeholderText: {
    fontSize: fontSizes.medium,
    color: colors.textSecondary,
  },
});
