import express from 'express';
import { signup, login, logout, updateProfile, getUser } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/protectRoute.middleware.js';
// import router from 'express'

const router = express.Router();

//Routes 1: Signup
router.post('/register', signup);

//Routes 2: Login
router.post('/login', login);

//Routes 3: Logout
router.post('/logout', logout);

//Routes 3: updateProfile
router.put('/update-profile', protectedRoute, updateProfile);

//Routes 3: getUser
router.get('/getUser', protectedRoute, getUser);

export default router;