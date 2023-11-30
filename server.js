require( 'dotenv' ).config();
const http = require( 'http' );
const app = require( './app/app' );
require( "./config/dbConnect" );

// ensure is valid port
const normalizePort = val =>
{
    let port = parseInt( val, 10 );
    if ( isNaN( port ) )
    {
        return val;
    }

    if ( port > 0 )
    {
        return port;
    }

    return false;
}

const onError = error =>
{
    if ( error.syscall !== "listen" )
    {
        throw error;
    }

    // what type of error
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;

    switch ( error.code )
    {
        case "EACCESS":
            console.error( `${ bind } requires elevated privileges.` );
            process.exit( 1 );
            break;
        case "EADDRINUSE":
            console.error( `${ bind } is already in use.` );
            process.exit( 1 );
            break;
        case "SIGINT":
            console.info( 'Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString() );
            shutdown();
            break;
        case "SIGTERM":
            console.info( 'Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString() );
            shutdown();
            break;
        default:
            throw error;
    }
};

const onListening = () =>
{
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    console.log( `Listening on ${ bind }` );
};

const port = normalizePort( process.env.PORT || "8080" );
app.set( "port", port );


// quit on ctrl-c when running docker in terminal
process.on( 'SIGINT', function onSigint()
{
    console.info( 'Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString() );
    shutdown();
} );

// quit properly on docker stop
process.on( 'SIGTERM', function onSigterm()
{
    console.info( 'Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString() );
    shutdown();
} )

// shut down server
function shutdown()
{
    // NOTE: server.close is for express based apps
    server.close( function onServerClosed( err )
    {
        if ( err )
        {
            console.error( err );
            process.exitCode = 1;
        }
        process.exit();
    } )
}

const server = http.createServer( app );
server.on( "error", onError );
server.on( "listening", onListening );
server.listen( port );