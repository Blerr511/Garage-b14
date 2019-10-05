const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/modeling',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) console.log(err);
    else {
      console.log('succesfull connected to db');
    }
  }
);

module.exports = mongoose;
