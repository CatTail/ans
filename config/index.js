var _ = require('underscore');

exports = module.exports = {
    DEBUG: process.env.NODE_ENV ? process.env.NODE_ENV !== 'production' : true,
    domain: require('./domain').domain,
    httpsPort: 443
};

_.extend(exports, require(exports.DEBUG ? './development' : './production'));
