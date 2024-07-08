const router = require('express').Router();
const Service = require('../models/service');

router.get('/:service',async (req,res)=>{
    try{
        const service = req.params.service;
        const data = await Service.findOne({service:service});
        res.status(200).json({data:data});
    }
    catch(err){
        console.log(err);
    }
});

router.post('/add',async (req,res)=>{
    try{
        const data = req.body;
        await Service.insertMany(data);
        res.status(200).json({message:"Services Added Succesfully"});
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;