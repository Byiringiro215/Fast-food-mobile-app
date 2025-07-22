const { withNativeWind } = require('nativewind/metro');
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// Start with the Sentry config
let config = getSentryExpoConfig(__dirname);

// Wrap it with NativeWind
config = withNativeWind(config, { input: './app/global.css' });

module.exports = config;