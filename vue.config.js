module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = 'Foodics Challange';
            args[0].icon = 'https://www.foodics.com/favicon.ico';
            return args;
        });
  },
  devServer: {
    proxy: {
      '^/*': {
        target: 'https://api.foodics.dev/v5',
        changeOrigin: true,
        logLevel: 'debug'
      },
    }
  }
};
