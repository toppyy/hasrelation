
const express = require('express')
const handleRoot = require('../routehandlers/handleRoot')

const router = express.Router()



router.get('/',handleRoot)


module.exports = router