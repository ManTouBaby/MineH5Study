const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin =require('vue-loader/lib/plugin')

module.exports = {
    entry: path.resolve(__dirname, "./src/main.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: 'index.html'
        }),
        new vueLoaderPlugin()
    ],
    module: {
        rules: [
            {test:/\.css$/,use:["style-loader","css-loader"]},
            {test: /\.vue$/, use: "vue-loader"}
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }

}