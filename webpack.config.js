const path = require("path");
const FederationPlugin = require('./federationPlugin/index')
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
        new FederationPlugin({
            name:'tmx',
            remote: 'http://wwww.baidu.com'
        })
    ]
}