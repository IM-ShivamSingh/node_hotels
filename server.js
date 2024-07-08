const express = require('express');
const app = express();
const db=require('./db');
require('dotenv').config();

const passport=require('./auth');


const bodyParser=require('body-parser');
app.use(bodyParser.json());

//middleware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/' ,function (req, res) {
  res.send('Welcome to my server ENJOY')
})


const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/MenuItem',menuRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('server is working on port 3000');
});