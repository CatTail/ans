var minimatch = require('minimatch'),
    redis = require('redis').createClient(),
    proxy = require('http-proxy').createProxy();

var app = exports = module.exports = require('express')();

redis.get('rules', function(err, rules) {
    if (err) { throw err; }

    app.use(function (req, res, next) {
        for (var host in rules) {
            if (minimatch(req.header.host, host)) {
                proxy.web(req, res, { target: rules[host] }, callback);
                break;
            }
        }
        next();
    });
});
