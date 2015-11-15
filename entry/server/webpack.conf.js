module.exports = {
  entry: './entry',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: { stage: 0 },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-collector!css',
      }
    ]
  }
};
