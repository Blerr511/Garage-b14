const mongoose = require('mongoose');
const { debugLog, debugLogError } = require('../logger.js');
try {
  mongoose.connect(
    process.argv[2] === 'development'
      ? process.env._DB_CONNECTION_STRING
      : process.env.DB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    err => {
      if (err) throw err;
      else {
        console.info('succesfull connected to db');
      }
    }
  );
} catch (error) {
  console.error(error);

  debugLogError(error);
}

module.exports = mongoose;
