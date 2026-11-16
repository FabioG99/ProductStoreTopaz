// Libraries
import { View } from 'react-native';

// Styles
import { SkeletonStyle } from './SkeletonStyles';

export const Skeleton = () => {
  return (
    <View style={SkeletonStyle.skeletonContent}>
      <View style={SkeletonStyle.skeletonImage} />
      <View style={SkeletonStyle.skeletonCategory} />
      <View style={SkeletonStyle.skeletonTitle} />
      <View style={SkeletonStyle.skeletonRating} />
      <View style={SkeletonStyle.skeletonPrice} />
      <View style={SkeletonStyle.skeletonText} />
      <View style={SkeletonStyle.skeletonTextShort} />
    </View>
  );
};
