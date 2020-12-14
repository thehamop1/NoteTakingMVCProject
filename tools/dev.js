import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from '../webpack.config';

const compiler = webpack(webpackConfig);

const serverConfig = {
  contentBase: path.resolve(__dirname, '../client'),
  historyApiFallback: true,
  hot: true,
  inline: true,
  stats: {
    colors: true
  },
  publicPath: webpackConfig.output.publicPath,
  proxy: {
    '/api/**': {
      target: 'http://localhost:1337',
      secure: false,
      changeOrigin: true
    },
  },
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '-1',
    'X-Frame-Options': 'SAMEORIGIN',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
};

const server = new WebpackDevServer(compiler, serverConfig);

server.use(require('webpack-hot-middleware')(compiler));

const host = 'localhost';
const port = 8080;

server.listen(port, host, (err) => {
  if (err) {
    console.log('[webpack-dev-server] failed to start: ', err);
  } else {
    const protocol = 'https';
    const openHost = host;
    const suffix = webpackConfig.output.publicPath;
    const openURL = `${protocol}://${openHost}:${port}/webpack-dev-server${suffix}`;

    const openMsg = `[webpack-dev-server] started: opening the app: ${openURL}`;
    console.log(openMsg);
  }
});

server.app.get('/reload', (req, res) => {
  // Tell connected browsers to reload.
  server.sockWrite(server.sockets, 'ok');
  res.sendStatus(200);
});

server.app.get('/invalid', (req, res) => {
  // Tell connected browsers some change is about to happen.
  server.sockWrite(server.sockets, 'invalid');
  res.sendStatus(200);
});
