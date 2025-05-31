import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import MessageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import { httpServer, app } from './lib/socket.js';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/message', MessageRoutes);


// show dist file when the app is in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname,"../client","dist","index.html"));
    })
}

httpServer.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
    connectDB();
})