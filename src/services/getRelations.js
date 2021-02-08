
const { get_query } = require('./db')

const getRelations = (callback) => {

    const query = 'SELECT rel_from, rel_to FROM public.relations ORDER BY rel_from,rel_to '

    get_query(query,callback)
}

module.exports = {
    getRelations
}