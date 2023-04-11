const express = require('express');
const User = require('../models/usersModel');
const passport = require('passport');
const cors = require('./cors.js');
const router = express.Router();
const LocalStrategy = require('passport-local');


passport.use(new LocalStrategy(User.authenticate()));

/* GET users listing. */
router.get('/', function(req, res, next) {
    const users = User.find()
    res.status(200);
    res.json({status: "Get request successful"});
});


router.post('/signup', (req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        err => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                });
            }
        }
    );
});

router.post('/login', passport.authenticate('local'),  function(req, res) {
	console.log(req.user)
    res.statusCode = 200;
    res.json({Success: "You have successfully logged in"})
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'Registration Successful!'});
});

module.exports = router;