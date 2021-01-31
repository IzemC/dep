const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

	entry: path.resolve(__dirname,"src","main.js"),
	output: {
		path: path.resolve(__dirname,"dist"),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname,"src"),
				],
				loader: "babel-loader"
			},
			{
				test: /\.s?css$/,
				include:[
					path.resolve(__dirname),
				],
				use: [
					"style-loader","css-loader","sass-loader",
				],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html")
		}),
	],
	mode:"development",
	devServer: {
		historyApiFallback: true
	}

}
