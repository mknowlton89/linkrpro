const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const CampaignSourceSchema = new mongoose.Schema(
  {
    campaignSource: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Please provide an email.'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    }
  });

  export default mongoose.models.CampaignSource || mongoose.model('CampaignSource', CampaignSourceSchema)
