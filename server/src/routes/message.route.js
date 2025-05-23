import express from 'express';
import { getUserForSidebar, getAllMessages, sendMessage } from '../controllers/message.controller.js';
import { protectedRoute } from '../middlewares/protectRoute.middleware.js';

const router = express.Router();

router.get('/getAllUser',protectedRoute,getUserForSidebar);
router.get('/:id',protectedRoute, getAllMessages);
router.post('/sendMessage/:id',protectedRoute, sendMessage);

export default router;