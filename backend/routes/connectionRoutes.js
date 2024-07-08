const router = require('express').Router();
const Connection = require('../models/connections');

router.get('/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const connections = await Connection.find({from:id});
        res.status(200).json({data:connections});
    }
    catch(err){
        console.log(err);
    }
});

router.post('/add',async (req,res)=>{
    try{
        const data = req.body;
        await Connection.insertMany(data);
        res.status(200).json({message:"Connections Succesfully Created"});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;