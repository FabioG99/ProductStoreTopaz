module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/__tests__/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/(?:.*/)?(?:__mocks__|fixtures|test-utils)/',
  ],
  transformIgnorePatterns: [
    // ambos publican ESM
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@testing-library/react-native|zustand|immer)/)',
  ],
};
