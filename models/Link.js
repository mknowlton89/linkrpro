const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Must provide link to create a link.'],
    },
    user: {
      type: String,
      trim: true,
      required: [true, 'User is required']
    },
    createdOn: {
      type: Date,
      required: [true, 'A date is required']
    },
  });

  export default mongoose.models.Link || mongoose.model('Link', LinkSchema)
