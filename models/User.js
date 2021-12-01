const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Please provide an email.'],
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      minlength: [6, 'Password must be between 6 and 50 characters'],
      maxlength: [50, 'Password must be between 6 and 50 characters'],
      required: [true, 'A password is required']
    },
    ccOnFile: {
      type: Boolean,
      default: false,
      required: [true, '']
    },
    plan: {
      type: String,
      default: 'None',
      required: true,
    },
    planPrice: {
      type: String,
      default: "None",
      required: true,
    },
    accountStatus: {
      type: "String",
      default: "Trial",
      required: true,
    },
    signUpDate: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    }
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
