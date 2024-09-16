const path = require('path');

module.exports = {
  entry: './js/index.js', // Il tuo file di partenza
  output: {
    filename: 'bundle.js', // Il file di output
    path: path.resolve(__dirname, 'dist'), // Cartella di destinazione
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Supporto per ES6+
          },
        },
      },
    ],
  },
  mode: 'development', // Usa 'production' per la versione finale
  devtool: 'source-map', // Per migliorare il debugging
};
