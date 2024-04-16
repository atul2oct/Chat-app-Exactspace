const User = require('../models/user')
const Chat = require('../models/chat')
require('dotenv').config()

// one-on-one chats
exports.accessChat = async (req,res) => {
    try{
        const {userId} = req.body
        // console.log("user",req.user._id)
        console.log("user",req.user)

        if(!userId){
            return res.status(400).json({
                success:false,
                message:`User id is missing`,
            })
        }
    // it searches for one-on-one chats where both the logged-in user (req.user._id) and the user specified by userId are participants. If such a chat exists, it will be returned in the isChat
        let isChat = await Chat.find({
            isGroupChat: false,
            $and:[
                {users: { $elemMatch: {$eq: req.user.id}}},
                {users: { $elemMatch: {$eq: userId}}}
            ]
        })
        .populate("users", "-password")
        .populate("latestMessage")
        .exec()
        console.log("isChat",isChat)

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email",
        })
        console.log("isChat",isChat)

        if( isChat.length > 0 ){
            res.send(isChat[0])
        }else{
            // create new chat
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user.id, userId]
            }

            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id:createdChat._id }).populate("users","-password")

            return res.status(200).json({
                success:true,
                data:fullChat,
                message:"Success"
            })

        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong in access Chat error: ${error}`,
            data:error
        })
    }
}

// fetch chats for logged in user
exports.fetchChats = async (req,res) => {
    try{
        const result = await Chat.find({users: {$elemMatch: {$eq: req.user.id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})

        const populatedChats = await User.populate(result, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        console.log(result)
        return res.status(200).json({
            success:true,
            populatedChats,
            result
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:`Something went wrong in access Chat error: ${error}`,
            data:error
        })
    }
}

exports.creategroupChat = async (req,res) => {}

exports.renameGroup = async (req,res) => {}

exports.removeFromGroup = async (req,res) => {}

exports.addToGroup = async (req,res) => {}
