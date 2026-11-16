// Components
import { ProductListSkeleton } from '../ProductListSkeleton/ProductListSkeleton';

// Libraries
import { View } from 'react-native';

// Styles
import { useAppTheme } from '../../../../shared/theme/colors';
import { createProductsInitialSkeletonStyles } from './ProductsInitialSkeletonStyles';

const categoryPlaceholders = [0, 1, 2, 3];

export const ProductsInitialSkeleton = () => {
  const { colors } = useAppTheme();
  const ProductsInitialSkeletonStyles =
    createProductsInitialSkeletonStyles(colors);

  return (
    <View style={ProductsInitialSkeletonStyles.container}>
      <View style={ProductsInitialSkeletonStyles.search} />
      <View style={ProductsInitialSkeletonStyles.categories}>
        {categoryPlaceholders.map(item => (
          <View
            key={item}
            style={[
              ProductsInitialSkeletonStyles.category,
              item === 0 && ProductsInitialSkeletonStyles.categoryWide,
            ]}
          />
        ))}
      </View>
      <ProductListSkeleton />
    </View>
  );
};
