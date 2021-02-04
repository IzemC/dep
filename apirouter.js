const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const dbKey = "365tenders1270@"; 
const dbUser = "owner";

const secretKey = "gsdhr<jrjdjzf<ghshe";
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb://${dbUser}:${dbKey}@localhost:27017/365tenders`;
const client = new MongoClient(uri, {
     useNewUrlParser: true ,
     useUnifiedTopology: true,
     tls:false,
     ssl:false,
     socketTimeoutMS:10000,
     connectTimeoutMS:10000,
    });
let COLLECTION_USERS=null;
let COLLECTION_POSTS=null;
client.connect(err => {
    if(err){
    console.log(err);
    client.close();
    return;
    }
    COLLECTION_USERS= client.db("365tenders").collection("members") ? client.db("365tenders").collection("members") : client.db("365tenders").createCollection("members");
    COLLECTION_POSTS= client.db("365tenders").collection("posts") ? client.db("365tenders").collection("posts") : client.db("365tenders").createCollection("posts");
});



const authFilter = (req,res,next)=>{
    let creds;
    try{
    creds  = jwt.verify(req.header("Cookie"),secretKey)
    }catch(e){
    console.log(e)
    res.sendStatus(404);
    }
    console.log(creds);
    if(COLLECTION_POSTS.find({username: creds.username})) 
        next();
    else res.sendStatus(404);
};

router.post("/register",(req,res)=>{
    COLLECTION_USERS.createIndex({
        username : req.data.username,
        password : req.data.password,
    })
});
router.get("/posts",authFilter,(req,res)=>{
    let posts =COLLECTION_POSTS.find("");
    res.json(JSON.stringify(posts));
});
router.post("/posts",authFilter,(req,res)=>{
    COLLECTION_POSTS.createIndex({title:"gdsg",body:"gdsgg"});
    res.json(COLLECTION_POSTS.find(""));
});
router.get("/auth",express.urlencoded(),(req,res)=>{
    let col =  COLLECTION_USERS.find({username:req.body.username,password: req.body.password})
    if(col){
        res.set('Set-Cookie',jwt.sign({username:req.body.username},secretKey))
        return;
    }
    res.sendStatus(200);
});
router.all("*",(req,res)=>{
    es.sendStatus(404);
});


module.exports = router;