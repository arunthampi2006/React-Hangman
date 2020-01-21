const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./wp-client-config')
const port = parseInt(process.env.port, 10) || '9000'

new webpackDevServer(webpack(config), {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    compress: true,
    hot: true,
    open: true,
    historyApiFallback: true
}).listen(port, 'localhost', (result, err) => {
        console.log(`Listening at the localhost:${port}`)
    }
)