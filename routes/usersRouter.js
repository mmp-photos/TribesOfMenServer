const express = require('express');
const User = require('../models/usersModel');
const passport = require('passport');
const cors = require('./cors.js');
const router = express.Router();
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

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

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user, 'your_jwt_secret');
           return res.json({user, token});
        });
    })(req, res);
});



module.exports = router;