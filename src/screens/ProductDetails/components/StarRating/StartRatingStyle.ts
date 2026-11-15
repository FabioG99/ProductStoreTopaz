
import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme/colors';

export const StartRatingStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  empty: {
    fontSize: 16,
    color: colors.mutedLight,
  },
  filled: {
    fontSize: 16,
    color: colors.star,
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  value: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600',
    color: colors.text,
  },
});