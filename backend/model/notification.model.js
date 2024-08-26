import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
    type: {
        type: String,
        enum: ['new_review', 'new_appointment'],
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    read: { type: Boolean, default: false },
    data: {
        type: Schema.Types.Mixed, // This can store any additional data related to the notification
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});

const Notification = model('Notification', notificationSchema);

export default Notification;