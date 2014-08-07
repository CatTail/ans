var winston = require('winston');

exports = module.exports = {
    port: 80
};

winston.remove(winston.transports.Console);
winston.add(winston.transports.File, {
    filename: '/var/log/ans.log'
});
