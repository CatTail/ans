var minimatch = require('minimatch'),
    koa = require('koa'),
    route = require('koa-route'),
    options,
    app = koa(),
    proxy = require('http-proxy').createProxy();

try {
    options = require('./route');
} catch (err) {
    options = options || {};
}

app.use(route.get('/manage', function *() {
    this.status = 200;
    this.body = 'manage';
}));

app.use(function *(next) {
    for (var host in options) {
        if (minimatch(this.request.header.host, host)) {
            yield function(callback) {
                proxy.web(this.req, this.res, {
                    target: options[host]
                }, callback);
            }
            break;
        }
    }
    yield next;
});

app.use(function *(next) {
    yield next;
    this.status = 404;
    this.body = '404';
});

app.listen(80);
