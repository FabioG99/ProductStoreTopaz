import { Pressable, Text, View } from "react-native";
import { ProductStyles } from "../../ProductsStyle";

interface Props {
    message: string;
    onRetry: () => void;
};

export const RetryError = ({ message, onRetry }: Props) => (
  <View style={ProductStyles.error}>
    <Text style={ProductStyles.errorText}>{message}</Text>
    <Pressable onPress={onRetry} style={ProductStyles.retryButton}>
      <Text style={ProductStyles.retryButtonText}>Reintentar</Text>
    </Pressable>
  </View>
);
