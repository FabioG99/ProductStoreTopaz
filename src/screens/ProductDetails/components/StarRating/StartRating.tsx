//Libraries
import { View, Text, DimensionValue } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

// Styles
import { StartRatingStyle } from './StartRatingStyle';
import { colors } from '../../../../shared/theme/colors';

// Presenter
import { StartRatingPresenter } from './StartRatingPresenter';

interface Props {
  rating: number;
  showValue?: boolean;
}

export const StarRating = ({ rating, showValue = true }: Props) => {

  const { stars, fillWidth, label } = StartRatingPresenter(rating);

  return (
    <View style={StartRatingStyle.row}>
      <View>
        <View style={StartRatingStyle.starsRow}>
          {stars.map(i => (
            <Ionicons
              key={i}
              size={16}
              name={'star'}
              color={colors.mutedLight}
            />
          ))}
        </View>
        <View style={[StartRatingStyle.fill, { width: fillWidth as DimensionValue }]}>
          <View style={StartRatingStyle.starsRow}>
            {stars.map(i => (
              <Ionicons
                key={i}
                size={16}
                name={'star'}
                color={colors.star}
              />
            ))}
          </View>
        </View>
      </View>
      {showValue && <Text style={StartRatingStyle.value}>{label}</Text>}
    </View>
  );
}
