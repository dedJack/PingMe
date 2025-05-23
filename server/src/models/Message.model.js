import mongoose from 'mongoose';
import User from './User.model.js';

const MessageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    }
});

const Message = mongoose.model("Message",MessageSchema);
export default Message;