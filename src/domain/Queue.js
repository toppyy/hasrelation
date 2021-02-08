

const Queue = class {

    constructor() {

        this.objects = []
    }

    enqueue(object) {
        this.objects.push(object)
    }

    dequeue(object) {
        return this.objects.shift()
    }

    isEmpty() {
        return this.objects.length === 0
    }

    isNotEmpty() {
        return this.objects.length > 0
    }

}

module.exports = {
    Queue
}