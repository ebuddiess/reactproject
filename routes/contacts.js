const express = require('express')
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("get all contacts")
})

router.post("/",(req,res)=>{
    res.send("add  contacts")
})


router.put("/:id",(req,res)=>{
    res.send("update contact base on id of contacts")
})

router.delete("/:id",(req,res)=>{
    res.send("delete")
})


module.exports =  router;