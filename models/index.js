const { Schema, model } = require("mongoose");

const fileSchema = new Schema(
  {
    fileName: { type: String },
    privateKey: { type: String },
    publicKey: { type: String },
  },
  {
    timestamps: true,
  }
);

const File = model("File", fileSchema);

module.exports = File;
