const mongoose = require("mongoose");

const CampaignUrlSchema = new mongoose.Schema(
  {
    campaignUrl: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Please provide a campaignUrl.'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    }
  });

  export default mongoose.models.CampaignUrl || mongoose.model('CampaignUrl', CampaignUrlSchema)
