const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
let argv = process.argv
let mode = argv[argv.length - 1]

module.exports = {
    mode,
    entry: ['./main.js'],
    resolve: {
        fallback: {
            fs: false
        }
    },
    resolve: {
        extensions: [".js", "json"]
    },
    output: {
        publicPath: '/',
        filename: "static/js/[name].[chunkhash:8].js",
        path: path.resolve(__dirname, "./dist")
    },
    devServer: {
        port: 9001,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "host app",
            inject: true,
            favicon: path.resolve("public/favicon.ico"),
            template: path.resolve("public/index.html")
        }),
        new ModuleFederationPlugin({
            name: "HostApp",
            remotes: {
                'RemoteApp': `RemoteApp@http://localhost:9000/remoteEntry.js?time=${new Date().getTime()}`
            },
            shared: []
        })
    ]
}