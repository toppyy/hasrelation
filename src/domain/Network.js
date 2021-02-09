const { Queue } = require('./Queue')


const createAdjacencyList = relations => {
    /*
        A connection: 
        {    
            rel_from: 23,
            rel_to: 145
        }
    */
    return relations.reduce((prev,cur) => {

        const from = cur.rel_from
        const to = cur.rel_to

        if (prev[from]) {

            prev[from].adjacent.push(to)
        
        } else {
        
            prev[from] = {
                node_id: from,
                adjacent: [to]
            }
        
        }
        
        return prev

        },{}
    )

}


const Network = class {

    constructor() {
        this.relations     = undefined
        this.adjacencylist = undefined
        this.upAndRunning  = false
    }

    getAdjacencyList = () => {
        return this.adjacencylist
    }


    setRelations = relations => {
        this.relations = relations

        this.nodes = relations.reduce((prev,cur) => {
            prev[cur.rel_from] = {
                node_id: cur.rel_from,
                visited: false
            }

            return prev
        })

        this.adjacencylist = createAdjacencyList(relations)

        this.nodeCount = Object.values(this.nodes).length

        console.log(`${this.relations.length} relations stored amongst ${this.nodeCount} nodes.`)

        this.upAndRunning = true

    }

    getRelationCount = () => {
        return this.relations.length
    }

    getNodeCount = () => {
        return this.nodeCount
    }

    isUpAndRunning = () => {
        return this.upAndRunning
    }

    related = (from,maxdistance) => {
        return this.BFS({ from: from, maxdistance: maxdistance })
    }

    hasRelation = (from,to) => {
        return this.BFS({ from: from, to: to })
    }

    BFS = params => {

        const visited = JSON.parse(JSON.stringify(this.nodes)) // Clone this.nodes

        const from          = params.from
        const to            = params.to
        const maxdistance   = params.maxdistance

        

        if (visited[from] == undefined) {
            return []
        }

        if (to & visited[to] == undefined) {
            return []
        }

        const queue = new Queue()

        queue.enqueue({ node: from, distance: 0})
        visited[from].visited = true


        let related = []

        while ( queue.isNotEmpty() ) {

            let nodeObj = queue.dequeue()
            let node = nodeObj.node
            let distance = nodeObj.distance


            if (distance > maxdistance) {
                return related
            }


            related.push({ node: node, distance: distance  } )
        
            let nbs = this.adjacencylist[node].adjacent

            for (let i = 0; i < nbs.length; i++) {
 
                let nb = nbs[i]
                let nbObj = { node: nb, distance: distance+1 }

                if (nb == to) {
                    return [nbObj] // Allways return an array
                }

                if (visited[nb].visited) {
                    continue
                }
                queue.enqueue(nbObj)
                visited[nb].visited = true
            }

        }

        return related

    }



}

const network = new Network()

const getNetwork = () => {
    return network
}


module.exports = {
    Network,
    getNetwork
}