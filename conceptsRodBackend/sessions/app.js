const express = require('express');
const mongoose = require('mongoose')
// npm module express session
const session = require('express-session')

const MongoStore  = require('connect-mongo')(session);

// creste express appication
var app = express();

const dbString = 'mongodb+srv://concepts.0a2na.mongodb.net/myFirstDatabase';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.createConnection(dbString, dbOptions)

app.use(express.json());
app.use(express.urlencoded({extented: true}));

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    colection: 'session'
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24
    }
}))

app.get('/', (req, res, next) => {
    res.send('<h1>hello world session</h1>')
});

app.listen(3001)


// expess
// mongoose
// session