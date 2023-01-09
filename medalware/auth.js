const jwt = require('jsonwebtoken');
const Response = require('../utils/Response/response')
const userController = require('../api/Users/UserController');
exports.authenticate=(req, res, next)=> {
  /*
  #swagger.responses[fail_auth] = {
            description: 'Please Login for Access',
            schema: { 
                  $status: "fail",
                  $statusCode: 401,
                  $message: "Unauthorized"
             }
    }
 
    */
    const token = req.session.token;
    if (!token) {
        res.send(Response.getUnauthorizedRequest("Unauthorized")) 
    }
  
    jwt.verify(token,  process.env.JWT_SECERT_KEY, (error, decoded) => {
      if (error) {
        res.send(Response.getUnauthorizedRequest("Unauthorized")) 

      }
  
      req.user = decoded.user;
      next();
    });
  }
  

  