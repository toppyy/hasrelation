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


    hasRelation = (from,to) => {
        // Implementes BFS

        const visited = JSON.parse(JSON.stringify(this.nodes)) // Clone this.nodes

        if (visited[from] == undefined) {
            return false
        }
        if (visited[to] == undefined) {
            return false
        }
        const queue = new Queue()

        queue.enqueue(from)
        visited[from].visited = true

        let distance = 0

        while ( queue.isNotEmpty() ) {

            let node = queue.dequeue()
            distance = distance + 1

            let nbs = this.adjacencylist[node].adjacent

            for (let i = 0; i < nbs.length; i++) {
 
                let nb = nbs[i]

                if (nb == to) {
                    return {
                        result: true,
                        distance: distance
                    }
                }

                if (visited[nb].visited) {
                    continue
                }
                queue.enqueue(nb)
                visited[nb].visited = true
            }

        }

        return {
            result: false,
            distance: -1
        }


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