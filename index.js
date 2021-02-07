console.log('NODE_ENV is',process.env.NODE_ENV)

if (process.env.NODE_ENV === 'dev') {
  // We only want these in dev
  // In prod they are set in docker-compose
  require('dotenv').config()
}
const express = require('express');
const bodyParser = require('body-parser')

// Constants
const PORT = process.env.PORT || 5000;

const app = express()
 

// Routers
const root     = require('./src/routers/root')

app.use('/',root)

app.listen(PORT)