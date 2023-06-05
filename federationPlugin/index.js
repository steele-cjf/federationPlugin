class FederationPlugin {
    constructor (options) {
        console.log('插件被创建了')
        this._options = options
    }
    apply(compiler) {
        console.log(compiler)
        console.log('插件执行了')
    }
}
module.exports = FederationPlugin