// .storybook/main.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  stories: ['../../src/stories/**/*.stories.js', '../../src/stories/**/*.stories.ts'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    },
    '@storybook/addon-controls'
  ],

  webpackFinal: async config => {
    // Use Sass loader for vuetify components
    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });

    config.module.rules.push({
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../../src'),
          vue: 'vue/dist/vue.js',
          vue$: 'vue/dist/vue.esm.js'
        }
      }
    });

    // Return the altered config
    return config;
  }
};
