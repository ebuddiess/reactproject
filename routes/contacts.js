const express = require('express')
const router = express.Router();

const {check , validationResult } = require("express-validator")
const contactModel = require('../models/contactsModel')
const UserModel = require('../models/usersModel') 
const authmid = require("../middleware/authmiddleware")

constraints = [
    check('name','Name is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Email is invalid').isEmail(),
    check('phone','Enter a valid phone number').not().isEmpty(),
    ]
    

router.get("/",authmid , async(req,res)=>{
    try {
        const contact = await contactModel.find({user:req.user.id}).sort({date:-1})
        res.json(contact)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg : "server error"})
    }
})


router.post("/",authmid,constraints,async (req,res)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const { name , email , phone , type  } = req.body

    try {

        const newContact = new contactModel({
            name,email,phone,type,user:req.user.id
        })

        const contact = await newContact.save()

        res.json(contact)

    } catch ({error}) {
        console.log(error.message)
        res.status(500).json("server error")
    }
})


router.put("/:id",authmid , async(req,res)=>{

    const id = req.params.id 

    res.send(req.body)

    try {
        const contact = await contactModel.findByIdAndUpdate({_id:id} , req.body)
        res.json(contact)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg : "server error"})
    }
})

router.delete("/:id",authmid , async(req,res)=>{
    const id = req.params.id 
     try {
        const contact = await contactModel.findByIdAndDelete({_id:id})
        res.json(contact)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg : "server error"})
    }
})


module.exports =  router;