var express = require('express')
var app = express();
var bodyparser = require('body-parser');
var fs = require('fs');
var path = require('path')
var http = require('http');

var bb = require('bluebird');
var initOptions = {
    promiseLib: bb,
    error(error, e) {
        if (e.cn) {
            // A connection-related error\
            console.log('EVENT:', error.message || error);
        }
    },
}
var pgp = require('pg-promise')(initOptions);
var cs = "postgres://postgres:root@localhost:5432/oss7";
var db = pgp(cs);

app.use(express.static(path.join(__dirname, 'pics')));

app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/', (req, res) => {
    res.send("Hi Api Working ....")
})

app.get('/movies', (req, res) => {
    db.any("select * from movies").then(
        (data) => {
            res.send(data)
        })
})


app.get('/movies/:id', (req, res) => {
    var i = req.params.id
    db.any("select * from movies where mid= $1", i).then(
        (data) => {
            res.send(data);
        })
})

app.post('/movies', function (req, res, next) {

    var mname = req.body.Mname
    var mposter = req.body.Mposter
    var dt = new Date();
    var newFileName = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate() + "-" + dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds() + '.png';

    var nfn = path.join('./pics', newFileName)
    console.log(nfn);
    fs.writeFile(nfn, mposter, 'base64', (err) => {
        if (err) {
            console.log("Image not saved ..")
        }
    })
    var mgenere = req.body.Mgenere
    var mhero = req.body.Mhero
    var mtrailer = req.body.Mtrailer
    db.any('insert into movies (mname,mhero,mposter,mgenere,mtrailer) values($1,$2,$3,$4,$5)', [mname, mhero, "http://localhost:3400/" + newFileName, mgenere, mtrailer]).then((data) => {
        res.send({ "message": "Saved Success" });
    })
})

app.put('/movies/', function (req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var actor = req.body.actor;
    db.any('update movies set actor=$1 where mid=$2', [actor, id]).then((data) => {
        res.send(data);
    });
});

app.delete('/movies/:id', (req, res, next) => {
    var id = parseInt(req.params.id)
    db.any('delete from movies where mid = $1', id).then(
        (data) => {
            res.send({ 'message': 'Record Deleted Successsssss' })
        }
    )
})

app.post("/user/Login", (req, res,next) => {
    var u = req.body.userId;
    var p = req.body.password;
    console.log(req.body);
    db.any('select * from userInfo where userID = $1 and password =$2 ', [u, p]).then((result) => {
       
        if (result.length>0) {
            res.send({ "valid": "true" })
        }
        else
            res.send({ "valid": "false" })
    })
})



app.get("user/Register", () => { })

app.listen("3400", (err) => {
    if (err) {
        console.log("Server Errorr...")
    }
    else {
        console.log("Server Started at  : http://localhost:3400/ ")
    }
})

