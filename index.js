var http = require('http'),
    express = require('express'),
    logger = require('morgan')('combined'),
    serve = require('serve-static'),
    redis = require('redis').createClient(),
    hostess = require('vhost'),
    config = require('./config');

var app = express();
var proxyServer = require('./apps/proxy');
var apiServer = require('./apps/api');


proxyServer.use(logger());
apiServer.use(logger());
apiServer.use(serve('static'));

redis.get('DomainName', function(err, domainName) {
    domainName ?
        app.use(vhost(domainName, apiServer)) :
        app.use(apiServer);
});

app.use(proxyServer);
hostess.use(function (req, res) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('404')
});

app.listen(config.port);
