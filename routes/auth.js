const express = require('express')
const router = express.Router();

const UserModel = require('../models/usersModel')
const {check , validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const config  = require("config")
const authmid = require("../middleware/authmiddleware")

constraints = [
    check('email','Email is required').not().isEmpty(),
    check('email','Email is invalid').isEmail(),
    check('password','Enter a password').not().isEmpty(),
 ]
 
    
router.get("/",authmid,async (req,res)=>{
    try {
        const user = await UserModel.findById(req.user.id).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("server error")

    }
})

router.post("/",constraints,async (req,res)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const { email , password } = req.body 

    try {
        let user = await UserModel.findOne({email})
        if(!user) {
            res.status(400).json({msg:"User doesnt exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password) 
        if(!isMatch){
            res.status(400).json({msg:"invalid credentials"})
        }

        const payload =  {
            user : {
                id : user.id
            }
        }
        
        // making jwt with payload 

        jwt.sign(payload,config.get("jwtsecret"),{
            expiresIn : 36000,

        },(err,token) => {
            if (err) console.log(err)
            res.json({token})
            /* {
           "token": "eyJhbGc"
                }   */
        })
    } catch (error) {

        console.log(error.message)
        res.status(500).send("server error")
    }
})

module.exports =  router;