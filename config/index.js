var _ = require('underscore');

exports = module.exports = {
    DEBUG: process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : true
};

_.extend(exports, require(exports.DEBUG ? './development' : './production'));

// global redis client
GLOBAL.redis = require('redis').createClient();
