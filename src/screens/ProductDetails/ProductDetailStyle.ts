import { StyleSheet } from 'react-native';
import { colors } from '../../shared/theme/colors';

export const ProductDetailStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  scrollContent: {
    gap: 20,
    paddingBottom: 40,
    marginHorizontal: 20,
  },

  // Carrousel
  carrusel: {
    height: 280,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
    backgroundColor: colors.card
  },
  btnFavorites: {
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 32,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    borderColor: colors.border,
    backgroundColor: colors.placeholder
  },

  // Info basic
  wrapInfo: {
    gap: 8,
  },
  wrapCategory: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    backgroundColor: colors.bgSecondary
  },
  textCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text
  },

  //Info prices
  wrapPrices: {
    gap: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
    backgroundColor: colors.card
  },
  wrapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleBadge: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedLight
  },
  badge: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    backgroundColor: colors.danger,
  },
  badgeText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
  },
  wrapValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  oldPrice: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    color: colors.mutedLight,
    textDecorationLine: 'line-through',
  },

  //Description
  wrap: {
    gap: 8,
  },
  titleDescription: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  productDescription: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.textSecondary,
  },

  //tags
  wrapTags: {
    gap: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  contentTag: {
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 30,
    alignSelf: 'flex-start',
    borderColor: colors.border,
    backgroundColor: colors.card
  },
  textTag: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text
  }
});