const { scryptSync, randomBytes } = require("crypto");
const variableConfiguration = require("../config");

const generateSecretHash = (hashSize = 64) => {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(8).toString(variableConfiguration.ENCRYPTION_TYPE);
    const buffer = scryptSync(
      variableConfiguration.SECRET_KEY_SALT,
      salt,
      hashSize
    );
    const finalClientID = `${buffer.toString(
      variableConfiguration.ENCRYPTION_TYPE
    )}.${salt}`;
    if (finalClientID) resolve(finalClientID);
    else reject(Error("Failed To Generate Key"));
  });
};

module.exports = { generateSecretHash };
