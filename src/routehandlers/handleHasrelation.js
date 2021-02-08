const { getNetwork }       = require('../domain/Network')


const isNotNumber = (input) => !Number.isInteger(input*1)


const handleHasrelation = function(req,res) {

    const from = req.params.from
    const to   = req.params.to

    const err_msg = 'Expected integers. Eg: ../hasrelation/1/19720'

    const nw = getNetwork()


    if (nw.isUpAndRunning() === false) {
        res.send(
            'Try again in a few seconds. Pulling data from DB.'
        )
        return

    }
    
    res.send(
        ( isNotNumber(from) || isNotNumber(to) ) ? err_msg : 
        {
            from: from,
            to: to,
            hasRelation: nw.hasRelation(from,to)
        }
    )

}

module.exports = handleHasrelation