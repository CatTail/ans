var router = require('express').Router();
var controller = require('../controllers/rule');

exports = module.exports = function(app) {
    router.get('/rule', controller.getRuleList);
    router.post('/rule', controller.createRule);

    router.get('/rule/:ruleId', controller.getRule);
    router.delete('/rule/:ruleId', controller.deleteRule);
    router.put('/rule/:ruleId', controller.updateRule);
};
