const User = require('../mongoose/Schemas').User;
const Notification = require('../mongoose/Schemas').Notification;
const jwt = require('jsonwebtoken');
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
    const count = await User.countDocuments();
    console.log(count);
    if (count >= 1) return { code: 401, data: { message: 'User not found !' } };

    const user = new User({
      username: username,
      password: password,
      role: 'admin'
    });
    user.save(err => {
      if (!err) {
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
      }
    });

    return { code: 401, data: { message: 'User not found !' } };
  }
};
