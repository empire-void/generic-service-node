const request = require( "supertest" );
const app = require( '../app/app' );

const TEST_ENDPOINT = "/api/v1/tests";

describe( "Test Endpoint: /api/v1/tests", () =>
{

    it( 'returns a 200 on successful register', async () =>
    {
        const testResponse = await request( app )
                            .get( TEST_ENDPOINT ).send();
        expect( testResponse.statusCode ).toEqual( 200 );
    } );
} );