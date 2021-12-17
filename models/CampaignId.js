const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const CampaignIdSchema = new mongoose.Schema(
  {
    campaignId: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'CampaignID is required'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    }
  });

  export default mongoose.models.CampaignId || mongoose.model('CampaignId', CampaignIdSchema)
