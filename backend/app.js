import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToDb from './utils/connectToDb.js';
import campaignRoutes from './routes/campaign.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json());

app.use('/auth', authRoutes)
app.use('/api', campaignRoutes);
app.use('/api', feedbackRoutes);

app.listen(PORT, () => {
    connectToDb()
    console.log(`listening on ${PORT}`);
})