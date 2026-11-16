import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../shared/theme/colors';

export const createErrorBoundaryStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    container: {
      flex: 1,
      gap: 16,
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.bg,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.text,
    },
    message: {
      fontSize: 15,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    button: {
      marginTop: 8,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 100,
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.card,
    },
  });
