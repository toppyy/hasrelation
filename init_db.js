
require('dotenv').config()

const fs = require('fs')
const db = require('./src/services/db')


// Helper

const create_view = cb => {
    db.get_query(
        `
        CREATE OR REPLACE VIEW relations AS 
        WITH ids AS (
            SELECT rel.value AS rel_json
            FROM public.relations_json JOIN LATERAL 
            json_array_elements(relations) AS rel ON true
        )
        SELECT 
            (rel_json->>'f1')::int AS rel_from,
            rel_to::int AS rel_to
        FROM ids
            JOIN LATERAL json_array_elements_text(rel_json->'f2') AS  rel_to ON true

        `
        ,() => {
            console.log('done!')
            process.exit(0)
        }
        )
}



const init_db = (rows) => {


    const insert_rows = () => {
        db.get_query(
            
            `
            WITH as_json AS (
                SELECT
                    CASE 
                        WHEN rel_from < 10000 THEN 1 
                        WHEN rel_From < 20000 THEN 2
                        WHEN rel_From < 30000 THEN 3
                        WHEN rel_From < 40000 THEN 4
                    END AS subset,
                    row_to_json(
                        row(
                        rel_from,
                        to_json(json_agg(rel_to))
                    )) as rel_as_json
                FROM (
                    SELECT *
                    FROM UNNEST ($1::int[], $2::int[]) AS A(rel_from,rel_to)
                ) AS B
                GROUP BY rel_from
            )
            INSERT INTO public.relations_json(subset,relations)
            SELECT 
                subset,
                JSON_AGG(rel_as_json) AS relations
            FROM as_json
            GROUP BY subset
            `
            ,create_view
            ,rows
        )
    }
    

    db.get_query(`
        DROP TABLE IF EXISTS public.relations_json;
        CREATE TABLE public.relations_json (subset INT, relations JSON)
        `,insert_rows)

}


// Read data


const data = fs.readFileSync('./data/git_web_ml/musae_git_edges.csv', {encoding:'utf8', flag:'r'}); 

  
const rows = data.split('\n').map(row => row.split(','))

rows.shift() // Remove header

const from = rows.map(row => row[0]*1)
const to   = rows.map(row => row[1]*1)

const to_db = [ from.concat(to), to.concat(from) ] // Store as two-way relations


// Create tbl and store data


// Create table and store rows
init_db( to_db )


