const { getNetwork }       = require('../domain/Network')


const handleRoot = function(req,res) {

    const network = getNetwork()
    res.send(`${network.getRelationCount()} relations in network`)
}

module.exports = handleRoot