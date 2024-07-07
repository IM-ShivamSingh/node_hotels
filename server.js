const express = require('express');
const app = express();
const db=require('./db');


const bodyParser=require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Welcome to my server ENJOY')
})


const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/MenuItem',menuRoutes);

app.listen(3000, ()=>{
    console.log('server is working on port 3000');
});