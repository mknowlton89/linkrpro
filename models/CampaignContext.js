const mongoose = require("mongoose");

const CampaignContextSchema = new mongoose.Schema(
  {
    campaignContext: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'CampaignContext is required'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    }
  });

  export default mongoose.models.CampaignContext || mongoose.model('CampaignContext', CampaignContextSchema)
