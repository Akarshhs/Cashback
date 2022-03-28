const { insertData } = require('../models/datamodel')

async function insertRuleSet(request, response) {
    try {
        let ruleset = request.body;
        let result = await insertData(ruleset, 'rulesets')
        response.status('200').json({ 'message': 'Ruleset inserted successfully' })
    } catch (e) {
        console.error('err', e)
        response.json({
            message: e
        })
    }
}
module.exports = {
    insertRuleSet
}