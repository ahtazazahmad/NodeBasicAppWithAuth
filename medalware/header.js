
const Response = require('../utils/Response/response')
exports.verfiyHeader=(req, res, next)=> {
    console.log(req.headers.api_key);
    console.log(process.env.API_KEY)
if(!req.headers.api_key){
    res.send(Response.getUnauthorizedRequest("Please Enter API key")) 
}
if(req.headers['api_key'].trim()===process.env.API_KEY.trim()){
    console.log("sdfs");
    next();
}
else{
    res.send(Response.getUnauthorizedRequest("Please Enter a Valid API key"))
}
}