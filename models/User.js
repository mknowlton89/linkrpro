const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

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
      lowercase: true,
      unique: true,
      required: [true, 'Please provide an email.'],
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // businessName: {
    //   type: String,
    //   unique: true,
    //   trim: true
    // },
    password: {
      type: String,
      minlength: [6, 'Password must be between 6 and 50 characters'],
      maxlength: [50, 'Password must be between 6 and 50 characters'],
      required: [true, 'A password is required']
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

  UserSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function (hashError, hash) {
            if (hashError) {
              return next(hashError)
            }

            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  });

  UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }

  export default mongoose.models.User || mongoose.model('User', UserSchema)
