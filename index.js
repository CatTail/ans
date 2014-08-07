var express = require('express'),
    logger = require('morgan'),
    vhost = require('vhost'),
    config = require('./config');

var app = express();
var proxyServer = require('./apps/proxy');
var apiServer = require('./apps/api');
var webServer = require('./apps/web');

app.use(logger('dev'));

app.use(vhost(config.domain, webServer));
app.use(vhost('api.' + config.domain, apiServer));
app.use(proxyServer);

app.listen(config.port);
console.log('Express listen on:' + config.port);
