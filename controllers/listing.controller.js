const express = require('express')
const router = express.Router()
const Listing = require('../models/listing')


// VIEW NEW LISTING FORM
router.get('/new', (req, res) => {
    res.render('listings/new.ejs')
})

// POST FORM DATA TO DATABASE
// note to come back to isSignedIn
router.post('/', async (req, res) => {
    try {
        req.body.seller = req.session.user._id
        await Listing.create(req.body)
        res.redirect('/listings')
    } catch (error) {
        console.log(error)
        res.send('Something went wrong')
    }
})

// VIEW THE INDEX PAGE
router.get('/', async (req, res) => {
    const foundListings = await Listing.find()
    console.log(foundListings)
    res.render('listings/index.ejs', { foundListings: foundListings })
})

// VIEW A SINGLE LISTING (SHOW PAGE)
router.get('/:listingId', async (req, res) => {
    const foundListing = await Listing.findById(req.params.listingId).populate('seller')
    console.log(foundListing)
    res.render('listings/show.ejs', { foundListing: foundListing })
})

module.exports = router