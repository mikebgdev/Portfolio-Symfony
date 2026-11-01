const Encore = require('@symfony/webpack-encore').default;

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')

    .addEntry('app', './assets/app.js')

    .splitEntryChunks()

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')

    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())

    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push([require.resolve('babel-plugin-polyfill-corejs3'), {
            method: 'usage-global',
            version: require('core-js/package.json').version,
        }]);
    })

    .enableSassLoader()

    .copyFiles({
        from: './assets/images',

        to: 'images/[path][name].[ext]',
    })
;

module.exports = Encore.getWebpackConfig();
