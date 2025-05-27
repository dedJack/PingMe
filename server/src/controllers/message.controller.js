import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
import mongoose from 'mongoose';
import cloudinary from "../lib/cloudinary.js"; // Assuming this path is correct

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const showAllUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password"); //show all users except loggedIn user
    if (!showAllUser) {
      return res.status(400).json({ message: "No other users found." });
    }

    return res.status(200).json(showAllUser);
  } catch (e) {
    console.error("Error occurred in getUserForSidebar controller:", e.message);
    return res.status(500).send({ message: "Internal server error" });
  }
}

export const getAllMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    //convert Id to ObjectId as mongoDb ask for ObjectId instead of string
    const senderObjectId = new mongoose.Types.ObjectId(myId);
    const receiverObjectId = new mongoose.Types.ObjectId(userToChatId);

    // Find messages where:
    // 1. senderId is current user AND receiverId is userToChatId
    // OR
    // 2. senderId is userToChatId AND receiverId is current user
    // The key change here is using 'senderId' and 'receiverId' to match your schema.
    const showMessages = await Message.find({
      $or: [
        {
          senderId: senderObjectId,
          receiverId: receiverObjectId,
        },
        {
          senderId: receiverObjectId,
          receiverId: senderObjectId,
        },
      ],
    })

    return res.status(200).json(showMessages);
  } catch (e) {
    console.error("Error occurred in getAllMessages controller:", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!receiverId) {
      return res.status(404).json({ message: "Receiver not specified." });
    }

    if (!text && !image) {
      return res.status(400).json({ message: "Message content (text or image) cannot be empty." });
    }

    let imageUrl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: "You cannot send a message to yourself." });
    }

    // Create a new message instance
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();

    // TODO: Implement real-time functionality here using Socket.io
    // For example, emit the new message to the relevant users via a socket.

    return res.status(201).json(newMessage);
  } catch (e) {
    console.error("Error occurred in sendMessage controller:", e.message);
    return res.status(500).send({ message: "Internal server error" });
  }
}
