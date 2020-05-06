const jwt = require('jsonwebtoken');
const CONFIG = require('../config.json');
module.exports = async (req, res) => {
  const token = req.cookies.token;
  const data = jwt.verify(token, CONFIG.JWTsecret);
  res.status(200).send(data);
};
