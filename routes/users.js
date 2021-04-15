const express = require('express')
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("GET LOGGED IN  USER")
})


router.post("/",(req,res)=>{
    res.send("LOGGED IN  USER")
})

module.exports =  router;