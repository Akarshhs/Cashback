let { getData } = require('../models/datamodel')

function calculateCashback({ ruleSets, transactions }) {
    if (transactions && transactions.length) {
        let cashbacks = ruleSets.reduce((acc, eachRuleSet) => {
            transactions.reduce((transactionAcc, eachTransaction) => {
                let { date: transactionDate } = eachTransaction
                let { startDate, endDate } = eachRuleSet
                transactionDate = new Date(transactionDate)
                startDate = new Date(startDate)
                endDate = new Date(endDate)

                if (transactionDate > startDate && transactionDate < endDate) {
                    eachTransaction.amount = eachRuleSet.amount
                    if (acc.find(transactionInfo => transactionInfo.id === eachTransaction.id)) {
                        eachTransaction.amount += eachRuleSet.amount
                    }
                    acc.push(eachTransaction)

                }
            });
            return acc;
        }, [])
        return cashbacks
    } else {
        return []
    }

}
async function getCashBack(req, res) {
    try {
        let ruleSets = await getData([], 'rulesets')
        if (ruleSets && ruleSets.length) {
            let transactions = await getData([], 'transactions')
            let cashbacks = calculateCashback({ ruleSets, transactions })
            if (cashbacks && cashbacks.length) {
                res.status(200).json(cashbacks)
            } else {
                res.status(404).json({ 'message': 'No transactions found' })
            }

        } else {
            res.status(404).json({
                message: 'No rulesets found for current day'
            })
        }
    } catch (e) {
        console.error('Error reported in getCashBack', e)
        res.status(500).json({
            message: e
        })
    }
}

module.exports = {
    getCashBack
}