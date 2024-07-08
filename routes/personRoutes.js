const express=require('express');
const router=express.Router();
const Person=require('./../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


router.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log('data saved');

        const payload={
            id:response.id,
            usernmae:response.username
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//login Route
router.post('/login',async(req,res)=>{
    try{
        //extract username and password
        const {username,password}=req.body;
        //find the user by username
        const user=await Person.findOne({username:username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'})
        }
        //generate token
        const payload={
            id:user.id,
            username: user.usernmae

        }
        const token=generateToken(payload);
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log('User Data :',userData);

        const userId=userData.id;
        const user=await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const data= await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'|| workType=='manager'|| workType=='waiter'){
            const response=await Person.find({work:workType});
            res.status(200).json(response);

        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


module.exports=router;