var router = require('express').Router();
var controller = require('../controllers/domain');

exports = module.exports = function(app) {
    router.get('/domain', controller.getDomainName);
    router.put('/domain', controller.updateDomainName);
};
