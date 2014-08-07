var express = require('express'),
    logger = require('morgan'),
    vhost = require('vhost'),
    config = require('./config');

var app = express();
var proxyServer = require('./apps/proxy');
var apiServer = require('./apps/api');
var webServer = require('./apps/web');

app.use(logger('dev'));

redis.get('DomainName', function(err, domainName) {
    if (domainName) {
        app.use(vhost(domainName, webServer));
        app.use(vhost(domainName, apiServer));
        app.use(proxyServer);
    } else {
        app.use(webServer);
        app.use('/api', apiServer);
    }
});

app.listen(config.port);
console.log('Express listen on:' + config.port);
