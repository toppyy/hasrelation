const { get_query } = require('../services/db')


const query =`
    SELECT COUNT(1) AS relations
    FROM public.relations
`



const handleRoot = function(req,res) {
    
    const handleResponse = (data) => {
        
        console.log(data)
        work_count = data[0].relations
        res.send(`${work_count} relations in db.`)
    }

    get_query(query,handleResponse)

}

module.exports = handleRoot