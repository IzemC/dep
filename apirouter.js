const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const dbKey = "bZtPOWA5YHxz9tLq"; 
const dbUser = "test";

const secretKey = "gsdhr<jrjdjzf<ghshe";
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb://${dbUser}:${dbKey}@cluster0.fqofh.mongodb.net/test`;
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
    COLLECTION_USERS= client.db("test").createCollection("users")
    COLLECTION_POSTS= client.db("test").createCollection("posts");
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
    if(creds?.username == "azem") next();
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
router.get("/auth",(req,res)=>{
    res.set('Set-Cookie',jwt.sign({username:"azem"},secretKey))
    res.sendStatus(200);
});

router.all("*",(req,res)=>{
    es.sendStatus(404);
});


module.exports = router;