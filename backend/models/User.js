const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        buildingNumber: String,
        streetName: String,
        city: String,
        zipcode: String,
        phoneNumber: Number,
      },
    ],
    role: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
  {
    toObjects: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
