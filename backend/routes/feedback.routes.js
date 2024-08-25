import express from 'express';
import { addFeedback, getAllFeedbacks, deleteFeedback } from '../controllers/feedback.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Add new feedback
router.post('/feedback', addFeedback);

// Get all feedbacks
router.get('/feedbacks', getAllFeedbacks);

// Delete a feedback (for admin)
router.delete('/feedbacks/:id', protectRoute, deleteFeedback);

export default router;
