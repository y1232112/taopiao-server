
// const htmlWebpackPlugin=require('html-webpack-plugin');
// // const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack=require('webpack');
// let proxy = require('http-proxy-middleware');
//
// module.exports = {
//
//
//     entry: './home/index.js',
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     module: {
//         rules: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             use: 'babel-loader'
//         },
//             //     new webpack.NamedModulesPlugin(),
//             //     new webpack.HotModuleReplacementPlugin()
//         ]
//     },
//     // plugins: [
//     //     new HtmlWebpackpackPlugin({
//     //         template: "./templates/houtai1.html"
//     //     })
//     // ],
//     devServer: {
//         contentBase: './dist',
//         hot: true
//     }
// }
const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    }
}