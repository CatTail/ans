var Rule = require('../../../model/rule');

exports = module.exports;

exports.createRule = function(req, res, next) {
    Rule.createRule(req.body.host, req.body.address, function(err, rule) {
        if (err) { return next(err); }
        res.json(rule);
    });
};

exports.getRule = function(req, res, next) {
    res.json(req.rule);
};

exports.updateRule = function(req, res, next) {
    Rule.updateRule(req.rule.host, req.body.host, req.body.address,
                    function(err, rule) {
                        if (err) { return next(err); }
                        res.json(rule);
                    });
};

exports.deleteRule = function(req, res, next) {
    Rule.deleteRule(req.rule.host, function(err, rule) {
        if (err) { return next(err); }
        res.json(rule);
    });
};

exports.getRuleList = function(req, res, next) {
    Rule.getRuleList(function(err, rules) {
        if (err) { return next(err); }
        res.send(rules);
    });
};
