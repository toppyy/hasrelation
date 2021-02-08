const { getNetwork }       = require('../domain/Network')


const isNotNumber = (input) => !Number.isInteger(input*1)


const handleHasrelation = function(req,res) {

    console.log('requested rel', req.params)

    const from = req.params.from
    const to   = req.params.to

    const err_msg = 'Specify from and to. Eg: ../hasrelation/1/19720'

    let response = 'ok'

    if (!from | !to) {
        response = err_msg
    }

    if (isNotNumber(from) || isNotNumber(to)) {
        response = err_msg
    }

    const nw = getNetwork()
    
    res.send({
        from: from,
        to: to,
        hasRelation: nw.hasRelation(from,to)
    })

}

module.exports = handleHasrelation