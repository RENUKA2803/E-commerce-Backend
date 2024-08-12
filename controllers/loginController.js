const Users=require ('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.login=async (req,res)=>{
    const {email,password}=req.body
    try{
        const user=await Users.findOne({email})
        if(!user){
        return res.status(404).json({message:'User not found'})
        }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:'Invalid password'})
    }
    const token=jwt.sign({user_id:user._id,email:user.email},"secret_token",{
        expiresIn:'1h'
    })
    res.status(200).json(token)

}catch(err){
    console.error(err)
}}