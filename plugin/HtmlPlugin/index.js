const fs = require('fs');
const path = require('path');

class HtmlWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('HtmlWebpackPlugin', (compilation, callback) => {
            const { outputOptions, assets } = compilation;
            const { publicPath } = outputOptions;
            const templatePath = path.resolve(__dirname, this.options.template);
            const outputPath = outputOptions.path;
            const outputFilename = this.options.filename || 'index.html';

            const htmlContent = this.generateHtml(publicPath, assets);

            fs.writeFileSync(path.join(outputPath, outputFilename), htmlContent);

            callback();
        });
    }

    generateHtml(publicPath, assets) {
        const { styles, scripts } = this.getAssetTags(publicPath, assets);

        const htmlTemplate = fs.readFileSync(this.options.template, 'utf-8');

        const processedTemplate = htmlTemplate.replace('{{styles}}', styles).replace('{{scripts}}', scripts);

        return processedTemplate;
    }

    getAssetTags(publicPath, assets) {
        let styles = '';
        let scripts = '';

        for (const assetName in assets) {
            const assetPath = assets[assetName].existsAt;
            const isStylesheet = assetName.endsWith('.css');
            const isScript = assetName.endsWith('.js');

            if (isStylesheet) {
                styles += `<link href="${publicPath}${assetName}" rel="stylesheet" />\n`;
            }

            if (isScript) {
                scripts += `<script src="${publicPath}${assetName}"></script>\n`;
            }
        }

        return { styles, scripts };
    }
}

module.exports = HtmlWebpackPlugin;