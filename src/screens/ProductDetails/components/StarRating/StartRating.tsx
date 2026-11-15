//Libraries
import { View, Text, DimensionValue } from 'react-native';

// Styles
import { StartRatingStyle } from './StartRatingStyle';

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
            <Text
              key={i}
              style={StartRatingStyle.empty}
            >
              {'★'}
            </Text>
          ))}
        </View>
        <View style={[StartRatingStyle.fill, { width: fillWidth as DimensionValue }]}>
          <View style={StartRatingStyle.starsRow}>
            {stars.map(i => (
              <Text
                key={i}
                style={StartRatingStyle.filled}
              >
                {'★'}
              </Text>
            ))}
          </View>
        </View>
      </View>
      {showValue && <Text style={StartRatingStyle.value}>{label}</Text>}
    </View>
  );
}
