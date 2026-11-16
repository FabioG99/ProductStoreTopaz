import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../shared/theme/colors';

export const createProductCardStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    card: {
      padding: 20,
      borderWidth: 1,
      borderRadius: 24,
      marginBottom: 18,
      flexDirection: 'row',
      marginHorizontal: 20,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    imageWrap: {
      width: 105,
      height: 105,
    },
    image: {
      width: 105,
      height: 105,
      borderRadius: 20,
      backgroundColor: colors.placeholder,
    },
    badge: {
      top: 5,
      left: 8,
      borderRadius: 12,
      paddingVertical: 3,
      position: 'absolute',
      paddingHorizontal: 10,
      backgroundColor: colors.danger,
    },
    badgeText: {
      fontSize: 13,
      color: colors.card,
      fontWeight: '700',
    },
    info: {
      flex: 1,
      marginLeft: 18,
      justifyContent: 'center',
    },

    // Product Information
    title: {
      fontSize: 20,
      marginTop: 5,
      lineHeight: 21,
      fontWeight: '700',
      color: colors.text,
    },

    // Price
    priceRow: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    price: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    oldPrice: {
      fontSize: 12,
      marginLeft: 10,
      fontWeight: '500',
      color: colors.mutedLight,
      textDecorationLine: 'line-through',
    },
    btnFavorites: {
      top: -8,
      right: 0,
      width: 25,
      height: 25,
      borderWidth: 1,
      borderRadius: 100,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.border,
      backgroundColor: colors.placeholder,
    },
  });
