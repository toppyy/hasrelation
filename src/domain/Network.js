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

        console.log(`${this.relations.length} relations stored amongst ${Object.values(this.nodes).length} nodes.`)

    }

    getRelationCount = () => {
        return this.relations.length
    }


    hasRelation = (from,to) => {
        const visited = JSON.parse(JSON.stringify(this.nodes))

        if (visited[from] == undefined) {
            return false
        }
        if (visited[to] == undefined) {
            return false
        }
        const queue = new Queue()

        queue.enqueue(from)
        visited[from].visited = true

        let depth = 0

        while ( queue.isNotEmpty() ) {

            let node = queue.dequeue()
            depth = depth + 1

            let nbs = this.adjacencylist[node].adjacent

            for (let i = 0; i < nbs.length; i++) {
 
                let nb = nbs[i]

                console.log(nb)
            
                if (nb == to) {
                    console.log('score', nb, to)
                    return {
                        result: true,
                        depth: depth
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
            depth: -1
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