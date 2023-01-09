'use strict' 
var express = require('express');
const app = express.Router();
const userController=require('./UserController.js');

app.post('/login', userController.login)


module.exports = app;






