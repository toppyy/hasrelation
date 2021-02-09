
require('dotenv').config()

const fs = require('fs')
const db = require('./src/services/db')


// Helper

const create_view = () => {
    db.get_query(
        `
        CREATE OR REPLACE VIEW relations AS 
        SELECT 
            rel_from,
            rel_to::int AS rel_to
        FROM public.relations_json
            JOIN LATERAL json_array_elements_text(rel_to_json) AS  rel_to ON true

        `
        ,() => {
            console.log('done!')
            process.exit(0)
        }
        )
}

 

const init_db = (rows) => {

    // A workaround
    // The (free version) of the DB only allows 10 000 rows so store as JSON
    const insert_rows = () => {
        db.get_query(
            `
            WITH as_json AS (
                SELECT
                    rel_from,
                    to_json(json_agg(rel_to)) AS rel_to_json
                    
                FROM (
                    SELECT *
                    FROM UNNEST ($1::int[], $2::int[]) AS A(rel_from,rel_to)
                ) AS B
                GROUP BY rel_from
            )
            INSERT INTO public.relations_json(rel_from,rel_to_json)
            SELECT 
                rel_from,
                rel_to_json
            FROM as_json
            `
            ,create_view
            ,rows
        )
    }
    

    db.get_query(`
        DROP TABLE IF EXISTS public.relations_json CASCADE;
        CREATE TABLE public.relations_json (rel_from INT, rel_to_json JSON)
        `,insert_rows)

}


// Read data

// Example uses data from https://github.com/benedekrozemberczki/MUSAE
const data = fs.readFileSync('./data/git_web_ml/edge_sample.csv', {encoding:'utf8', flag:'r'}); 

  
const rows = data.split('\n')
            .filter(row =>  row.match(/^[0-9]/)  ) // Remove header and trailing blank row
            .map(row => row.split(','))


const from = rows.map(row => row[0]*1)
const to   = rows.map(row => row[1]*1)


const to_db = [ from.concat(to), to.concat(from) ] // Store as two-way relations




// Create table and store rows
init_db( to_db )


