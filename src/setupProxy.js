

// let express = require('express');

const { createProxyMiddleware } = require('http-proxy-middleware');
// import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

// const app = express();

// (() => {
//     app.use(createProxyMiddleware('/api1', { target: 'http://localhost:5000', changeOrigin: true }));
//     app.listen(3000);
// })();


module.exports = function (app) {
    app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
};

