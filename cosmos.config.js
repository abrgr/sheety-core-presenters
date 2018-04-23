module.exports = {
  containerQuerySelector: '#root',
  webpackConfigPath: 'react-scripts/config/webpack.config.dev',
  publicPath: 'public',
  fileMatch: [ '**/__fixtures__/**/*.fixture.js' ],
  // Optional: Create this file when you begin adding proxies
  proxiesPath: 'src/cosmos/proxies',
  hostname: '0.0.0.0'
};
