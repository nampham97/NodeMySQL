const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.render('index', {
        path: 'index'
    })
})

module.exports = router;