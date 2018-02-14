const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    plugins: [
        new UglifyJsPlugin(
            {
            test: /\.js$/,
            exclude: /node_modules/
        })
    ],
    entry: './js/app.js',
    output: { filename: 'build/app.bundle.js' },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}

