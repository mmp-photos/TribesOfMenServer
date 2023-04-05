const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers.js');

// GETTING SUBSCRIBERS
router.get('/', async(req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(err)
    }
});

// CREATING SUBSCRIBERS
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name : req.body.name
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

// UPDATING SUBSCRIBERS
router.patch('/:id', (req, res) => {
    
});

//DELETING SUBSCRIBERS
router.delete('/:id', (req, res) => {
    
});

module.exports = router;
