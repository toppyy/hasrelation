const { getNetwork }       = require('../domain/Network')


const isNotNumber = (input) => !Number.isInteger(input*1)


const handleHasrelation = function(req,res) {

    const from = req.params.from
    const to   = req.params.to

    const err_msg = 'Expected integers. Eg: ../hasrelation/7/9876'

    if ( isNotNumber(from) || isNotNumber(to) ) {
        res.send(err_msg)
        return
    }

    const nw = getNetwork()


    if (nw.isUpAndRunning() === false) {
        res.send(
            'Try again in a few seconds. Pulling data from DB.'
        )
        return

    }

    const relation = nw.hasRelation(from,to)
    
    res.send({
            from: from,
            to: to,
            hasRelation: relation.length > 0,
            distance: relation.length > 0 ? relation[0].distance : -1
    })

}

module.exports = handleHasrelation