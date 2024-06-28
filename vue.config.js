module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    lintOnSave: false, transpileDependencies: ['vuetify'],
    devServer: {
        https: false,
    },
    configureWebpack: {
        'resolve': {
            fallback: {
                'path': require.resolve("path-browserify")
            },
        }
        // return config;
    },
    pluginOptions: {
        electronBuilder: {
            externals: ['wcjs-prebuilt'],
            nodeIntegration: true,
        }
    },
}
