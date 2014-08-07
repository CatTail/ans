var express = require('express'),
    serve = require('serve-static'),
    engines = require('consolidate'),
    app;

app = exports = module.exports = express();

app.set('views', 'apps/web/views');
app.set('view engine', 'html');
app.engine('html', engines.ejs);

app.use('/static', serve('static'));

app.get('/', function(req, res, next) {
    res.render('index');
});
