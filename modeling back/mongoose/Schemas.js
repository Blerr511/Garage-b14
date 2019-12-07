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
  title: { type: String },
  style: {
    type: mongoose.SchemaTypes.Mixed
  },
  desc: { type: mongoose.SchemaTypes.Mixed, required: false },
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
  tags: [String],
  img: String
});
const Portfolio = new mongoose.model('Portfolio', portfolioSchema);

const teamSchema = new Schema({
  title: { type: String, required: true, default: 'title' },
  desc: { type: String },
  img: { type: String }
});

const Team = new mongoose.model('Team', teamSchema);

const mainItemSchema = new Schema({
  desc: String,
  bg: { type: String, required: true },
  logo: String,
  bgType: String
});
const MainItem = new mongoose.model('MainItem', mainItemSchema);

const soclinkSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const Soclink = new mongoose.model('Soclink', soclinkSchema);

const contactInfoSchema = new Schema({
  text: { type: String, required: true },
  address: { type: Boolean, default: false }
});

const contactPageTextSchema = new Schema({
  text: String
});
const ContactInfo = new mongoose.model('ContactInfo', contactInfoSchema);
const ContactPageText = new mongoose.model(
  'ContactPage',
  contactPageTextSchema
);

const mailSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: v => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
  },
  text: { type: String, required: true },
  readed: { type: Boolean, default: false },
  date: {
    type: Number,
    default: Date.now()
  },
  sender: { type: String, required: true }
});

const Mail = new mongoose.model('Mail', mailSchema);

module.exports.Team = Team;
module.exports.Portfolio = Portfolio;
module.exports.Service = Service;
module.exports.Page = Page;
module.exports.User = User;
module.exports.Notification = Notification;
module.exports.MainItem = MainItem;
module.exports.Soclink = Soclink;
module.exports.ContactInfo = ContactInfo;
module.exports.ContactPageText = ContactPageText;
module.exports.Mail = Mail;
