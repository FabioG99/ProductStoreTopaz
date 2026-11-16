import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme/colors';

export const ProductsInitialSkeletonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    height: 54,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 18,
    marginHorizontal: 20,
    borderColor: colors.border,
    backgroundColor: colors.placeholder,
  },
  categories: {
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  category: {
    width: 90,
    height: 42,
    borderRadius: 100,
    backgroundColor: colors.placeholder,
  },
  categoryWide: {
    width: 105,
  },
});
