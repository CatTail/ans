var low = require('lowdb');
low.load();

var Collection = low('rule'),
    Rule;

Rule = exports = module.exports = {};

Rule.createRule = function(host, address, cb) {
    var newRule = {host: host, address: address};
    Rule.getRule(newRule.host, function(err, rule) {
        if (err) { return cb(err); }
        // update if host already exist
        if (rule) {
            Rule.updateRule(rule.host, newRule.host, newRule.address, cb);
        } else {
            Collection.insert(newRule);
            cb(null, rule);
        }
    });
};

Rule.getRule = function(host, cb) {
    var rule = Collection.find({host: host});
    cb(null, rule);
};

Rule.updateRule = function(host, newHost, newAddress, cb) {
    var newRule = {host: newHost, address: newAddress};
    Collection.updateWhere({host: host}, newRule);
    cb(null, newRule);
};

Rule.deleteRule = function(host, cb) {
    var rule = Collection.find({host: host});
    Collection.removeWhere({host: host});
    cb(null, rule);
};

Rule.getRuleList = function(cb) {
    var rules = Collection.value();
    cb(null, rules);
};
