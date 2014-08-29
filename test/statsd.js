var Client = require('node-statsd').StatsD,
    config = require('../config');

var client = new Client({
    host: config.statsd.host,
    port: config.statsd.port,
    prefix: config.statsd.prefix,
    globalize: true
});

for (var i=0; i<100; i++) {
    client.increment('test._t_user.cattail');
}
