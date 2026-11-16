// Libraries
import { View, FlatList } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

// Styles
import { useAppTheme } from '../../../../shared/theme/colors';
import { createProductCarouselStyles } from './ProductCarouselStyle';

// Presenter
import { ProductCarouselPresenter } from './ProductCarouselPresenter';

interface Props {
  images: string[];
}

export const ProductCarousel = ({ images }: Props) => {
  const { colors } = useAppTheme();
  const ProductCarouselStyle = createProductCarouselStyles(colors);
  const {
    // Variables
    size,
    itemIndex,
    showPagination,

    // Actions
    onLayout,
    onScrollEnd,
  } = ProductCarouselPresenter(images);

  return (
    <View onLayout={onLayout} style={ProductCarouselStyle.container}>
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
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri: item,
                cache: FastImage.cacheControl.immutable,
              }}
              style={{ width: size.width, height: size.height }}
            />
          )}
        />
      )}
      {showPagination && (
        <View pointerEvents="none" style={ProductCarouselStyle.dots}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                ProductCarouselStyle.dot,
                index === itemIndex && ProductCarouselStyle.dotActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};
