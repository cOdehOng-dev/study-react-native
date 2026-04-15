module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@domain': './src/domain',
          '@data': './src/data',
          '@presentation': './src/presentation',
          '@components': './src/presentation/components',
          '@theme': './src/presentation/theme',
        },
      },
    ],
  ],
};
