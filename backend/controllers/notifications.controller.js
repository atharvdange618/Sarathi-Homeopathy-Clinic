import Notification from '../model/notification.model.js';

// Fetch all unread notifications
export const getUnreadNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching unread notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Clear all notifications
export const clearAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({});
        res.status(200).json({ message: 'All notifications cleared' });
    } catch (error) {
        console.error('Error clearing notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany({}, { $set: { read: true } });
        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get unread notification count
export const getUnreadNotificationCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({ read: false });
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting unread notification count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};