const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')


// VIEW NEW LISTING FORM
router.get('/new', (req, res) => {
    res.render('listings/new.ejs')
})

// POST FORM DATA TO DATABASE
router.post('/', async (req, res) => {
    await Listing.create(req.body)
    res.send('you submitted the form')
})

module.exports = router