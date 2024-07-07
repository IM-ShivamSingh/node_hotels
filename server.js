const express = require('express');
const app = express();
const db=require('./db');

// const Person=require('./models/person');
// const MenuItem=require('./models/MenuItem');

const bodyParser=require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Welcome to my server ENJOY')
})

// app.get('/chicken',(req,res)=>{
//     res.send('Wait for 5 min order is getting ready');
// })

// app.get('/idly',(req,res)=>{
//     var customized_idli={
//         name:'rava idli',
//         size:'10cm',
//         is_sambar:true,
//     }
//     res.send(customized_idli);
// })




// app.post('/person',async(req,res)=>{
//     try{
//         const data=req.body;
//         const newPerson=new Person(data);
//         const response=await newPerson.save();
//         console.log('data saved');
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal server error'});
//     }
// })
// app.post('/MenuItem',async(req,res)=>{
//     try{
//         const data=req.body;
//         const newMenuItem=new MenuItem(data);
//         const response=await newMenuItem.save();
//         console.log('data saved');
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal server error'});
//     }
// })

// app.get('/MenuItem',async (req,res)=>{
//     try{
//         const data= await MenuItem.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal server error'});
//     }
// })


// app.get('/person/:workType',async (req,res)=>{
//     try{
//         const workType=req.params.workType;
//         if(workType=='chef'|| workType=='manager'|| workType=='waiter'){
//             const response=await Person.find({work:workType});
//             res.status(200).json(response);

//         }
//         else{
//             res.status(404).json({error:'Invalid work type'});
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal server error'});
//     }
// })


// app.get('/person',async (req,res)=>{
//     try{
//         const data= await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal server error'});
//     }
// })

const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/MenuItem',menuRoutes);

app.listen(3000, ()=>{
    console.log('server is working on port 3000');
});