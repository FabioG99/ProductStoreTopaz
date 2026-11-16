export const colors = {
  primary: '#4F46E5',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  mutedLight: '#CBD5E1',
  placeholder: '#F1F5F9',
  danger: '#F43F5E',
  dangerSoft: '#FDE8E8',
  info: '#38B2D8',
  star: '#F5A524',
  textSecondary: '#1E293B',
  bgSecondary: '#e7e8fa',
} as const;

export type ColorName = keyof typeof colors;
