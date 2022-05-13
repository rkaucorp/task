const { countObjectLength } = require("../helper/utils");
const User = require("../models/user");

const countRequest = async (req, res, next) => {
  try {
    const response = await User.findOne({
      $and: [{ ip: req.connection.remoteAddress }, { coin: { $gt: 0 } }],
    });
    if (countObjectLength(response) > 0) next();
  } catch (error) {
    res.send(500);
  }
};

module.exports = countRequest;
