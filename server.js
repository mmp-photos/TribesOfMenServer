require('dotenv').config();
const express = require('express')
const app = express()
const mongoose =require('mongoose')
const port = 5050;
const passport = require('passport');
const authenticate = require('./authenticate');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// DATABASE CONNECTION //
mongoose.connect(process.env.ATLAS_URI, { useNewURLParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

// DEFINE ROUTERS //
app.use(express.json());
const router = express.Router();

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');

app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));
app.use('/users', usersRouter);
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => console.log(`listening on port ${port}`));

