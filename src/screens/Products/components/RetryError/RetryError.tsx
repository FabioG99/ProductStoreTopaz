import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../../../../shared/theme/colors';
import { createProductStyles } from '../../ProductsStyle';

interface Props {
  message: string;
  onRetry: () => void;
}

export const RetryError = ({ message, onRetry }: Props) => {
  const { colors } = useAppTheme();
  const ProductStyles = createProductStyles(colors);

  return (
    <View style={ProductStyles.error}>
      <Text style={ProductStyles.errorText}>{message}</Text>
      <Pressable onPress={onRetry} style={ProductStyles.retryButton}>
        <Text style={ProductStyles.retryButtonText}>Reintentar</Text>
      </Pressable>
    </View>
  );
};
