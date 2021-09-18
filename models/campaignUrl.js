const mongoose = require("mongoose");

const campaignUrlSchema = new mongoose.Schema(
    {
        campaignUrl: {
            type: String,
            trim: true,
            required: true,
            // unique: true,
        },
        user: {
            type: Object,
            required: true,
        }
    });

// mongoose.models = {};

// const CampaignUrl = mongoose.model("CampaignUrl", campaignUrlSchema);

// module.exports = CampaignUrl;

export default mongoose.models.campaignUrlSchema || mongoose.model('CampaignUrl', campaignUrlSchema)