
require('dotenv').config()

const fs = require('fs')
const db = require('./src/services/db')


// Read data


const data = fs.readFileSync('./data/git_web_ml/musae_git_edges.csv', {encoding:'utf8', flag:'r'}); 

  
const rows = data.split('\n').map(row => row.split(','))

rows.shift() // Remove header



const to_db = [
    rows.map(row => row[0]*1),
    rows.map(row => row[1]*1)
]



// Create table and store rows
db.init_db( to_db )


