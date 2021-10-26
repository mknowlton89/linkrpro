const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Must provide link to create a link.'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    }
  });

  export default mongoose.models.Link || mongoose.model('Link', LinkSchema)