import { useColorScheme } from 'react-native';

const lightColors = {
  primary: '#4F46E5',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  mutedLight: '#94A3B8',
  placeholder: '#F1F5F9',
  danger: '#E11D48',
  dangerSoft: '#FDE8E8',
  info: '#0284C7',
  star: '#D97706',
  textSecondary: '#334155',
  bgSecondary: '#E7E8FA',
} as const;

const darkColors = {
  primary: '#A5B4FC',
  bg: '#0F172A',
  card: '#1E293B',
  border: '#334155',
  text: '#F8FAFC',
  mutedLight: '#94A3B8',
  placeholder: '#273449',
  danger: '#FB7185',
  dangerSoft: '#4C2630',
  info: '#38BDF8',
  star: '#FBBF24',
  textSecondary: '#CBD5E1',
  bgSecondary: '#302F55',
} as const;

export type ColorPalette = {
  [Key in keyof typeof lightColors]: string;
};

export function useAppTheme() {
  const isDark = useColorScheme() === 'dark';

  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
  };
}
