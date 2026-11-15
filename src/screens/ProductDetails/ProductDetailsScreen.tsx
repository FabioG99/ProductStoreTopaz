// Interfaces
import { ProductDetailsScreenProps } from '../Navigation/types';

// Components
import { ProductCarousel } from './components/ProductCarousel/ProductCarousel';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View } from 'react-native'

// Styles
import { colors } from '../../shared/theme/colors';
import { ProductDetailStyles } from './ProductDetailStyle';

// Presenter
import { ProductDetailsPresenter } from './ProductDetailsPresenter';

// Utils
import { formatPrice } from '../../shared/utils/generalFunction';
import { StarRating } from './components/StarRating/StartRating';

export const ProductDetails = ({ route }: ProductDetailsScreenProps) => {

  const {
    //Variables
    discount,
    displayPrice,
    productDetail,
    isFavoriteStore,

    // Actions
    addProductStore,
    removeProductStore
  } = ProductDetailsPresenter(route);

  return (
    <SafeAreaView style={ProductDetailStyles.safe} edges={['top']}>
      <ScrollView
        decelerationRate="normal"
        alwaysBounceVertical={false}
        contentContainerStyle={ProductDetailStyles.scrollContent}
      >
        <View style={ProductDetailStyles.carrusel}>
          <ProductCarousel
            key={productDetail?.id}
            images={productDetail?.images ?? []}
          />
          <Pressable
            style={ProductDetailStyles.btnFavorites}
            onPress={() => {
              if (productDetail) {
                isFavoriteStore ? removeProductStore(productDetail.id) : addProductStore(productDetail);
              }
            }}
          >
            <Text style={[ProductDetailStyles.iconFavorite, { color: isFavoriteStore ? colors.danger : colors.mutedLight }]}>
              {'♥︎'}
            </Text>
          </Pressable>
        </View>
        <View style={ProductDetailStyles.wrapInfo}>
          <View>
            <View style={ProductDetailStyles.wrapCategory}>
              <Text style={ProductDetailStyles.textCategory}>
                {productDetail?.category || ''}
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={1}
            style={ProductDetailStyles.productTitle}
          >
            {productDetail?.title || ''}
          </Text>
          <StarRating rating={productDetail?.rating || 0} />
        </View>
        <View style={ProductDetailStyles.wrapPrices}>
          <View style={ProductDetailStyles.wrapBadge}>
            <Text style={ProductDetailStyles.titleBadge}>
              PRECIO DE LISTA & OFERTA
            </Text>
            <View style={ProductDetailStyles.badge}>
              <Text style={ProductDetailStyles.badgeText}>Ahorras {discount}%</Text>
            </View>
          </View>
          <View style={ProductDetailStyles.wrapValue}>
            <Text style={ProductDetailStyles.price}>
              {formatPrice(displayPrice)}
            </Text>
            <Text style={ProductDetailStyles.oldPrice}>
              {formatPrice(productDetail?.price || 0)}
            </Text>
          </View>
        </View>
        <View style={ProductDetailStyles.wrap}>
          <Text style={ProductDetailStyles.titleDescription}>
            Descripción del Producto
          </Text>
          <Text style={ProductDetailStyles.productDescription}>
            {productDetail?.description || ''}
          </Text>
        </View>
        <View style={ProductDetailStyles.wrap}>
          <Text style={ProductDetailStyles.titleDescription}>
            Tags
          </Text>
          <View style={ProductDetailStyles.wrapTags}>
            {productDetail?.tags.map((tag, index) => (
              <View
                key={index}
                style={ProductDetailStyles.contentTag}
              >
                <Text style={ProductDetailStyles.textTag}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}