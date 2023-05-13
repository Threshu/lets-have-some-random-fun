module.exports = {
  transpileDependencies: ['vuetify'],

  configureWebpack: {
    devServer: {
      hot: true,
      watchOptions: {
        poll: true,
      },
    },
  },
};
