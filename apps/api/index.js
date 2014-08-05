var express = require('express');

var app = exports = module.exports = express();

require('./routes/rule')(app);
require('./routes/domain')(app);
