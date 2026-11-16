import { Component, ErrorInfo, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppTheme } from '../../shared/theme/colors';
import { createErrorBoundaryStyles } from './ErrorBoundaryStyles';

interface Props {
  children: ReactNode;
}

interface BoundaryProps extends Props {
  styles: ReturnType<typeof createErrorBoundaryStyles>;
}

interface State {
  hasError: boolean;
  resetKey: number;
}

class ErrorBoundaryContent extends Component<BoundaryProps, State> {
  state: State = {
    hasError: false,
    resetKey: 0,
  };

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error no controlado en la interfaz:', error, errorInfo);
  }

  private retry = () => {
    this.setState(state => ({
      hasError: false,
      resetKey: state.resetKey + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={this.props.styles.container}>
          <Text style={this.props.styles.title}>
            Ocurrió un error inesperado
          </Text>
          <Text style={this.props.styles.message}>
            No se pudo mostrar esta pantalla. Inténtalo de nuevo.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reintentar mostrar la aplicación"
            onPress={this.retry}
            style={this.props.styles.button}
          >
            <Text style={this.props.styles.buttonText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View key={this.state.resetKey} style={this.props.styles.root}>
        {this.props.children}
      </View>
    );
  }
}

export function ErrorBoundary({ children }: Props) {
  const { colors } = useAppTheme();
  const styles = createErrorBoundaryStyles(colors);

  return (
    <ErrorBoundaryContent styles={styles}>{children}</ErrorBoundaryContent>
  );
}
