const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');



module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};

