const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('./generateToken')
require('dotenv').config()

// signUp
exports.signUp = async (req,res) => {
    try{

        const {
            firstName,
            lastName,
            email,
            password,  
        } = req.body
        
        // validate data
        if(!firstName || 
            !lastName || 
            !email || 
            !password){
                return res.status(403).json({
                    success:false,
                    message:`All fields are required`
                })
            }

        // check user already exists or not
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({
                success:false,
                message:`User already exists. Please sign in to continue.`
            })
        }
        
        // hash the pasword
        const hashPassword = await bcrypt.hash(password,10)
        
        const user = await User.create({
            name:firstName+" "+lastName,
            email,
            password:hashPassword,
            pic: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,//iss api se avtar banta hai atul yadav -> ay
        })
        
        console.log(user)

        // return response        
        return res.status(200).json({
            success:true,
            user,
            token:generateToken(user),
            message:"User is registered successfully"

        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong in sign up User connot be registered error: ${error}`,
            data:error
        })
    }
}

// login
exports.login = async (req,res) => {
    try{
        const {email, password} = req.body

        // validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required, please try again"
            })
        }

        // user check exist or not
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered please sign up first"
            })
        }

        // generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)){
            // password matched successfully
            return res.status(200).json({
                success:true,
                token:generateToken(user),
                data:user,
                message:"User signed in successfully"
            })
        }else{
            // password mismatched
            return res.status(401).json({
                success:false,
                message:"Password mismatched"
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong in sign up User connot be registered error: ${error}`
        })
    }
}

// get all users
exports.allUsers = async (req,res) => {
    try{
        const keyword = req.query.search ? {
            $or: [
                {name: {$regex: req.query.search, $options: 'i'}},
                {email: {$regex: req.query.search, $options: 'i'}}
            ]
        } : {}
        const users = await User.find(keyword).find({_id: {$ne: req.user._id}})
        return res.status(200).json({
            success:true,
            users,
            message:"User signed in successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong in fetching all User error: ${error}`
        })
    }
}