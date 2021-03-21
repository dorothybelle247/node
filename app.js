const express = require('express')

const app = express();

// cors crss origini resource sharing
// app.use(cors)

function middleware1 (req, res, next) {
    req.customProperty = 100;
    next();
}

function middleware2(req, res, next) {
    console.log(`the customm property value is: ${req.customProperty}`)
    req.customProperty = 700;
    next();
}

function errorHandler (err, req, res, next){
    // res.json({err: err}); frontend
   res.json({err: err})
}
app.use(middleware1)
app.use(middleware2)


function middleware3(req, res, next) {
    console.log('i am a middeware 3')
    next();
}


// route
app.get('/', middleware3, (req, res, next) => {
   
    res.send(`<h1>the value is: ${req.customProperty}</h1>`)
    next();
})

app.use(errorHandler)
app.listen(3000);