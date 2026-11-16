import { Component, ErrorInfo, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ErrorBoundaryStyles } from './ErrorBoundaryStyles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  resetKey: number;
}

export class ErrorBoundary extends Component<Props, State> {
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
        <View style={ErrorBoundaryStyles.container}>
          <Text style={ErrorBoundaryStyles.title}>
            Ocurrió un error inesperado
          </Text>
          <Text style={ErrorBoundaryStyles.message}>
            No se pudo mostrar esta pantalla. Inténtalo de nuevo.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reintentar mostrar la aplicación"
            onPress={this.retry}
            style={ErrorBoundaryStyles.button}
          >
            <Text style={ErrorBoundaryStyles.buttonText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View key={this.state.resetKey} style={ErrorBoundaryStyles.root}>
        {this.props.children}
      </View>
    );
  }
}
