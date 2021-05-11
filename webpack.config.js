const path = require('path');
const webpack = require('webpack');

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';
module.exports = [
    {
        entry: './src/index.ts',
        target: 'node',
        mode,
        devtool,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, 'dist'),
        },
        node: {
            __dirname: false,
            __filename: false,
        },
    },
];
