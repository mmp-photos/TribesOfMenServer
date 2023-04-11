require('dotenv').config();
const express = require('express')
const app = express()
const mongoose =require('mongoose')
const port = 5005;
const passport = require('passport');
const authenticate = require('./authenticate');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// DATABASE CONNECTION //
mongoose.connect(process.env.ATLAS_URI, { useNewURLParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

// app.use(session({
//     name: 'session-id',
//     secret: '12345-67890-09876-54321',
//     saveUninitialized: false,
//     resave: false,
//     store: new FileStore()
// }));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
const router = express.Router();

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
app.use('/users', usersRouter);

app.listen(port, () => console.log(`listening on port ${port}`));

