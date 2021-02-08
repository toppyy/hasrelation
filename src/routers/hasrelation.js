
const express = require('express')
const handleHasrelation = require('../routehandlers/handleHasrelation')

const router = express.Router()


router.get('/',(req,res) => {
    res.send(
        'Specify from and to. Eg: ../hasrelation/1/19720'
    )
})

router.get('/:from/:to',handleHasrelation)


module.exports = router