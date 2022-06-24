/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const os = require('os');

module.exports = {
  transpileDependencies: ['vuetify', 'vuex-composition-helpers'],
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commonVendors: {
            test: /[\\/]node_modules[\\/](moment|lodash|vuetify|sortable).*/,
            name: 'common-vendors-chunk',
            enforce: true,
            chunks: 'all',
            reuseExistingChunk: true
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  pluginOptions: {
    apollo: {
      lintGQL: true
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  chainWebpack: config => {
    config.plugin('fork-ts-checker').tap(args => {
      // const totalmem = Math.floor(os.totalmem() / 1024 / 1024); // get OS mem size
      const allowUseMem = 4096;
      // eslint-disable-next-line no-param-reassign
      args[0].memoryLimit = allowUseMem;
      return args;
    });
  }
};
