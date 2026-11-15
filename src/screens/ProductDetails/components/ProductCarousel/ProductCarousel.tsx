// Libraries
import { View, Image, FlatList } from 'react-native';

// Styles
import { ProductCarouselStyle } from './ProductCarouselStyle';

// Presenter
import { ProductCarouselPresenter } from './ProductCarouselPresenter';

interface Props {
  images: string[];
}

export const ProductCarousel = ({ images }: Props) => {

  const {
    // Variables
    size,
    itemIndex,
    showPagination,

    // Actions
    onLayout,
    onScrollEnd
  } = ProductCarouselPresenter(images);

  return (
    <View
      onLayout={onLayout}
      style={ProductCarouselStyle.container}
    >
      {size.width > 0 && (
        <FlatList
          horizontal
          data={images}
          pagingEnabled
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, i) => `${item}-${i}`}
          getItemLayout={(_, i) => ({
            length: size.width,
            offset: size.width * i,
            index: i,
          })}
          renderItem={({ item }) => (
            <Image
              resizeMode="contain"
              source={{ uri: item }}
              style={{ width: size.width, height: size.height }}
            />
          )}
        />
      )}
      {showPagination && (
        <View
          pointerEvents="none"
          style={ProductCarouselStyle.dots}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={[ProductCarouselStyle.dot, index === itemIndex && ProductCarouselStyle.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};