import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: spacing.medium,
    right: spacing.medium,
    backgroundColor: colors.success,
    padding: spacing.medium,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  icon: {
    fontSize: fontSizes.large,
    marginRight: spacing.medium,
  },
  message: {
    flex: 1,
    fontSize: fontSizes.medium,
    color: '#fff',
    fontWeight: '600',
  },
});
