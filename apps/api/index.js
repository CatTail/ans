var express = require('express'),
    router = express.Router(),
    util = require('util'),
    logger = require('winston'),
    app;

app = exports = module.exports = express();

app.use(require('./routes/rule'));
app.use(require('./routes/domain'));

app.use(function(req, res, next) {
    res.json(404, 'Not Found');
});

app.use(function(err, req, res,  next) {
    if (!err) { return next(); }

    logger.error(util.inspect(err));
    res.status(err.status || 500);
    res.json(err.stack || err.message || err);
});
