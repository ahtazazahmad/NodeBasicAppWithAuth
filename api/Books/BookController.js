"use strict";
const Response  = require('../../utils/Response/response')
let mongoose = require('mongoose');
let Book = require('./BookModel');

/*
 * GET /book route to retrieve all the books.
 */
exports.getBooks=(req, res,next) =>{
/*
 #swagger.tags = ['Books']
 #swagger.responses[200] = {
            description: 'list all books',
            schema: { 
              $status: "success",
              $statusCode: 200,
              $message: "list all books",
              $data: [
                {            
            $_id: "63b7fc6903a1632296ce04de",
            $title: "english",
            $author: "ahtazaz",
            $year: 2023,
            $pages: 12,
            $createdAt: "2023-01-06T10:48:09.103Z"        
                }
                    ]
    }
*/ 
    try {
        
    let query = Book.find({});
    query.exec((err, books) => {
        if(err)  next(error); 
        res.send(Response.getOkRequest(books,"list all books"));
    }); 
    } catch (error) {
       next(error); 
    }
   
}

/*
 * POST /book to save a new book.
 */
exports.postBook=(req, res,next) =>{
       
         /*
          #swagger.tags = ['Books']
 #swagger.parameters['obj'] = {
  name: 'obj',
  in: 'body',
  required: true,
   schema: {
        $title: 'Jhon Doe',
        $author: 'Applet',
        $year: 2023,
        $pages: 129,
                }
}
 #swagger.responses[200] = {
            description: 'Book successfully added!',
            schema: { 
              $status: "success",
              $statusCode: 200,
              $message: "Book successfully added!",
              $data: 
                {            
            $_id: "63b7fc6903a1632296ce04de",
            $title: "english",
            $author: "ahtazaz",
            $year: 2023,
            $pages: 12,
            $createdAt: "2023-01-06T10:48:09.103Z"        
                }
                    
    }
 */
    try {
          //Creates a new book
    let {title,author,year,pages}=req.body;
    var newBook = new Book(req.body);
    //Save it into the DB.
    newBook.save((err,book) => {
        if(err) {
            res.send(err);
        }
        
        else { //If no errors, send it back to the client
            res.send(Response.getOkRequest(book,"Book successfully added!"));
        }
    });  
    }catch (error) {
            next(error); 
         }

}

/*
 * GET /book/:id route to retrieve a book given its id.
 */
exports.getBook=(req, res,next) =>{
  /*
    #swagger.tags = ['Books']
       #swagger.responses[200] = {
        description: 'Get a book by its id',
        schema: { 
          $status: "success",
          $statusCode: 200,
          $data: 
            {            
        $_id: "63b7fc6903a1632296ce04de",
        $title: "english",
        $author: "ahtazaz",
        $year: 2023,
        $pages: 12,
        $createdAt: "2023-01-06T10:48:09.103Z"        
            }
                
}
*/
    try {
        Book.findById(req.params.id, (err, book) => {
            if(err) res.send(err);
            //If no errors, send it back to the client
            res.send(Response.getOkRequest(book));
        }); 
    }catch (error) {
        next(error); 
     }
       
}

/*
 * DELETE /book/:id to delete a book given its id.
 */
exports.deleteBook=(req, res,next) =>{
       /*
        #swagger.tags = ['Books']
       #swagger.responses[200] = {
        description: 'Book successfully added!',
        schema: { 
          $status: "success",
          $statusCode: 200,
          $message:  "Book successfully deleted!",
          $data: 
            {            
         $acknowledged: true,
        $deletedCount: 1      
            }
                
}
*/
    try {
        Book.remove({_id : req.params.id}, (err, result) => {
            res.send(Response.getOkRequest(result,"Book successfully deleted!"));
         
        });
    }catch (error) {
        next(error); 
     }

}

/*
 * PUT /book/:id to updatea a book given its id s
 */
exports.updateBook=(req, res,next) =>{
  /*
   #swagger.tags = ['Books']
 #swagger.parameters['obj'] = {
  name: 'obj',
  in: 'body',
  required: true,
  schema: {
        $title: 'Jhon Doe',
        $author: 'Applet',
        $year: 2023,
        $pages: 129,
                }
}
  #swagger.tags = ['Books']
       #swagger.responses[200] = {
        description: 'Book updated by its id',
        schema: { 
          $status: "success",
          $statusCode: 200,
          $message: "Book updated!",
          $data: 
            {            
        $_id: "63b7fc6903a1632296ce04de",
        $title: "english",
        $author: "ahtazaz",
        $year: 2023,
        $pages: 12,
        $createdAt: "2023-01-06T10:48:09.103Z"        
            }
                
}
 */
       let {title,author,year,pages}=req.body;
    try {
        Book.findById({_id: req.params.id}, (err, book) => {
            if(err) res.send(err);
            Object.assign(book, req.body).save((err, book) => {
                if(err) res.send(err);

            res.send(Response.getOkRequest(book,"Book updated!"));
            });    
        });
    }catch (error) {
        next(error); 
     }

}



