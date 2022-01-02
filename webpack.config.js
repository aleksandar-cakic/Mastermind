const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, 'client/dist'),
   filename: 'bundle.js'
 },
 entry: './client/src/index.jsx',
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   port: 3000,
   static: true
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     }
   ]
 },
 plugins: [new HtmlWebpackPlugin({template: 'client/src/index.html'})],
}