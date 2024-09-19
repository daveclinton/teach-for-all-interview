const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  cacheVersion: 'mobile-app',
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],
    // Ensure that Metro resolves libraries within the workspace
    nodeModulesPaths: [
      `${__dirname}/../../node_modules`,  // Points to root node_modules
      `${__dirname}/../../libs/screens/src`,  // Add your libs/screens path here
    ],
  },
};

module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  debug: false,
  extensions: [],
  watchFolders: [
    `${__dirname}/../../libs`,  // Add workspace libs to watch folders
  ],
});
