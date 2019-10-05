const mongoose = require('./connect');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  title: String,
  description: String,
  date: { type: mongoose.SchemaTypes.Date, default: new Date() },
  active: { type: Boolean, default: true }
});
const Notification = new mongoose.model('Notification', NotificationSchema);

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  notifications: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Notification' }]
});

const User = new mongoose.model('User', UserSchema);
module.exports.User = User;
module.exports.Notification = Notification;
