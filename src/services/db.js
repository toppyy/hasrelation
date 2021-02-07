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



const init_db = (rows) => {
    console.log('DB init')


    const insert_rows = () => {
        console.log('inserting rows')
        get_query(
            'INSERT INTO public.relations(rel_from,rel_to) SELECT * FROM UNNEST ($1::int[], $2::int[])'
            ,() => {
                console.log('done!')
                process.exit(0)
            }
            ,rows
        )
    }

    get_query(`
        DROP TABLE IF EXISTS public.relations;
        CREATE TABLE public.relations (rel_from INT, rel_to INT)
        `,insert_rows)

}


module.exports = {
    get_query,
    init_db
}