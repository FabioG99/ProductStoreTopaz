import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './screens/Navigation/RootStack';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { useAppTheme } from './shared/theme/colors';

function App() {
  const { colors, isDark } = useAppTheme();
  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.bg,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
  };

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.bg}
          barStyle={isDark ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer theme={navigationTheme}>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
