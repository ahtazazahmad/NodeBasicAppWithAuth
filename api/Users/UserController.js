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
exports.login=(req,res)=>{
 /*
 #swagger.parameters['obj'] = {
  name: 'obj',
  in: 'body',
  required: true,
  schema: {
    email: 'string',
    password: 'string',
  }
}
 */

      const token = jwt.sign({ user}, process.env.JWT_SECERT_KEY);
      if(req.body.email === user.email && req.body.password === user.password){
        req.session.token = token;
        res.send(Response.getOkRequest({token},"User login Successfully"));
      } else{
        res.send(Response.getSimpleOkRequest("User Not Found"));
      }
     
}
