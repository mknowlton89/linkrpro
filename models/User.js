const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema(
  {
    // firstName: {
    //   type: String,
    //   trim: true,
    //   required: "firstName is required"
    // },
    // lastName: {
    //   type: String,
    //   trim: true,
    //   required: "lastName is required"
    // },
    email: {
      type: String,
      trim: true,
      // unique: true,
      // required: "email is required"
    },
    // businessName: {
    //   type: String,
    //   unique: true,
    //   trim: true
    // },
    password: {
      type: String,
    //   required: true
    }
    // openingTime: {
    //   type: String,
    //   default: '08:00'
    // },
    // closingTime: {
    //   type: String,
    //   default: '18:00'
    // },
    // appointmentInterval: {
    //   type: Number,
    //   default: 30
    // }
  });

  export default mongoose.models.User || mongoose.model('User', UserSchema)
