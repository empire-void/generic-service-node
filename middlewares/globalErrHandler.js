const globalErrHandler = ( err, req, res, next ) =>
{
    // stack about the error
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const message = err?.message;

    res.status( statusCode )
        .json( {
            stack,
            message
        } );
}

// handle 404
const notFound = ( req, res, next ) =>
{
    const err = new Error( `Route ${ req.originalUrl } not found` );
    next( err );
}

module.exports = {
    globalErrHandler,
    notFound
}