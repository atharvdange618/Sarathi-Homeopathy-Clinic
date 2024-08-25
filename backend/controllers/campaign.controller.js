import Campaign from '../model/campaign.model.js';

// Add a new campaign
export const addCampaign = async (req, res) => {
    try {
        const { title, description, image, startDate, endDate } = req.body;

        const newCampaign = new Campaign({
            title,
            description,
            image,
            startDate,
            endDate,
        });

        await newCampaign.save();
        res.status(201).json({ message: "Campaign added successfully", campaign: newCampaign });
    } catch (error) {
        console.error("Error adding campaign", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all campaigns
export const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        console.error("Error fetching campaigns", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a campaign
export const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedCampaign = await Campaign.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCampaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }

        res.status(200).json({ message: "Campaign updated successfully", campaign: updatedCampaign });
    } catch (error) {
        console.error("Error updating campaign", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a campaign
export const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCampaign = await Campaign.findByIdAndDelete(id);

        if (!deletedCampaign) {
            return res.status(404).json({ error: "Campaign not found" });
        }

        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
        console.error("Error deleting campaign", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
