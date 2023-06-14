const path = require("path");
const FederationPlugin = require('./plugin/FederationPlugin/index')
const TestPlugin = require('./plugin/TestPlugin/index')
const CleanWebpackPlugin = require('./plugin/CleanWebpackPlugin/index')
const HtmlPlugin = require('./plugin/HtmlPlugin/index')
module.exports = {
    mode: 'production',
    entry: ['./index.js'],
    resolve: {
        fallback: {
            fs: false
        }
    },
    output: {
        filename: "static/js/[name].[chunkhash:8].js",
        path: path.resolve(__dirname, "./dist")
    },
    plugins:[
        new HtmlPlugin({
            title: "CMP",
            favicon: path.resolve("public/favicon.ico"),
            template: path.resolve("public/index.html")
        }),
        // new FederationPlugin({
        //     name:'tmx',
        //     remote: 'http://wwww.baidu.com'
        // }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/*', 'build/*.js']
        })
    ]
}