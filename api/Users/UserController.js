"use strict";
const Response  = require('../../utils/Response/response')
let mongoose = require('mongoose');
let User = require('./UserModel');
const jwt = require('jsonwebtoken');
exports.user = {
    email: 'applit@nxb.com.pk',
    password: 'stesivcnslkents'
  }
 const user = {
    email: 'applit@nxb.com.pk',
    password: 'stesivcnslkents'
  }
exports.login=(req,res,next)=>{
 /*
 #swagger.parameters['obj'] = {
  name: 'obj',
  in: 'body',
  required: true,
 schema: {
         $email: 'Jhon Doe',
         $password: '29',
          }
}
#swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: { 
              $status: "success",
              $statusCode: 200,
              $message: "User login Successfully",
              $data: {
               $token: "eyJh" }
              }
    }
#swagger.responses[2001] = {
            description: 'User Not Found',
            schema: { 
                  $status: "success",
                  $statusCode: 200,
                  $message: "User Not Found"
             }
    }

 */
try {
  const token = jwt.sign({ user}, process.env.JWT_SECERT_KEY);
  if(req.body.email === user.email && req.body.password === user.password){
    req.session.token = token;
    res.send(Response.getOkRequest({token},"User login Successfully"));
    
  } else{
    res.send(Response.getSimpleOkRequest("User Not Found"));
  }
} catch (error) {
  next(error); 
}
     
     
}
