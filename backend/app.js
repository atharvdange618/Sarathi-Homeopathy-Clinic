import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes.js';
import connectToDb from './utils/connectToDb.js';
import trackVisitor from './middleware/trackVisitor.js';
import campaignRoutes from './routes/campaign.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import visitorAnalyticsRoutes from './routes/visitor.routes.js';
import notificationRoutes from './routes/notifications.routes.js';

// Load environment variables from.env file
dotenv.config();

const PORT = process.env.PORT || 3000

const app = express();

const allowedOrigins = process.env.CORS.split(',');
// Setup CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
}));

app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies

// Middleware to track visitors
app.use(trackVisitor);

// Routes
app.use('/auth', authRoutes)
app.use('/api', campaignRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', notificationRoutes);
app.use('/api/analytics', visitorAnalyticsRoutes);


// Start the server
app.listen(PORT, () => {
    connectToDb()
    console.log(`listening on ${PORT}`);
})