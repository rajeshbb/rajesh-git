var express=require('express')
var bodyparser=require('body-parser')
var app=express()
var bb=require('bluebird')
var initOption={
    promiseLib:bb,
    error(e,error){
        if(e.cn){
            console.log('EVENT:', error.message|| error)
        }
    }
}

var pgp=require('pg-promise') (initOption)
var cs="postgres://postgres:1992@localhost:5432/oss7";
var dbc=pgp(cs);
app.use(bodyparser .json());
app.use(function (req,res,next){
    res.setHeader('Access-control-Allow-Origin','*')
    res.setHeader('Access-control-Allow-Methods','*')
    res.setHeader('Access-Control-Allow-Headers','x-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    
next();
})

app.get('/register/',function(req,res,next){
   
    dbc.any('select * from register').then((data)=>{
        res.send(data)
        
    })
})
app.get('/register/:username',function(req,res,next){
    var username=req.params.username
    dbc.any('select *from fn_getusername($1)',username).then((data)=>{

        res.send(data)
        
    })
})

//post//
app.use(bodyparser.json())
app.post('/register/',function(req,res,next){
    var fname=req.body.fname
    var lname=req.body.lname
    var username=req.body.username
    var password=req.body.password
    var email=req.body.email
    var phone=req.body.phone
    var gender=req.body.gender
    dbc.any('select fn_post($1,$2,$3,$4,$5,$6,$7)',[fname,lname,username,password,email,phone,gender]).then((data)=>{
res.send(data);
    })
})

//post1//
app.post('/register1/',function(req,res,next){
    var fname=req.body.fname
    var lname=req.body.lname
    var username=req.body.username
    var password=req.body.password
    var email=req.body.email
    var phone=req.body.phone
    var gender=req.body.gender
    dbc.any('select fn_post($1,$2,$3,$4,$5,$6,$7)',[fname,lname,username,password,email,phone,gender]).then((data)=>{
res.send({"message":"saved sucessfully"});
    })
})
// user//

app.post("/user/login", (req, res,next) => {
    var u = req.body.username;
    var p = req.body.password;
    console.log(req.body);
    dbc.any('select * from register where username = $1 and password =$2 ', [u, p]).
    then((result) => {
    if(result.length>0) {
        res.send({"valid":"true"})
    }  else{
        res.send({"valid":"false"})
    }
    
    })
})
app.put('/register',function(req,res,next){

var fname=req.body.fname
var lname=req.body.lname
var password=req.body.password
var email=req.body.email
var phone=req.body.phone
var gender=req.body.gender
var username=req.body.username
dbc.any('select fn_update3($1,$2,$3,$4,$5,$6,$7)',[fname,lname,password,email,phone,gender,username]).
then((data)=>{
    res.send({"message": "sucessfuly"})
})
})
app.delete('/register/:username',function(req,res,next){
    var username=req.params.username
    dbc.any('select fn_delete1($1)',username).then((data)=>{
res.send({'message':'delete sucessfully'})
    })
})
app.listen(8000,(err)=>{
    if(err){
        console.log("server error")

    }else{
        console.log("server started")
    }
})