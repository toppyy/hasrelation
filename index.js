
if (process.env.NODE_ENV === 'dev') {
  // We only want these in dev
  // In prod they are set in by Heroku
  require('dotenv').config()
}
const express = require('express');
const bodyParser        = require('body-parser')
const { getNetwork }       = require('./src/domain/Network')
const { getRelations } = require('./src/services/getRelations')


// Constants
const PORT = process.env.PORT || 5000;


// App
const app = express()

app.use(express.json()) 
app.use(bodyParser.urlencoded({ extended: true }))


// Routers
const root          = require('./src/routers/root')
const hasrelation   = require('./src/routers/hasrelation')
const related       = require('./src/routers/related')

// Init network

const network = getNetwork()

getRelations((data)  => {
    network.setRelations(data)
})

// bind

app.use('/hasrelation',hasrelation)
app.use('/related',related)

app.use('/',root)

app.listen(PORT)