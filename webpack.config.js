import { join, dirname } from "path";
import { fileURLToPath } from 'url';
import nodeExternals from "webpack-node-externals";
import CopyWebpackPlugin from "copy-webpack-plugin"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "production",
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.js'],
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  plugins: [
		new CopyWebpackPlugin({
			patterns: [
        {
					from: "./src/package.build.json",
					to: "./package.json"
				},
        {
					from: "./src/ecosystem.config.cjs",
					to: "./ecosystem.config.cjs"
				}
			],
		})
	]
};
