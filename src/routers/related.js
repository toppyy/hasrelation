
const express = require('express')
const handleRelated = require('../routehandlers/handleRelated')

const router = express.Router()


router.get('/',(req,res) => {
    res.send(
        'Specify node to analyze. Eg: ./related/19720'
    )
})

router.get('/:from',handleRelated)
router.get('/:from/:maxdistance',handleRelated)


module.exports = router