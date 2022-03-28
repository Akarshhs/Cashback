function validateBody(req, res, next) {
    let { startDate, endDate } = req.body;

    if (!startDate && !endDate) {
        res.json({
            message: 'startdate and enddate is missing'
        })
    } else if (typeof req.body === 'object' && Object.keys(req.body).length) {
        next()
    } else {
        res.json({
            'message': 'Payload is missing'
        })
    }
}

module.exports = {
    validateBody
}