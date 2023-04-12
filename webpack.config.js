/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check
'use strict';

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/


const path = require('path');
const webpack = require('webpack');

/** @type WebpackConfig */
const webExtensionConfig = {
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
	target: 'node', // extensions run in a node >>>  webworker context
	entry: {
		'extension': './src/extension.ts',
		//'test/suite/index': './src/web/test/suite/index.ts'
	},
	output: {
		filename: '[name].js',
		// eslint-disable-next-line no-undef
		path: path.join(__dirname, './dist'),
		libraryTarget: 'commonjs2',
		devtoolModuleFilenameTemplate: '../[resource-path]'
	},
	devtool: 'source-map', // create a source map that points to the original source file
	externals: {
		'vscode': 'commonjs vscode', // ignored because it doesn't exist
	},
	resolve: {
		mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
		extensions: ['.ts', '.js'], // support ts-files and js-files
		alias: {
			// provides alternate implementation for node module and source files
		},
		fallback: {
			// Webpack 5 no longer polyfills Node.js core modules automatically.
			// see https://webpack.js.org/configuration/resolve/#resolvefallback
			// for the list of Node.js core module polyfills.
			// eslint-disable-next-line no-undef
			//'assert': require.resolve('assert')
		}
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				loader: 'ts-loader'
			}]
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser', // provide a shim for the global `process` variable
		}),
	],
	performance: {
		hints: false
	},
	infrastructureLogging: {
		level: "log", // enables logging required for problem matchers
	},
};

// eslint-disable-next-line no-undef
module.exports = [ webExtensionConfig ];1