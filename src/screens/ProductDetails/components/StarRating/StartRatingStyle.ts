import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../../../shared/theme/colors';

export const createStartRatingStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starsRow: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    fill: {
      top: 0,
      left: 0,
      bottom: 0,
      overflow: 'hidden',
      position: 'absolute',
    },
    value: {
      fontSize: 14,
      marginLeft: 6,
      fontWeight: '600',
      color: colors.text,
    },
  });
