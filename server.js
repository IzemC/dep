const express = require('express');
const path = require('path');
const apiRouter = require('./apirouter'); 

const app = express();

app.use(express.static(path.resolve(__dirname,'dist')));
app.use("/api",apiRouter);
app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'dist','index.html'));
});

app.listen(process.env.PORT || 5000);