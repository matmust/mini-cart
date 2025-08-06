import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.medium,
  },
  message: {
    fontSize: fontSizes.medium,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.large,
    lineHeight: 22,
  },
});
