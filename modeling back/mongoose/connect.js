const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/modeling',
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
