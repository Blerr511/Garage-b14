const User = require('../mongoose/Schemas').User;
const Notification = require('../mongoose/Schemas').Notification;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const CONFIG = require('../config.json');

module.exports = async (username, password) => {
  const user = await User.findOne({ username: username });

  if (user) {
    if (user.password === password) {
      const token = jwt.sign(
        {
          username: user.username,
          role: user.role,
          _id: user._id
        },
        CONFIG.JWTsecret
      );
      return {
        code: 200,
        data: {
          username: user.username,
          role: user.role,
          _id: user._id
        },
        token: token
      };
    } else {
      return { code: 401, data: { message: 'Incorrect password !' } };
    }
  } else {
    return { code: 401, data: { message: 'User not found !' } };
  }
};
