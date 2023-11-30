const express = require( "express" );
const { testCtrl } = require("../controller/testCtrl");

const testRouter = express.Router();

testRouter.get( "/", testCtrl );


module.exports = testRouter;
