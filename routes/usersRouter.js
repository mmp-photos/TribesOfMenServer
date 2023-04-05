const express = require('express');
const router = express.Router();
const User = require('../models/usersModel.js');
const passport = require('passport');


// GETTING ALL USERS
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(err)
    }
});
router.get('/:username', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(err)
    }
});
// CREATING USERS
router.post('/signup', async(req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        err => {
            if(err){
                res.status(500).json({err: err})
            } else {
                passport.authenticate(local)(req, res, () => {
                    res.status(200).json({success: true, status: 'Registration successfull'})
                })
            }
        }
    )
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({success: true, status: 'You are successfully logged in'})
});

router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        const err = new Error('You are not logged in!');
        err.status = 401;
        return next(err);
    }    
});

module.exports = router;
