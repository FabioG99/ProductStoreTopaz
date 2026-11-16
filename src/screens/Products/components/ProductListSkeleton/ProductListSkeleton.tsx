// Libraries
import { View } from 'react-native';

// Styles
import { ProductListSkeletonStyles } from './ProductListSkeletonStyles';

const skeletonItems = [0, 1, 2];

export const ProductListSkeleton = () => (
  <View style={ProductListSkeletonStyles.container}>
    {skeletonItems.map(item => (
      <View key={item} style={ProductListSkeletonStyles.card}>
        <View style={ProductListSkeletonStyles.image} />
        <View style={ProductListSkeletonStyles.info}>
          <View style={ProductListSkeletonStyles.favorite} />
          <View style={ProductListSkeletonStyles.title} />
          <View style={ProductListSkeletonStyles.titleShort} />
          <View style={ProductListSkeletonStyles.price} />
        </View>
      </View>
    ))}
  </View>
);
