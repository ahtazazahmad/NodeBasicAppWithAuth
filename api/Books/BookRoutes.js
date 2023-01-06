'use strict' 
var express = require('express');
const app = express.Router();
const multer  = require('multer')
const upload = multer();
const bookController=require('./BookController.js');
// const {uploadImage,getImage}=require('../../../utils/minio')

// //test upload files to minio 
// app.post("/upload", upload.single('image'),uploadImage)
// app.get("/upload/:id", getImage) 

app.get('/:id', bookController.getBook)
app.get('/', bookController.getBooks)
app.post('/', bookController.postBook)
app.delete('/:id', bookController.deleteBook)
app.put('/:id', bookController.updateBook)


module.exports = app;






