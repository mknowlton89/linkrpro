const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const CampaignMediumSchema = new mongoose.Schema(
  {
    campaignMedium: {
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

  export default mongoose.models.CampaignMedium || mongoose.model('CampaignMedium', CampaignMediumSchema)
