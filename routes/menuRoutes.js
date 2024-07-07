const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/MenuItem');

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenuItem=new MenuItem(data);
        const response=await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/',async (req,res)=>{
    try{
        const data= await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    } 
})
router.get('/:taste', async(req,res)=>{
    try{
        const taste=req.params.taste;
        if(taste=='sweet'||taste=='sour'||taste=='spicy'){
            const response=await MenuItem.find({taste:taste})
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid tastes'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
    const updatedData=req.body;
    const response= await MenuItem.findByIdAndUpdate(menuId,updatedData,{
        new:true,
        runValidators:true,
    })
    if(!response){
        return res.status(404).json({error:'Menu not found'});
    }
    console.log('data updated');
    res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.delete('/:id',async (req,res)=>{

    try{
        const menuId=req.params.id;
    const response=await MenuItem.findByIdAndDelete(menuId);
    if(!response)
        return res.status(404).json({error:'file not found'});
    console.log('Document Deleted')
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(200).json({err:'Internal server error'});
    }
})
module.exports=router;