var low = require('lowdb');
low.load();

var Collection = low('rule'),
    Rule;

Rule = exports = module.exports = {};

Rule.createRule = function(host, address, cb) {
    var rule = {host: host, address: address};
    Collection.insert(rule);
    cb(null, rule);
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
