// Libraries
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

// Shared - Theme
import { useAppTheme } from './shared/theme/colors';

// Stack Navigation
import RootStack from './screens/Navigation/RootStack';

// Error
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

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
