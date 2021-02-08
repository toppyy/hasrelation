const { getNetwork }       = require('../domain/Network')


const handleRoot = function(req,res) {

    const network = getNetwork()

    const url = 'http://hasrelation.herokuapp.com/hasrelation/7/9876'

    res.send(`
            ${network.getRelationCount()} relations in network between ${network.getNodeCount()} nodes.
            <br><br>
            Try <a href="${url}">${url}</a> for example.
            `)
}

module.exports = handleRoot