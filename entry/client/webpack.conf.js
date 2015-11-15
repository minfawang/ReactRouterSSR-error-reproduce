var webpack = require('webpack');

var babelSettings = { stage: 0 };

if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  babelSettings.plugins = ['react-transform'];
  babelSettings.extra = {
    'react-transform': {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module']
      }, {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react']
      }]
    }
  };
}


var plugins = [];

if (process.env.NODE_ENV === 'production' && ! Meteor.isCordova) {
  plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.web.js'));
}

module.exports = {
  entry: './entry',
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: babelSettings,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};
