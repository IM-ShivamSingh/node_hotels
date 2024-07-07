const mongoose=require('mongoose');
require('dotenv').config();

//const mongoURL=process.env.mongoURL_local
const mongoURL=process.env.mongoURL

mongoose.connect(mongoURL,{
    //   useNewUrlParser:true,
    //   useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to mongodb server')
})
db.on('error',(err)=>{
    console.log('connection error:',err);
})
db.on('disconnected',()=>{
    console.log('mongodb disconnected');
})
module.exports=db;