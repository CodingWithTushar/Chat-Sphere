import { getRecevierSocketId, io } from "../lib/socket.js";
import MessageModel from "../model/message.model.js";
import UserModel from "../model/user.model.js";
import {v2 as cloudinary} from "cloudinary";

export const getUsersForSideBar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await UserModel.find({_id: {$ne:loggedInUserId}})

        res.status(200).json(filteredUser)
    } catch (e) {
        console.error
    }
}

export const getMessages = async (req,res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const messages = await MessageModel.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (e) {
        console.error
        console.log(e)
    }
}

export const sendMessages = async (req,res) => {
    try {
        const {text , image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new MessageModel({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save();

        const receiverSocketId = getRecevierSocketId(receiverId)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage" , newMessage);
        }

        res.status(201).json(newMessage)
    } catch (e) {
        console.log(e)
        console.error
    }
}