var Rule;
Rule = exports = module.exports = {};

Rule.createRule = function(host, address, cb) {
    redis.hset('rule', host, address, function(err) {
        if (err) { return cb(err); }
        cb(null, {host: host, address: address});
    });
};

Rule.getRule = function(host, cb) {
    redis.hget('rule', host, function(err, address) {
        cb(null, {host: host, address: address});
    });
};

Rule.updateRule = function(host, newHost, newAddress, cb) {
    if (host !== newHost) {
        rule.deleteRule(host, function(err) {
            if (err) { return cb(err); }
            rule.createRule(newHost, newAddress, cb);
        });
    } else {
        rule.createRule(newHost, newAddress, cb);
    }
};

Rule.deleteRule = function(host, cb) {
    rule.getRule(host, function(err, rule) {
        if (err) { return cb(err); }
        redis.hdel('rule', host, function(err) {
            if (err) { return cb(err); }
            cb(null, rule);
        });
    });
};

Rule.getRuleList = function(cb) {
    redis.hkeys('rule', function(err, hosts) {
        if (err) { return cb(err); }
        redis.hmget(['rule'].concat(hosts), function(err, addresses) {
            if (err) { return cb(err); }
            cb(null, hosts.map(function(host, index) {
                return {host: host, address: addresses[index]};
            }));
        });
    });
};
