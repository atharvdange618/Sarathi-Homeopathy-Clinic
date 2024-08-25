import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import connectToDb from './utils/connectToDb.js';
import campaignRoutes from './routes/campaign.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express();

// Setup CORS
app.use(cors({
    origin: process.env.CORS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
}));

app.use(express.json());

app.use('/auth', authRoutes)
app.use('/api', campaignRoutes);
app.use('/api', feedbackRoutes);

app.listen(PORT, () => {
    connectToDb()
    console.log(`listening on ${PORT}`);
})