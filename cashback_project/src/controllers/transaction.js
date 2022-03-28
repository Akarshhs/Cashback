const { insertData } = require('../models/datamodel')



async function insertTransaction(req, res) {
    try {
        let transaction = req.body
        let result = await insertData(transaction, 'transactions')
        res.status(200).json({
            'message': 'Transaction insertion successfull'
        })
    } catch (e) {
        console.error('Error reported in insertTransaction', e)
        res.status(500).json({
            'message': e
        })
    }
}
module.exports = {
    insertTransaction
}