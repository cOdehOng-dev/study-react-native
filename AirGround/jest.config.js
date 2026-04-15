module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@react-native-async-storage/async-storage': require.resolve(
      '@react-native-async-storage/async-storage/jest',
    ),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|@react-native-async-storage|react-native-screens|react-native-safe-area-context)/)',
  ],
};
