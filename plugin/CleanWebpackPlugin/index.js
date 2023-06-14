const fs = require('fs');
const path = require('path');

class CleanWebpackPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        // 在将内存中 assets 内容写到磁盘文件夹之前
        compiler.hooks.emit.tapAsync('CleanWebpackPlugin', (compilation, callback) => {
            // 获取 output 路径，删除文件
            const outputPath = compiler.options.output.path;
            this.cleanOutputPath(outputPath);
            callback();
        });
    }

    cleanOutputPath(outputPath) {
        const files = fs.readdirSync(outputPath);

        files.forEach((file) => {
            const filePath = path.resolve(outputPath, file);
            this.removeFile(filePath);
        });
    }

    removeFile(filePath) {
        if (fs.lstatSync(filePath).isDirectory()) {
            const files = fs.readdirSync(filePath);

            files.forEach((file) => {
                const nestedFilePath = path.resolve(filePath, file);
                this.removeFile(nestedFilePath);
            });

            fs.rmdirSync(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    }
}

module.exports = CleanWebpackPlugin;