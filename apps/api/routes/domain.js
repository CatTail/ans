var router = require('express').Router();
var controller = require('../controllers/domain');

router.get('/domain', controller.getDomainName);
router.put('/domain', controller.updateDomainName);

exports = module.exports = router;
