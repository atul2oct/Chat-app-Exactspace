const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        pic:{
            type:String,
            required:true,
            default: "https://api.dicebear.com/8.x/avataaars/svg",
        },
    },
    { 
        timestamps: true
    }
)

module.exports = mongoose.model('User',userSchema)