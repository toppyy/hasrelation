const { Pool } = require('pg')


const connection_info = process.env.NODE_ENV === 'dev'
        ? {}
        : {
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            }

let pool = new Pool(connection_info)

const get_pool = () => { return pool }

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
    get_query,
    get_pool
}