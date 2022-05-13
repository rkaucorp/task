require("dotenv").config();

const APP_PORT = process.env.PORT;
const APP_ENV = process.env.APP_ENV;
const MONGODB_URL = process.env.MONGO_URL;
const ENCRYPTION_TYPE = "hex";
const HASH_RANDOM_SIZE = 32;
const ENCRYPTION_FORMAT = "base64";
const FOLDER = "../";
const SECRET_KEY_SALT = process.env.SALT;

module.exports = {
  APP_PORT,
  APP_ENV,
  MONGODB_URL,
  HASH_RANDOM_SIZE,
  ENCRYPTION_TYPE,
  ENCRYPTION_FORMAT,
  FOLDER,
  SECRET_KEY_SALT,
};
