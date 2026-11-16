import { StyleSheet } from 'react-native';
import { colors } from '../../shared/theme/colors';

export const RootStackStyles = StyleSheet.create({
  tabBar: {
    height: 88,
    backgroundColor: colors.card,
    borderTopColor: colors.border,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabBarItem: {
    paddingTop: 13,
  },
  badge: {
    top: -7,
    right: -10,
    height: 20,
    minWidth: 20,
    borderWidth: 2,
    borderRadius: 11,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    borderColor: colors.card,
    backgroundColor: colors.danger,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.card,
  },
});
