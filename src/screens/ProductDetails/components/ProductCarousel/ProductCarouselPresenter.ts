import { useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

export const ProductCarouselPresenter = (images: string[]) => {
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!size.width) return;
    setItemIndex(Math.round(event.nativeEvent.contentOffset.x / size.width));
  };

  return {
    // Variables
    size,
    itemIndex,
    showPagination: images.length > 1,

    // Actions
    onLayout,
    onScrollEnd,
  };
};
