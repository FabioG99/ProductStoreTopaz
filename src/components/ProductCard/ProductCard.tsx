// Interface
import { Product } from '../../api/interface/Product';

// Libraries
import Animated from 'react-native-reanimated';
import { Pressable, Text, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { Ionicons } from '@react-native-vector-icons/ionicons';

// Presenter
import { ProductCardPresenter } from './ProductCardPresenter';

// Styles
import { useAppTheme } from '../../shared/theme/colors';
import { createProductCardStyles } from './ProductCardStyle';

// Utils
import { formatPrice } from '../../shared/utils/generalFunction';

export const ProductCard = ({ item }: { item: Product }) => {
  const { colors } = useAppTheme();
  const ProductCardStyles = createProductCardStyles(colors);

  const {
    // Variables
    discount,
    hasDiscount,
    displayPrice,
    isFavoriteStore,
    favoriteAnimatedStyle,

    // Actions
    toggleFavorite,
    addProductStore,
    removeProductStore,
    handlePressDetails,
  } = ProductCardPresenter(item);

  return (
    <Pressable
      style={ProductCardStyles.card}
      onPress={() => handlePressDetails(item.id)}
    >
      <View style={ProductCardStyles.imageWrap}>
        {item.thumbnail ? (
          <FastImage
            style={ProductCardStyles.image}
            source={{
              uri: item.thumbnail,
              cache: FastImage.cacheControl.immutable,
            }}
          />
        ) : (
          <View style={ProductCardStyles.image} />
        )}
        {hasDiscount && (
          <View style={ProductCardStyles.badge}>
            <Text style={ProductCardStyles.badgeText}>{discount}%</Text>
          </View>
        )}
      </View>
      <View style={ProductCardStyles.info}>
        <Text style={ProductCardStyles.title} numberOfLines={2}>
          {item?.title || ''}
        </Text>
        <View style={ProductCardStyles.priceRow}>
          <Text style={ProductCardStyles.price}>
            {formatPrice(displayPrice)}
          </Text>
          {hasDiscount && (
            <Text style={ProductCardStyles.oldPrice}>
              {formatPrice(item.price)}
            </Text>
          )}
        </View>
        <Pressable
          style={ProductCardStyles.btnFavorites}
          onPress={event => {
            event.stopPropagation();
            isFavoriteStore
              ? removeProductStore(item.id)
              : addProductStore(item);
            toggleFavorite();
          }}
        >
          <Animated.View style={favoriteAnimatedStyle}>
            <Ionicons
              size={18}
              name={'heart'}
              color={isFavoriteStore ? colors.danger : colors.mutedLight}
            />
          </Animated.View>
        </Pressable>
      </View>
    </Pressable>
  );
};
