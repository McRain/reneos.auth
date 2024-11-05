import { join, dirname } from "path"
import { fileURLToPath } from 'url'
import webpack from 'webpack'

import pack from './package.json' with  {type: "json"}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "production",
  target: 'node',  
	context: __dirname,
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
  },
  externalsPresets: { node: true },
  plugins: [
    new webpack.DefinePlugin({
      APP_VERSION:JSON.stringify(pack.version)
    })
  ]
};
