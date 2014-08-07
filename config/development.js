var winston = require('winston');

exports = module.exports = {
    port: 8081
};

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {colorize: true});
