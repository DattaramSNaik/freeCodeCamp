let express = require('express');
let app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config()
app.use('/public', express.static(__dirname+ '/public'));
app.use(function(req,res,next){
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/views/index.html");
  })
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
app.get("/now",function(req,res,next){
   req.time=getCurrentDateTime();
    next()
  },function(req,res) {
    res.json({time:req.time})
  })

app.get("/:word/echo",function(req,res){
    res.json({echo: req.params.word})
})

module.exports = app;