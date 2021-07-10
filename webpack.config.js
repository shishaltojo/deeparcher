const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] }
			},
			{
				test: /\.js$/,
				use: ['source-map-loader'],
				enforce: 'pre'
			},
			{
				test: /\.bmp/,
				use: ['url-loader']
			}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'public/'),
		port: 3000,
		publicPath: 'http://localhost:3000/dist/',
		hotOnly: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};