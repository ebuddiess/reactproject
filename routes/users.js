const express = require('express')
const router = express.Router();
const UserModel = require('../models/usersModel')
const {check , validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const config  = require("config")

constraints = [
check('name','Name is required').not().isEmpty(),
check('email','Email is required').not().isEmpty(),
check('email','Email is invalid').isEmail(),
check('password','Enter a password').not().isEmpty(),
check('password','Enter a password with 6 or more character').isLength({min:6}),
]

router.get("/",(req,res)=>{ 
    res.send("GET LOGGED IN  USER")
})


router.post("/",constraints, async (req,res)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const {name , email , password } = req.body

    try {

        let user = await UserModel.findOne({email})

        if(user){
            res.status(400).json({msg :"User already exist"})
        }

        user = new UserModel(
        {
            name,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10) // gen a salt 
        user.password = await bcrypt.hash(password,salt) // gen a hash password with salt
        await user.save() // saving the user

        const payload =  {
            user : {
                id : user.id
            }
        }
        
        // making jwt with payload 

        jwt.sign(payload,config.get("jwtsecret"),{
            expiresIn : 36000,

        },(err,token) => {
            if (err) throw err
            res.json({token})
            /* {
           "token": "eyJhbGc"
                }   */
        })

    }catch(error)
    {
        console.log(error.message)
        res.status(500).send("server error")
    }
})

module.exports =  router;