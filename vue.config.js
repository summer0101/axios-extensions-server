module.exports = {
    productionSourceMap: false,
    devServer: {
        host: 'localhost',
        port: 8080,
    },
    css: { extract: false } // 强制内联css
}