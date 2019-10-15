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

const page = new Schema({
  title: { type: String, required: true, default: 'title' },
  desc: { type: String, required: false },
  type: { type: String, required: true },
  bg: {
    type: String,
    required: true,
    default: __dirname + '/static/placeholder.jpg'
  },
  content: { type: mongoose.SchemaTypes.Mixed, required: false, default: null }
});
const Page = new mongoose.model('Page', page);

const serviceSchema = new Schema({
  title: { type: String, required: true, default: 'title' },
  desc: { type: String },
  img: { type: String }
});

const Service = new mongoose.model('Service', serviceSchema);

const portfolioSchema = new Schema({
  title: String,
  author: String,
  tags: [String],
  img: String,
  other: String
});
const Portfolio = new mongoose.model('Portfolio', portfolioSchema);

const teamSchema = new Schema({
  title: { type: String, required: true, default: 'title' },
  desc: { type: String },
  img: { type: String }
});

const Team = new mongoose.model('Team', teamSchema);

module.exports.Team = Team;
module.exports.Portfolio = Portfolio;
module.exports.Service = Service;
module.exports.Page = Page;
module.exports.User = User;
module.exports.Notification = Notification;
