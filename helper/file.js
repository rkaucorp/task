const File = require("../models");
const User = require("../models/user");
const createError = require("./errorHandler");
const fs = require("fs");

const storeFileInformationToDB = async payload => {
  try {
    const file = new File({ ...payload });
    await file.save();
    return true;
  } catch (error) {
    createError(500, "Failed to store file information");
  }
};

const getFileByKey = async (key, dbField) => {
  try {
    return dbField === "privateKey"
      ? await File.findOne({ privateKey: key })
      : await File.findOne({ publicKey: key });
  } catch (error) {
    createError(404, "File Not Found");
  }
};

const removeFile = file => {
  try {
    fs.unlinkSync(`./uploads/${file}`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const removeFileRecord = async file => {
  try {
    await File.deleteOne({ _id: file?._id });
    removeFile(file?.fileName);
  } catch (error) {
    createError(404, "File Not Found");
  }
};

const updateCoin = async ip => {
  try {
    await User.updateOne({ ip }, { $inc: { coin: -1 } });
    return true;
  } catch (error) {
    createError(500, "Failed to update");
  }
};
module.exports = {
  storeFileInformationToDB,
  getFileByKey,
  removeFile,
  removeFileRecord,
  updateCoin,
};
