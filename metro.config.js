const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Step 1: Define your custom config (optional)
const customConfig = {
  // Example: you can add resolver or transformer settings here if needed
};

// Step 2: Merge with the default config
const mergedConfig = mergeConfig(getDefaultConfig(__dirname), customConfig);

// Step 3: Wrap with Reanimated config
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);

