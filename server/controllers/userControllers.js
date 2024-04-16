const User = require('../models/user')
const bcrypt = require('bcrypt')
const { generateToken } = require('./generateToken')
const user = require('../models/user')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
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

        let pic
        // problem not wokring
        if(req?.files?.image){
            console.log('req',req.files.image)
            pic = await uploadImageToCloudinary(
                req.files.image,
                process.env.FOLDER_NAME,
                1000,
                1000,
            )
        }
        
        // hash the pasword
        const hashPassword = await bcrypt.hash(password,10)
        
        const profilePic= pic ? pic.secure_url : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        
        const user = await User.create({
            name:firstName+" "+lastName,
            email,
            password:hashPassword,
            pic: profilePic,//iss api se avtar banta hai atul yadav -> ay
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
            error
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