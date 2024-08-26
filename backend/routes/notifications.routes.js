import express from 'express';
import {
    getUnreadNotifications,
    clearAllNotifications,
    markAllNotificationsAsRead,
    getUnreadNotificationCount
} from '../controllers/notifications.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Route to fetch all unread notifications
router.get('/notifications', protectRoute, getUnreadNotifications);

// Route to clear all notifications
router.delete('/notifications', protectRoute, clearAllNotifications);

// Route to mark all notifications as read
router.get('/notifications/mark-read', protectRoute, markAllNotificationsAsRead);

// Route to get unread notification count
router.get('/notifications/count', protectRoute, getUnreadNotificationCount);

export default router;