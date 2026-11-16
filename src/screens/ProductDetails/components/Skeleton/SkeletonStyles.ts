import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme/colors';

export const SkeletonStyle = StyleSheet.create({
  skeletonContent: {
    gap: 20,
    paddingTop: 20,
    marginHorizontal: 20,
  },
  skeletonImage: {
    height: 280,
    borderRadius: 16,
    backgroundColor: colors.placeholder,
  },
  skeletonCategory: {
    width: 100,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.placeholder,
  },
  skeletonTitle: {
    width: '75%',
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
  },
  skeletonRating: {
    width: 120,
    height: 18,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
  },
  skeletonPrice: {
    height: 90,
    borderRadius: 16,
    backgroundColor: colors.placeholder,
  },
  skeletonText: {
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
  },
  skeletonTextShort: {
    width: '65%',
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
  },
});
