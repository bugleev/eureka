const path = require("path");

module.exports = {
	entry: {
		app: "./public/js/search.js"
	},
	output: {
		path: path.resolve(__dirname, "public" , "dist"),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["env"]
				}
			}
		]
	}
};
