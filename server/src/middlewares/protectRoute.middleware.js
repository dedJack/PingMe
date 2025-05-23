import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protectedRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized --No token found.' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401).json({ message: "Unauthorized --Invalid token." })
        }

        const user = await User.findById({ _id: decoded.userId }).select("-password");//getting Id of the user.

        if (!user) {
            return res.status(404).json({ message: 'User not found.' })
        }
        req.user = user
        next();
    } catch (e) {
        console.log("Error occurred in protect middleware:", e.message);
        return res.status(500).send({ message: "Internal server error" });
    }
}