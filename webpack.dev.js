import { merge } from 'webpack-merge'
import common from './webpack.config.js'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
	mode: 'development',
	devtool: false,
	devServer: {
		compress: false,
		port: 20000,
		hot: false,
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		  'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
		historyApiFallback: {
		  index: ''
		},
		allowedHosts: ["all"],
		static: './dist'
	  },	
	optimization: {
		minimize: false,
    	runtimeChunk: false,
    	splitChunks: false
	},
	output: {
		publicPath: 'auto',
		clean: true,
		filename: '[name].js'
	}
});