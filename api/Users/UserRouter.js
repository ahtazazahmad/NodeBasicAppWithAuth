'use strict' 
var express = require('express');
const app = express.Router();
const userController=require('./UserController.js');
// const {uploadImage,getImage}=require('../../../utils/minio')

// //test upload files to minio 
// app.post("/upload", upload.single('image'),uploadImage)
// app.get("/upload/:id", getImage) 


// app.post('/', userController.createUser)
app.post('/login', userController.login)


module.exports = app;






