var router = require('express').Router();
var controller = require('../controllers/rule');

router.get('/rule', controller.getRuleList);
router.post('/rule', controller.createRule);

router.get('/rule/:ruleId', controller.getRule);
router.delete('/rule/:ruleId', controller.deleteRule);
router.put('/rule/:ruleId', controller.updateRule);

router.param('ruleId', function(req, res, next, host) {
    redis.hget('rule', host, function(err, address) {
        req.rule = {host: host, address: address};
        next();
    });
});

exports = module.exports = router;
