class FederationPlugin {
    constructor(options = {}) {
      this.options = options;
    }
  
    apply(compiler) {
      const { name, filename, exposes, remotes } = this.options;
  
      compiler.hooks.thisCompilation.tap('FederationPlugin', (compilation) => {
        compilation.hooks.additionalAssets.tapAsync('FederationPlugin', (callback) => {
          const manifest = this.generateManifest(name, exposes, remotes);
          const content = `var __webpack_modules__ = (${JSON.stringify(manifest)});`;
  
          compilation.assets[filename] = {
            source: () => content,
            size: () => content.length
          };
  
          callback();
        });
      });
    }
  
    generateManifest(name, exposes, remotes) {
      const manifest = { name, exposes, remotes };
      return manifest;
    }
  }
  
  module.exports = FederationPlugin;