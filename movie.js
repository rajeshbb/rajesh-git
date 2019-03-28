var express=require('express');
var bodyparser=require('body-parser');
var app=express()
var fs=require('fs')
var path=require('path')
var http = require('http');


var bb=require('bluebird');
var initOption={
    promiseLib:bb,
    error(error,e){
        if(e.cn){
          // A connection-related error\
            console.log('EVENT:',error.message || error);
        }
    },
}

var pgp=require('pg-promise')(initOption);
var cs="postgres://postgres:1992@localhost:5432/oss7";
var dbc=pgp(cs);
app.use(express.static(path.join(__dirname, 'pics')));
app.use(bodyparser .json())
app.use(function(req,res,next) {
    res.setHeader('Access-control-Allow-Origin','*')
    res.setHeader('Access-control-Allow-Methods','*')
    res.setHeader('Access-Control-Allow-Headers','x-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    
    next();
});
app.get('/movieinfoo',function(req,res,next){
    dbc.any('select *from movieinfoo ').then ((data)=>{
res.send(data)
    });
}); 


// get//

app.get('/movieinfoo/:id',function(req,res,next){
    var i=req.params.id
    dbc.any('select *from movieinfoo where movieid=$1',i ).then ((data)=>{
        res.send(data)
})
})
//post//
app.use(bodyparser.json())
app.post('/movieinfoo/',function(req,res,next){
    // var movieid=req.body.movieid
    var moviename=req.body.moviename
    var heroname=req.body.heroname
    var poster=req.body.poster
    var dt=new Date()
    var newfilename=dt.getFullYear()+"-" +dt.getMonth()+"-"+dt.getDate()+"-"+dt.getHours()+"-"+
    dt.getMinutes()+"-"+dt.getSeconds()+'.png';
    var nfn= path.join('./pics',newfilename)
    fs.writeFile(nfn, poster,'base64', (err)=>{
    console.log(nfn);
    if (err){
        console.log("image is not saved")
    }
})
    
    var trailer=req.body.trailer
    var gener=req.body.gener
    dbc.any('insert into movieinfoo (moviename,heroname,poster,trailer,gener) values ($1,$2,$3,$4,$5)',
    [moviename,heroname,"http://localhost:5000/"+newfilename,trailer,gener])
    .then((data)=>{
        res.send({'message': 'sucess'});
        
});
});
//put//
app.use(bodyparser.json())
app.put('/movieinfoo/',function (req,res,next){
    var movieid=req.body.movieid
    var heroname=req.body.heroname
    var poster=req.body.poster
    var trailer=req.body.trailer
    var moviename=req.body.moviename
    var gener=req.body.gener
    dbc.any('update movieinfoo set heroname=$1,poster=$2,trailer=$3 where movieid=$4',
    [heroname,poster,trailer,movieid]).then((data)=>{
res.send({'message':'edit sucessfully'})

})
})


app.use(bodyparser.json())
app.delete('/movieinfoo/:movieid',function(req,res,next){
    var movieid=req.params.movieid
dbc.any('delete from movieinfoo where movieid=$1',movieid).then((data)=>{
    res.send({'message':'delete sucessfully'})
})
})
// app.use(bodyparser.json())
app.post("/user/login", (req, res,next) => {
    var u = req.body.userid;
    var p = req.body.password;
    console.log(req.body);
    dbc.any('select * from userinfo where userid = $1 and password =$2 ', [u, p]).
    then((result) => {
    if(result.length>0) {
        res.send({"valid":"true"})
    }  else{
        res.send({"valid":"false"})
    }
    
    })
})

app.listen(5000,(err)=>{
    if(err){
        console.log("server error")
        
    }
    else{
        console.log("server started")
    }
})








// var express = require('express')
// var app = express();
// var bodyparser = require('body-parser');
// var fs=require('fs');
// var http = require('http');

// var bb=require('bluebird');
// var initOptions = {
//     promiseLib: bb,
//     error(error, e) {
//         if(e.cn) {
//             // A connection-related error\
//             console.log('EVENT:', error.message || error);
//         }
//     },
// }
// var pgp = require('pg-promise')(initOptions);
// var cs="postgres://postgres:1992@localhost:5432/oss7";
// var db = pgp(cs);
// app.use(bodyparser.json());
// app.use(function(req,res,next)
// {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });


// app.get('/',(req,res)=>{
//     res.send("Hi Api Working ....")
// })

// app.get('/movieinfoo',(req,res)=>{
//         db.any("select * from movieinfoo").then(
//             (data)=>{
//                 res.send(data)
//             })
// })


// app.get('/movieinfoo/:movieid',(req,res)=>{
//     var i = req.params.id
//     db.any("select * from movieinfoo where movieid= $1",i).then(
//         (data)=>{
//             res.send(data);
//         })
// })
// app.post('/movieinfoo', function (req, res, next){
//     // var movieid=req.body.movieid
//     var moviename=req.body.moviename
//     var heroname = req.body.heroname
//     var poster=req.body.poster
//     var trailer=req.body.trailer
//     var gener=req.body.gener
//     db.any('insert into movieinfoo(moviename,heroname,poster,trailer,gener) values($1,$2,$3,$4,$5)',
//     [moviename,heroname,poster,trailer,gener]).then((data)=>
//     {
//         res.send({'message':'add sucessfully'});
//     })
// })
// app.put('/movieinfoo/', function (req, res, next){
//     console.log(req.body);
//     var movieid=req.body.movieid;
//     var heroname=req.body.heroname;
//     db.any('update movieinfoo set movieid=$1 where heroname=$2',[movieid,heroname]).then((data)=>
//     {
//         res.send(data);
//     });
// });
// app.delete('/movieinfoo/:movieid',(req,res,next)=>{
//     var movieid = req.params.movieid
//     db.any('delete from movieinfoo where movieid = $1', movieid). then(
//         (data)=>{
//             res.send({'message':'Record Deleted Successsssss'})
//         }
//     )
// })
// app.listen("5000",(err)=>{
//     if(err){
//         console.log("Server Errorr...")
//     }
//     else{
//         console.log("Server Started at  : http://localhost:5000/ ")
//     }
// })








