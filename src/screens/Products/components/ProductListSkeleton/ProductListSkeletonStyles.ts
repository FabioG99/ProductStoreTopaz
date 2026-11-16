import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme/colors';

export const ProductListSkeletonStyles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 8,
  },
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
  image: {
    width: 105,
    height: 105,
    borderRadius: 20,
    backgroundColor: colors.placeholder,
  },
  info: {
    flex: 1,
    gap: 10,
    marginLeft: 18,
    justifyContent: 'center',
  },
  favorite: {
    width: 25,
    height: 25,
    borderRadius: 100,
    alignSelf: 'flex-end',
    backgroundColor: colors.placeholder,
  },
  title: {
    width: '90%',
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
  },
  titleShort: {
    width: '65%',
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
  },
  price: {
    width: '40%',
    height: 18,
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: colors.placeholder,
  },
});
