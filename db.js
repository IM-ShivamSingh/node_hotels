const mongoose=require('mongoose');
const mongoURL='mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to mongodb server')
})
db.on('error',()=>{
    console.log('connection error:',error);
})
db.on('disconnected',()=>{
    console.log('mongodb disconnected');
})