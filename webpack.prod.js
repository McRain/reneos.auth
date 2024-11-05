import { merge } from 'webpack-merge'
import common from './webpack.config.js'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

import CopyWebpackPlugin from "copy-webpack-plugin"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
	mode: 'production',
	devtool: false,
	optimization: {
		minimize: true,
		runtimeChunk: false,
		splitChunks: false
	},
	output: {
		publicPath: 'auto',
		clean: true,
		filename: '[name].js'
	},
	plugins: [
		new CopyWebpackPlugin({
		  patterns: [
			{
			  from: "./src/package.build.json",
			  to: "./package.json"
			}
		  ],
		})
	  ]
});