const mongoose = require('mongoose');

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  err => {
    if (err) console.error(err);
    else {
      console.info('succesfull connected to db');
    }
  }
);

module.exports = mongoose;
