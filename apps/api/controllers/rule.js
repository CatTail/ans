exports = module.exports;

exports.createRule = function(req, res, next) {
    redis.hset('rule', req.body.host, req.body.address, function(err) {
        if (err) { return next(err); }
        res.json(req.body);
    });
};

exports.getRule = function(req, res, next) {
    res.json(req.rule);
};

exports.updateRule = function(req, res, next) {
    if (req.rule.host !== req.body.host) {
        redis.hdel('rule', req.rule.host, function(err) {
            if (err) { return next(err); }
            redis.hset('rule', req.body.host, req.body.address, function(err) {
                if (err) { return next(err); }
                res.json(req.body);
            });
        });
    } else {
        redis.lset('rule', req.rule.host, req.body.address, function(err) {
            if (err) { return next(err); }
            res.json(req.body);
        });
    }
};

exports.deleteRule = function(req, res, next) {
    redis.hdel('rule', req.rule.host, function(err) {
        if (err) { return next(err); }
        res.json(req.rule);
    });
};

exports.getRuleList = function(req, res, next) {
    redis.hkeys('rule', function(err, hosts) {
        if (err) { return next(err); }
        var args = ['rule'];
        args.push(hosts);
        args = args.concat(hosts);
        redis.hmget(args, function(err, addresses) {
            if (err) { return next(err); }
            var rules = hosts.map(function(host, index) {
                return {host: host, address: addresses[index]};
            });
            res.send(rules);
        });
    });
};
