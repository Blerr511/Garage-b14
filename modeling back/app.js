const http = require('http'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  dotenv = require('dotenv'),
  multer = require('multer'),
  os = require('os'),
  fs = require('fs'),
  mime = require('mime-types'),
  path = require('path'),
  unzip = require('unzipper'),
  mongoose = require('mongoose'),
  { debugLog, debugLogError } = require('./logger.js');
global.defaultConsole = console.log;

console.log = debugLog;
console.error = debugLogError;
console.info = debugLog;
try {
  dotenv.config();
  global.appRoot =
    process.argv[2] === 'development'
      ? process.env._DOMAIN
      : process.env.DOMAIN;
  global.appDir = '/';
  global._appDirname = __dirname;
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const fpath = './uploads/' + req.reqId;

      if (!fs.existsSync(fpath)) fs.mkdirSync(fpath);

      cb(null, path.join(fpath));
    },

    onFileUploadStart: function(file) {
      if (
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png' ||
        file.mimetype == 'video/mp4' ||
        file.mimetype == 'video/webm' ||
        file.mimetype == 'video/ogg' ||
        file.mimetype == 'application/octet-stream' ||
        file.mimetype == 'application/zip'
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

  global.debugLog = debugLog;
  global.debugLogError = debugLogError;

  const decodeJWT = require('./helpers/decodeJWT'),
    fidnUser = require('./helpers/findUser'),
    getPages = require('./helpers/pages/get'),
    getSinglePage = require('./helpers/pages/get').single,
    changePosition = require('./helpers/pages/get').changePosition,
    addPages = require('./helpers/addPage'),
    removePage = require('./helpers/addPage').removePage,
    editPage = require('./helpers/addPage').editPage,
    addContent = require('./helpers/contentHundlers').add,
    removeContent = require('./helpers/contentHundlers').remove,
    editContent = require('./helpers/contentHundlers').edit,
    getMainItem = require('./helpers/mainPage').get,
    addMainItem = require('./helpers/mainPage').add,
    editMainItem = require('./helpers/mainPage').edit,
    removeMainItem = require('./helpers/mainPage').remove,
    changeMainItemPosition = require('./helpers/mainPage')
      .changeMainItemPosition,
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

  // const server = http.Server(app);
  const corsOptions = {
    origin:
      process.argv[2] === 'development'
        ? 'http://localhost:3000'
        : ['https://garageb14.com', 'http://garageb14.com'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Content-Type',
      'Content-Length',
      'access-control-allow-credentials'
    ]
  };
  app.use(cors(corsOptions));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(function(req, res, next) {
    req.reqId = new mongoose.Types.ObjectId() + Date.now();
    next();
  });
  // app.options('*', cors(corsOptions));
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
  const getDirectories = src => {
    const resault = [];

    if (fs.statSync(src).isDirectory) {
      getDirectories(fs.readdirSync(src));
    } else {
      resault.concat[src];
    }
    return resault;
  };
  const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
      if (fs.statSync(dirPath + '/' + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    });

    return arrayOfFiles;
  };

  app.post('/api/addpage', upload.any(), addPages);
  app.get('/api/get', getPages);
  app.get('/api/getSingle', getSinglePage);
  app.post('/api/addContent', upload.any(), addContent);
  app.post('/api/removeContent', upload.none(), removeContent);
  app.post('/api/removePage', upload.none(), removePage);
  app.post('/api/editPage', upload.single('bg'), editPage);
  app.post('/api/editContent', upload.any(), editContent);
  app.post('/api/changePosition', upload.none(), changePosition);

  app.get('/api/mainItems', getMainItem);
  app.post('/api/mainItems/add', upload.any(), addMainItem);
  app.post('/api/mainItems/rm', upload.none(), removeMainItem);
  app.post('/api/mainItems/edit', upload.any(), editMainItem);
  app.post('/api/mainItems/position', upload.none(), changeMainItemPosition);

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

  app.listen(process.env.APP_PORT || 8080, () =>
    console.info(`app listen ${process.env.APP_PORT || 8080}`,new Date())
  );
} catch (error) {
  debugLog(error);
}
