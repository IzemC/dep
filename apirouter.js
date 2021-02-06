const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const dbKey = "365tenders1270%40"; 
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
    COLLECTION_USERS= client.db("365tenders").collection("members") ;
    COLLECTION_POSTS= client.db("365tenders").collection("posts") ;
});

const authFilter = (req,res,next)=>{
    let creds;
    try{
    creds = jwt.verify(req.header("Cookie").match(/auth=(\S*?);?$/)[1],secretKey)
    }catch(e){
    console.log(e)
    res.sendStatus(404);
    }
    console.log(creds);
    if(COLLECTION_POSTS.find({username: creds.username})) 
        next();
    else res.sendStatus(404);
};

router.post("/register",express.urlencoded(),async (req,res)=>{
    let st = await COLLECTION_USERS.insertOne({
        username : req.body.username,
        password : req.body.password,
    })
    console.log(st);
    if(st){
        res.set('Set-Cookie',`auth=${jwt.sign({username:req.body.username},secretKey)};`);
        res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
});
router.get("/posts",async (req,res)=>{
    let posts = COLLECTION_POSTS.find("").limit(100);
    let pa = await posts.toArray();
    res.send(pa);
    posts.close();
});
router.post("/posts",authFilter,(req,res)=>{
    COLLECTION_POSTS({title:"gdsg",body:"gdsgg"});
    res.json(COLLECTION_POSTS.find(""));
});
router.post("/auth",express.urlencoded(),async (req,res)=>{
    let col =  await COLLECTION_USERS.findOne({username:req.body.username,password: req.body.password},
        )
    if(col != undefined ){
        console.log(col);
        res.set('Set-Cookie',`auth=${jwt.sign({username:req.body.username},secretKey)};`);
        res.sendStatus(200);
        return;
    }
    res.sendStatus(404)
});
router.all("*",(req,res)=>{
    es.sendStatus(404);
});


module.exports = router;