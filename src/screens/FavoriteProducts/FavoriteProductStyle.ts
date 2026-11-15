import { StyleSheet } from 'react-native';
import { colors } from '../../shared/theme/colors';

export const FavoriteDetailStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.card
  },
  header: {
    gap: 10,
    height: 55,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger
  },
  circleIcon: {
    fontSize: 20,
    color: colors.card
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text
  },
  headerDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.mutedLight
  },
  // Flatlist
  listContent: {
    flexGrow: 1,
    paddingVertical: 24,
    backgroundColor: colors.bg
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 18,
  },
  imageWrap: {
    width: 130,
    height: 130,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: colors.placeholder,
  },
  badge: {
    position: 'absolute',
    top: 5,
    left: 8,
    backgroundColor: colors.danger,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
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

  // List Empty
  empty: {
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  emptyWrap: {
    gap: 20,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text
  },
  emptyDescription: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textSecondary

  },
  btnExplore: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  btnExploreText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.card,
  }
});