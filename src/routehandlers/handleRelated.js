const { getNetwork }       = require('../domain/Network')


const isNotNumber = (input) => !Number.isInteger(input*1)


const handleRelated = function(req,res) {

    const from = req.params.from
    const maxdistance = req.params.maxdistance

    const err_msg = 'Expected an integer. Eg: ../related/9876'

    if ( isNotNumber(from) ) {
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

    const related = nw.related(from,maxdistance)
    
    res.send({
            from: from,
            relatedCount: related.length,
            related: related
    })

}

module.exports = handleRelated