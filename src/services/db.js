const { Pool } = require('pg')

// pools will use environment variables
// for connection information
const pool = new Pool()


const get_query  = (querystring,callback,values) => {

    const query = {
        text: querystring
    }

    if (values) {
        query.values = values
    }


    data =  pool.query(query,(err,result) => {
        if (err) {
            console.log(err.stack)
          } else {
            callback(result.rows)
        }
        
    })
}



module.exports = {
    get_query
}