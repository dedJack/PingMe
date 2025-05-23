import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
import mongoose, { Mongoose } from "mongoose";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const showAllUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        if (!showAllUser) {
            return res.status(400).json({ message: "No user loggedIn." })
        }
        return res.status(200).json(showAllUser);
    } catch (e) {
        console.log("Error occurred in getUserForSidebar controller:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}


export const getAllMessages = async (req, res) => {
    try {
        
        const userToChatId = new mongoose.Types.ObjectId(req.params.id); // convert to ObjectId
        // const {id:userToChatId} = req.params;
        const myId = req.user._id;

        // console.log(userToChatId)
        // console.log(myId)
        const showMessages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        });

        res.status(200).json(showMessages);

    } catch (e) {
        console.log("Error occurred in getAllMessages controller:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;


        if (!receiverId) {
            return res.status(404).json({ message: "Receiver not specified." })
        }
        //Atleast one field messages to be present.
        if (!text && !image) {
            return res.status(404).json({ message: "Text field is empty" })
        }
        let imageUrl;
        if (image) {
            {
                //Upload base64 image to cloudinary.
                const uploadImage = await cloudinary.uploader.upload(image);
                imageUrl = uploadImage.secure_url
            }
        }
        //sender cannot send message to itself.
        if(senderId.toString() === receiverId.toString()){
            return res.status(404).json({ message: "You cannot send message to yourself" })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMessage.save();
        //todo : Real time functionality goes here ==> socket.io

        return res.status(201).json({ message: "Message send successfully", newMessage: newMessage });
    } catch (e) {
        console.log("Error occurred in getAllMessages controller:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}