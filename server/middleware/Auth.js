const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// auth
exports.auth = async (req,res,next) => {
    try{
        const token = req.body.token || req.header("Authorization").replace("Bearer ","");

        // if token missing, then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:`Token is missing`,
            })
        }
        
        // verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        }catch(error){
            return res.status(401).json({
                success:false,
                message:`token is invaild`
            })
        }
        next()
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong while validating the token in auth middleware error: ${error}`
        })
    }
}