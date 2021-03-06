const bcrypt =require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const User = require ('../models/user')

const signin = async(req,res)=>{
    const {email,password} = req.body
    try{
        const existingUser = await User.findOne({email})

        if(!existingUser) return res.status(404).json({message: "User doesn't user"})

        const isPasswordCorrect  = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.staus(400).json({message: "Invalid credentials"})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "somesecret", {expiresIn:"1h"})
        
        return res.status(200).json ({result: existingUser, token})
    }
    catch(err){
        return res.status(500).json({message: "Something went wrong"})
    }
}

const signup = async(req,res)=>{
    const {email, password, confirmPassword, firstName, lastName } = req.body

    try{
        const existingUser = await User.findOne({email})

        if(existingUser) 
            return res.status(400).json({message: "User is already existed"})

        if(password !== confirmPassword)
            return res.status(400).json({message: "Password does not match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result  = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({email: result.email, id: result._id}, "somesecret", {expiresIn: "1h"})

        res.status(200).json({result, token})
    }
    catch(err){
        return res.status(500).json({message: "Something went wrong"})
    }
}

module.exports = {signin,signup}
