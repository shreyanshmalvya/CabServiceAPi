//built using express,mongoose, morgan, nodemon, multer, bodyparser 
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
//handling CORS errors, access-control-allow- (origin, headers, methods)
app.use(cors())
app.use((req,res,next) =>{
    console.log("came here")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //for options request
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST')
        return res.status(200).json({})
    }
    console.log("was here")
    next();

});

//import routes
const productRoutes = require('./api/routes/product');
const rideRoutes = require('./api/routes/ride');

//use body parser to parse incomming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connecting to mongoDB database via mongoose
mongoose.connect(`mongodb+srv://node-fare:${process.env.MONGO_PASS}@node-fare.arqbutn.mongodb.net/?retryWrites=true&w=majority`);


// we use routes to directly route our data 

app.use('/product', productRoutes);
app.use('/ride', rideRoutes);


//since we pass all the above routes this means we did not reach any destination so error

app.use((req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Not Found';
    next(error);
});

// a funnel for all other errors !404

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });

});

module.exports = app;