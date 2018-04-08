var webpack = require('webpack');

/*new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify('production')
	}
})*/

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist/assets',
		filename: 'bundle.js',
		sourceMapFilename: 'bundle.map',
		publicPath: 'assets'
	},
	devtool: '#source-map',
	devServer: {
		inline: true,
		contentBase: './dist',
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'stage-0', 'react']
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: 'json-loader',
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules&localIdentName=[local]--[hash:base64:5]!postcss-loader'
			}, 
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=10000'
			}
		]
	}/*,
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			warnings: false,
			mangle: true
		})
	]*/
}






