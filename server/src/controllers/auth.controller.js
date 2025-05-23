import { generateToken } from '../lib/utils.js';
import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
    // console.log(req.body);
    const { email, fullName, password } = req.body;
    try {
        if (!email || !fullName || !password) {
            return res.status(401).send({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).send({ message: "Password must be atleast of 6 characters" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPasswerd = await bcrypt.hash(password, salt);

        const newUser = new User({ fullName, email, password: hashedPasswerd });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                message: "User register successfully",
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).send({ message: "Invalid user data" });
        }
    } catch (e) {
        console.log("Error occurred in register controller ", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(401).send({ message: "All fields are required." });
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).send({ message: "Invalid credentials." });
        }
        const comparePass = await bcrypt.compare(password, userExist.password);

        if (comparePass) {
            res.status(200).json({
                message: "Login successfully",
                token: generateToken(userExist._id, res),
                _id: userExist._id,
                fullName: userExist.fullName,
                email: userExist.email,
                profilePic: userExist.profilePic
            })
        } else {
            return res.status(404).send({ message: "Invalid credentials." });
        }
    } catch (e) {
        console.log("Error occurred in login controller:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successfully" });
    } catch (e) {
        console.log("Error occurred in logout controller:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(401).json({message:"Profile pic is required."})
        }

        const uploadResponse =await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json(updatedUser);
    } catch (e) {
        console.log("Error occurred in update-profile controller:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}

export const getUser = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (e) {
        console.log("Error occurred in getUser controller:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}