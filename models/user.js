const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    ip: { type: String },
    coin: { type: Number },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
