class TestPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        console.log(9, compiler)
    }
}