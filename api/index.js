'use strict' 
const bookRouter=require('./Books/BookRoutes.js');
const userRouter=require('./Users/UserRouter.js');
const Response = require('../utils/Response/response')
const Header =require('../medalware/header');
const authenticate = require('../medalware/auth.js');
// //add routes here

function routes(app){

    app.use('/api/book',authenticate.authenticate,Header.verfiyHeader,bookRouter)
   // app.use('/api/book',bookRouter)
    app.use('/api/user',Header.verfiyHeader,userRouter)
    // app.use('*',(req,res)=>{
    // res.send(Response.getNotFound("Please hit a valid Endpoint"))
    // })
}

 module.exports = routes;



