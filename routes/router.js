const express=require('express');
const router=express.Router();

let resources=[];
let idcounter=1;

router.post('/resource',(req,res)=>{
    const{name,description}=req.body;
    if(!name || !description){
        return res.status(400).json({message:"name and description are required"})
    }

    const newresource={id:idcounter++,name,description}
    resources.push(newresource)
    return res.status(201).json(newresource)
})


router.get('/resource/:id',(req,res)=>{
    const{id}=req.params;
    const resource=resources.find(r=>r.id===parseInt(id))

    if(!resource){
        return res.status(404).json({message:"Resource not found"})
    }

    res.status(200).json(resource)
})



router.put('/resource/:id',(req,res)=>{
    const{id}=req.params;
    const{name,description}=req.body;
    if(!name||!description){
        return res.status(400).json({message:"name and description are required"})
    }

    const resourceindex=resources.findIndex(r=>r.id===parseInt(id))
    if(resourceindex===-1){

        return res.status(404).json({message:"resource not found"})


    }

    resources[resourceindex]={id:parseInt(id),name,description}
    res.status(200).json(resources[resourceindex])
})


router.delete('/resource/:id',(req,res)=>{
    const{id}=req.params;
    const resourceindex=resources.findIndex(r=>r.id===parseInt(id))
    if(resourceindex===-1){
        return res.status(404).json({message:"resource not found"})

    }

    resources.splice(resourceindex,-1)
    res.status(200).json({message:"resource deleted succesfully"})
})



module.exports=router;