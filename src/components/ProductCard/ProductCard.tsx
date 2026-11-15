// Interface
import { Product } from '../../api/interface/Product';

// Libraries
import { Image, Pressable, Text, View } from 'react-native';

// Presenter
import { ProductCardPresenter } from './ProductCardPresenter';

// Styles
import { colors } from '../../shared/theme/colors';
import { ProductCardStyles } from './ProductCardStyle';

// Utils
import { formatPrice } from '../../shared/utils/generalFunction';

export const ProductCard = ({ item }: { item: Product }) => {

  const {
    // Variables
    discount,
    hasDiscount,
    displayPrice,
    isFavoriteStore,

    // Actions
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
          <Image
            style={ProductCardStyles.image}
            source={{ uri: item.thumbnail }}
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
        <Text style={ProductCardStyles.title} numberOfLines={2}>{item?.title || ''}</Text>
        <View style={ProductCardStyles.priceRow}>
          <Text style={ProductCardStyles.price}>{formatPrice(displayPrice)}</Text>
          {hasDiscount && (
            <Text style={ProductCardStyles.oldPrice}>{formatPrice(item.price)}</Text>
          )}
        </View>
        <Pressable
          style={ProductCardStyles.btnFavorites}
          onPress={(event) => {
            event.stopPropagation();
            isFavoriteStore ? removeProductStore(item.id) : addProductStore(item);
          }}
        >
          <Text style={[ProductCardStyles.iconFavorite, { color: isFavoriteStore ? colors.danger : colors.mutedLight }]}>
            {'♥︎'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  )
}