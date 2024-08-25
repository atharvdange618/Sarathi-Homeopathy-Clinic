import express from 'express';
import { addCampaign, getAllCampaigns, updateCampaign, deleteCampaign } from '../controllers/campaign.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Add a new campaign
router.post('/campaigns', protectRoute, addCampaign);

// Get all campaigns
router.get('/campaigns', protectRoute, getAllCampaigns);

// Update a campaign
router.put('/campaigns/:id', protectRoute, updateCampaign);

// Delete a campaign
router.delete('/campaigns/:id', protectRoute, deleteCampaign);

export default router;