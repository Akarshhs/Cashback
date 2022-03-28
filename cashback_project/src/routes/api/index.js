const { insertRuleSet } = require('../../controllers/ruleset');
const { insertTransaction } = require('../../controllers/transaction');
const { validateBody } = require('../../middleware/validator');
const { getCashBack } = require('../../controllers/cashback');


const router = require('express').Router();

router.post('/ruleset', validateBody, insertRuleSet);
router.post('/transaction', validateBody, insertTransaction);
router.get('/cashback', getCashBack);


module.exports = router