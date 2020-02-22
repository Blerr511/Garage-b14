const mongoose = require('./connect');
const Schema = mongoose.Schema;
const {debugLog,debugLogError} = require("../logger.js");
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
  content: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Service', count: true }
  ],
  position: { type: Number, unique: true }
});
page.pre('validate', async function() {
  const items = await Page.find({});
  if(!items || items.length === 0)
   {
     this.position = 0;
   }
   else{
    const sorted = items.sort((a,b)=>a.position-b.position);
    const lastPosition = sorted[sorted.length - 1].position + 1;
    this.position = lastPosition;
   }
});
page.virtual('contentCount').get(async function() {
  const res = await Page.findById(this._id);
  return res.content.length;
});
const Page = new mongoose.model('Page', page);

const serviceSchema = new Schema({
  title: { type: String, required: false, default: 'title' },
  desc: { type: String },
  img: { type: String },
  other: { type: mongoose.SchemaTypes.Mixed }
});

const Service = new mongoose.model('Service', serviceSchema);

const mainItemSchema = new Schema({
  desc: String,
  bg: { type: String, required: true },
  logo: String,
  bgType: String,
  route:String,
  goTo: String,
  position: { type: Number , unique:true }
});
mainItemSchema.pre('validate', async function() {
  const items = await MainItem.find({});
  if(!items || items.length === 0)
   {
     this.position = 0;
   }
   else{
    const sorted = items.sort((a,b)=>a.position-b.position);
    const lastPosition = sorted[sorted.length - 1].position + 1;
    this.position = lastPosition;
   }

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

module.exports.Service = Service;
module.exports.Page = Page;
module.exports.User = User;
module.exports.MainItem = MainItem;
module.exports.Soclink = Soclink;
module.exports.ContactInfo = ContactInfo;
module.exports.ContactPageText = ContactPageText;
module.exports.Mail = Mail;
