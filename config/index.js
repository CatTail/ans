var DEBUG = process.env.NODE_ENV === 'development';

exports = module.exports = require(DEBUG ? './development' : './production');
