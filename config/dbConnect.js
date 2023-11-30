const mongoose = require( 'mongoose' );

const dbConnect = async () =>
{
    try
    {
        mongoose.set( "strictQuery", false );

        const details = await mongoose.connect( process.env.MONGO_URL );

        console.info( `connected to ${ details.connection.host }the database` );
    }
    catch ( err )
    {
        console.error( `connection failed: ${ err }` );
        process.exit( 1 );
    }
}

//dbConnect();
