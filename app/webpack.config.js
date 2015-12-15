module.exports = {
    entry: './www/js/app.js',
    output: {
        path: '../server/public',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        // preLoaders: [
            // {
                // test: /\.js$/, // include .js files
                // exclude: /node_modules/, // exclude any and all files in the node_modules folder
                // loader: "jshint-loader"
            // }
        // ],
        loaders: [
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?sourceMap!sass?sourceMap'
            }
            // {
                // test: /\.jsx?$/,
                // exclude: /node_modules/,
                // loader: 'babel',
                // query: {
                    // presets: ['es2015'] //,
                    // cacheDirectory: true,
                    // plugins: ['transform-runtime']
                // }
            // }
        ]
    },
    sassLoader: {
        includePaths: ['./app/scss']
    }
};
