const http = require('http'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  dotenv = require('dotenv'),
  multer = require('multer'),
  os = require('os');
dotenv.config();
global.appRoot = process.env.DOMAIN;
global.appDir = __dirname;
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  onFileUploadStart: function(file) {
    if (
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'video/mp4' ||
      file.mimetype == 'video/webm' ||
      file.mimetype == 'video/ogg'
    ) {
      return true;
    } else {
      return false;
    }
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.originalname.split('.')[0] +
        Date.now() +
        '.' +
        file.originalname.split('.')[1]
    );
  }
});

const decodeJWT = require('./helpers/decodeJWT'),
  fidnUser = require('./helpers/findUser'),
  getPages = require('./helpers/pages/get'),
  getSinglePage = require('./helpers/pages/get').single,
  addPages = require('./helpers/addPage'),
  removePage = require('./helpers/addPage').removePage,
  editPage = require('./helpers/addPage').editPage,
  addContent = require('./helpers/contentHundlers').add,
  removeContent = require('./helpers/contentHundlers').remove,
  getMainItem = require('./helpers/mainPage').get,
  addMainItem = require('./helpers/mainPage').add,
  removeMainItem = require('./helpers/mainPage').remove,
  addSoclink = require('./helpers/soclinks').add,
  editSoclink = require('./helpers/soclinks').edit,
  removeSoclink = require('./helpers/soclinks').remove,
  getSoclinks = require('./helpers/soclinks').get,
  addContactInfo = require('./helpers/contactInfo').add,
  getContactInfo = require('./helpers/contactInfo').get,
  editContactInfo = require('./helpers/contactInfo').edit,
  removeContactInfo = require('./helpers/contactInfo').remove,
  getContactPage = require('./helpers/contactustext').get,
  editContactPage = require('./helpers/contactustext').edit,
  getMails = require('./helpers/mail').get,
  newMail = require('./helpers/mail').new,
  readMail = require('./helpers/mail').read,
  rmMail = require('./helpers/mail').delete;
const upload = multer({ storage: storage });

const app = express();

const server = http.Server(app);
const corsOptions = {
  origin: process.env.CLIENT,
  credentials: true,
  allowedHeaders: ['Content-Type', 'access-control-allow-credentials']
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.post(
  '/login',
  async (req, res, next) => {
    if (req.cookies.token && req.cookies.token !== '') {
      return next();
    } else {
      if (req.body.username && req.body.password) {
        const { username, password } = req.body;
        const response = await fidnUser(username, password);
        if (response.code === 200)
          res.cookie('token', response.token, {
            maxAge: req.body.remember ? 2 * 24 * 3600 * 1000 : 3600 * 1000,
            httpOnly: true
          });
        return res.status(response.code).send(response.data);
      } else {
        return res
          .status(400)
          .send({ code: 400, message: 'Enter username and password !' });
      }
    }
  },
  decodeJWT
);

app.post('/logout', (req, res) => {
  res.clearCookie('token').send({ status: 'success' });
});

// app.post('/api/aboutus', upload.single('bg'), setAboutus);
// app.get('/api/aboutus', getAboutus);

// app.post('/api/services', upload.single('bg'), setServices);
// app.get('/api/services', getServices);
// app.put('/api/services', upload.single('img'), addServices);
// app.delete('/api/services', upload.none(), removeServices);
// app.patch('/api/services', upload.single('img'), editServices);

// app.get('/api/portfolio', portfolio.get);
// app.post('/api/portfolio', upload.single('bg'), portfolio.set);
// app.put('/api/portfolio', upload.single('img'), portfolio.add);

app.post('/api/addpage', upload.any(), addPages);
app.get('/api/get', getPages);
app.get('/api/getSingle', getSinglePage);
app.post('/api/addContent', upload.single('file'), addContent);
app.post('/api/removeContent', upload.none(), removeContent);
app.post('/api/removePage', upload.none(), removePage);
app.post('/api/editPage', upload.single('bg'), editPage);

app.get('/api/mainItems', getMainItem);
app.post('/api/mainItems/add', upload.any(), addMainItem);
app.post('/api/mainItems/rm', upload.none(), removeMainItem);

app.get('/api/soclinks', getSoclinks);
app.post('/api/soclinks/add', upload.none(), addSoclink);
app.post('/api/soclinks/edit', upload.none(), editSoclink);
app.post('/api/soclinks/rm', upload.none(), removeSoclink);

app.get('/api/contactInfo', getContactInfo);
app.post('/api/contactInfo/add', upload.none(), addContactInfo);
app.post('/api/contactInfo/edit', upload.none(), editContactInfo);
app.post('/api/contactInfo/rm', upload.none(), removeContactInfo);

app.get('/api/contactPage', getContactPage);
app.post('/api/contactPage/edit', upload.none(), editContactPage);

app.get('/api/mails', getMails);
app.post('/api/mails/new', upload.none(), newMail);
app.post('/api/mails/read', upload.none(), readMail);
app.post('/api/mails/rm', upload.none(), rmMail);

server.listen(process.env.APP_PORT || 8080, () =>
  console.info(`app listen ${process.env.APP_PORT || 8080}`)
);
