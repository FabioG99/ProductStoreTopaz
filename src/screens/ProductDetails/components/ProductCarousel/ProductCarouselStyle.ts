import { StyleSheet } from "react-native";
import { colors } from "../../../../shared/theme/colors";

export const ProductCarouselStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  dots: {
    left: 0,
    right: 0,
    bottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: colors.mutedLight,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
});