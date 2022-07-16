let express = require('express');
let app = express();
var bGround = require('fcc-express-bground');
var bodyParser = require("body-parser")
require('dotenv').config()
app.use('/public', express.static(__dirname+ '/public'));

//Middleware for getting method poth and ip address
app.use(function(req,res,next){
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
})
//Middleware for getting method bodyParser Data after every request.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//serving html file
app.get("/",function(req,res){
    res.sendFile(__dirname+"/views/index.html");
  })
//serving json data
app.get("/json",function(req,res){
   res.json({"message": "HELLO JSON"})
    // if(process.env.MESSAGE_STYLE==="uppercase"){
    //   res.json({"message": "HELLO JSON"});
    // }else{
    //   res.json({"message": "Hello json"});
    // }
    
})
function getCurrentDateTime(){
    return new Date().toString();
}
//get current time and handle outside function
app.get("/now",function(req,res,next){
   req.time=getCurrentDateTime();
    next()
  },function(req,res) {
    res.json({time:req.time})
  })
//get current params object 
app.get("/:word/echo",function(req,res){
    res.json({echo: req.params.word})
})
//get current query object 
app.get("/name",function(req,res){
     res.json({name: req.query.first+" "+req.query.last})
})

module.exports = app;