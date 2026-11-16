module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    // ambos publican ESM
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@testing-library/react-native|zustand|immer)/)',
  ],
};
