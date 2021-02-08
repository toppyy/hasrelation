const { getNetwork }       = require('../domain/Network')


const handleRoot = function(req,res) {

    const network = getNetwork()
    res.send(`
            ${network.getRelationCount()} relations in network between ${network.getNodeCount()} nodes.
            <br><br> Try ./hasrelation/6/2376 for example.
            `)
}

module.exports = handleRoot