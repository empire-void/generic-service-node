const express = require( 'express' );
const morgan = require( 'morgan' );
const compression = require( 'compression' );
const cors = require( 'cors' );

const app = express();

// middleware imports
const { notFound, globalErrHandler } = require( '../middlewares/globalErrHandler' );


// routes imports
const testRouter = require( '../routes/testRouter' );

// middlewares
app.use( morgan( process.env.NODE_ENV ) );
app.use( compression() );
app.use( express.json() ); //pass incoming json data
app.use( cors() );

// Routes
app.use( "/api/v1/tests", testRouter );

// route error handlers
app.use( notFound );
app.use( globalErrHandler );

// middle ware for cors
app.use( ( req, res, next ) =>
{
    res.setHeader( "Access-Control-Allow-Origin", "*" );
    res.setHeader( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    res.setHeader( "Access-Control-Allow-Methods", "GET,POST, PATCH, DELETE, OPTIONS" );
    next();
} );

module.exports = app;