const { get_query } = require('../services/db')


const query =`
    SELECT COUNT(1) AS N
    FROM public.work_urls
    WHERE parent_id IS NULL
`



const handleRoot = function(req,res) {
    
    const handleResponse = (data) => {
        
        work_count = 1234
        res.send(`${work_count} jobs counted.`)
    }

    handleResponse()

}

module.exports = handleRoot