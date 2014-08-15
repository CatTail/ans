var minimatch = require('minimatch'),
    redis = require('redis').createClient(),
    proxy = require('http-proxy').createProxy(),
    debug = require('debug')('proxy'),
    Rule = require('../../model/rule');

var app;
app = exports = module.exports = require('express')();

app.use(function (req, res, next) {
    Rule.getRuleList(function(err, rules) {
        if (err) { throw err; }

        var match = rules.some(function(rule) {
            if (minimatch(req.header('host'), rule.host)) {
                proxy.web(req, res, { target: rule.address }, next);
                return true;
            }
        });
        if (!match) {
            next();
        }
    });
});

app.use(function(req, res, next) {
    res.status(404).send('Not Found');
});

app.use(function(err, req, res, next) {
    debug('Error:', err);
    res.status(err.status || 500);
    res.send(err.message || err.stack || err);
});
