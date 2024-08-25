import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Feedback', feedbackSchema);