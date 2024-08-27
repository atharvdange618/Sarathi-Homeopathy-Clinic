import cron from 'node-cron';
import Visitor from '../model/visitor.model.js';

// Get daily visitor count
export const getDailyVisitors = async (req, res) => {
    try {
        const startOfDay = new Date().setHours(0, 0, 0, 0);
        const endOfDay = new Date().setHours(23, 59, 59, 999);

        const count = await Visitor.countDocuments({
            timestamp: { $gte: startOfDay, $lte: endOfDay }
        });

        res.json({ count });
    } catch (error) {
        console.error('Error getting daily visitors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get monthly visitor data
export const getMonthlyVisitors = async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);

        const visitors = await Visitor.aggregate([
            {
                $match: {
                    timestamp: { $gte: startOfMonth, $lte: endOfMonth }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$timestamp" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(visitors);
    } catch (error) {
        console.error('Error getting monthly visitors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to reset the daily visitor count
const resetDailyVisitorCount = async () => {
    try {
        const startOfDay = new Date().setHours(0, 0, 0, 0);
        await Visitor.deleteMany({
            timestamp: { $lt: startOfDay }
        });
        console.log('Daily visitor count reset successfully');
    } catch (error) {
        console.error('Error resetting daily visitor count:', error);
    }
};

// Schedule the job to run at 00:00 (midnight) every day
cron.schedule('0 0 * * *', () => {
    console.log('Running daily visitor count reset');
    resetDailyVisitorCount();
});