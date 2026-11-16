import { StyleSheet } from 'react-native';
import { colors } from '../../shared/theme/colors';

export const ProductStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // Search
  searchBox: {
    gap: 10,
    height: 54,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 18,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  searchInput: {
    flex: 1,
    height: 54,
    fontSize: 16,
    color: colors.text,
  },

  // Categories
  chips: {
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontWeight: '600',
    color: colors.text,
    fontSize: 15,
  },
  chipTextActive: {
    color: '#fff',
  },

  // Product Card
  listContent: {
    flexGrow: 1,
    paddingBottom: 24
  },
  // ActivityIndicator
  indicator: {
    margin: 10
  },
  error: {
    alignItems: 'center',
    gap: 12,
    margin: 20,
    padding: 24,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  errorText: {
    color: colors.text,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
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
});