module.exports = {
  devServer: {
   stats: {
     colors: true,
     hash: false,
     version: false,
     timings: false,
     assets: false,
     chunks: false,
     modules: false,
     reasons: false,
     children: false,
     source: false,
     errors: false,
     errorDetails: false,
     warnings: false,
     publicPath: false
   }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
}
