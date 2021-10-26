const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const CampaignNameSchema = new mongoose.Schema(
  {
    campaignName: {
      type: String,
      trim: true,
      lowercase: true,
      // unique: true,
      required: [true, 'Please provide an email.'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    }
  });

  export default mongoose.models.CampaignName || mongoose.model('CampaignName', CampaignNameSchema)