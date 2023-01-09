
const Response = require('../utils/Response/response')
exports.verfiyHeader=(req, res, next)=> {
/*  
#swagger.responses[fail] = {
            description: 'API key Validation Error',
            schema: { 
                  $status: "fail",
                  $statusCode: 401,
                  $message: "Unauthorized || Please Enter a Valid API key"
             }
    }
 #swagger.responses[fail_1] = {
            description: 'Bad Request',
           schema: { 
                  $status: "fail",
                  $statusCode: 400,
                  $message: "error message"
             }
    }
*/

if(!req.headers.api_key){
    res.send(Response.getUnauthorizedRequest("Please Enter API key")) 
}
if(req.headers['api_key'].trim()===process.env.API_KEY.trim()){
    next();
}
else{
    res.send(Response.getUnauthorizedRequest("Please Enter a Valid API key"))
}
}