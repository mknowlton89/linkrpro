const mongoose = require("mongoose");

const CampaignTermSchema = new mongoose.Schema(
  {
    campaignTerm: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'CampaignTerm is required'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    }
  });

  export default mongoose.models.CampaignTerm || mongoose.model('CampaignTerm', CampaignTermSchema)
