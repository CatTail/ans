var express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    util = require('util'),
    logger = require('winston'),
    app;

app = exports = module.exports = express();

app.use(bodyParser.urlencoded());

app.use(require('./routes/rule'));
app.use(require('./routes/domain'));

app.use(function(req, res, next) {
    res.status(404).json({message: 'Not Found'});
});

app.use(function(err, req, res,  next) {
    if (!err) { return next(); }

    logger.error(util.inspect(err.stack || err.message || err));
    res.status(err.status || 500);
    res.json(err.stack || err.message || err);
});
