var path = require('path');
var PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, '../../build'),
    filename: PROD ? 'alazyload.min.js' : 'alazyload.js'
  }
};