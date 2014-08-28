var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    logger = require('morgan'),
    vhost = require('vhost'),
    config = require('./config'),
    StatsD = require('node-statsd').StatsD;

// statsd
new StatsD({
    host: config.statsd.host,
    port: config.statsd.port,
    prefix: config.statsd.prefix,
    globalize: true
});

var httpServer = express();
var httpsServer = express();
var proxyServer = require('./apps/proxy');
var apiServer = require('./apps/api');
var webServer = require('./apps/web');

httpServer.use(logger('dev'));

httpServer.use(vhost(config.domain, webServer));
httpServer.use(vhost('api.' + config.domain, apiServer));
httpServer.use(proxyServer);
httpsServer.use(proxyServer);

http.createServer(httpServer).listen(config.port);
https.createServer({
    key: fs.readFileSync('./ssl/ca.key', 'utf8'),
    cert: fs.readFileSync('./ssl/ca.crt', 'utf8')
}, httpsServer).listen(config.httpsPort);
console.log('Express listen on:' + config.port);
