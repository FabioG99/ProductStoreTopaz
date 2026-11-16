// Libraries
import { View } from 'react-native';

// Styles
import { useAppTheme } from '../../../../shared/theme/colors';
import { createSkeletonStyles } from './SkeletonStyles';

export const Skeleton = () => {
  const { colors } = useAppTheme();
  const SkeletonStyle = createSkeletonStyles(colors);

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
