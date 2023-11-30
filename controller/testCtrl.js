const AsyncHandler = require( "express-async-handler" );

exports.testCtrl = AsyncHandler( async ( req, res ) =>
{
    res.status( 200 ).json( {
        status: "success",
        message: "successfull"
    } );
} );

