const mongoose = require("mongoose");
const variableConfiguration = require("../config");

class DB {
  static connect = async () => {
    try {
      await mongoose.connect(variableConfiguration.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      console.log("DB Connection Failed");
    }
  };
}

module.exports = DB;
