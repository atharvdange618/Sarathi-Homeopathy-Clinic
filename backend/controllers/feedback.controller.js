import Feedback from '../model/feedback.model.js';
import Notification from '../model/notification.model.js';

// Add new feedback
export const addFeedback = async (req, res) => {
    try {
        const { name, feedback, rating } = req.body;

        if (!name || !feedback || !rating) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newFeedback = new Feedback({
            name,
            feedback,
            rating,
        });

        await newFeedback.save();

        // Create a notification for the new feedback
        const notification = new Notification({
            type: 'new_review',
            message: `New review added by ${name}`,
            data: {
                reviewId: newFeedback._id,
                rating: rating,
            },
        });

        await notification.save();

        res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Error submitting feedback", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all feedbacks
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sort by most recent first
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedbacks", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a feedback by ID
export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedback.findByIdAndDelete(id);

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.error("Error deleting feedback", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};