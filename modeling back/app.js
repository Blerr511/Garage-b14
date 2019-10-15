const http = require('http'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  dotenv = require('dotenv'),
  multer = require('multer'),
  path = require('path');
global.appRoot = path.resolve(__dirname);
dotenv.config();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  onFileUploadStart: function(file) {
    if (
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png'
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
  setAboutus = require('./helpers/pages/aboutus').set,
  getAboutus = require('./helpers/pages/aboutus').get,
  setServices = require('./helpers/pages/services').set,
  getServices = require('./helpers/pages/services').get,
  addServices = require('./helpers/pages/services').addService,
  removeServices = require('./helpers/pages/services').removeService,
  editServices = require('./helpers/pages/services').editService;
portfolio = require('./helpers/pages/portfolio');
const upload = multer({ storage: storage });
const CONFIG = require('./config.json');

const app = express();
const server = http.Server(app);
const corsOptions = {
  origin: CONFIG.client.hostname,
  credentials: true
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
    res.send('token');
  },
  decodeJWT
);

app.post('/logout', (req, res) => {
  res.clearCookie('token').send({ status: 'success' });
});

app.post('/api/aboutus', upload.single('bg'), setAboutus);
app.get('/api/aboutus', getAboutus);

app.post('/api/services', upload.single('bg'), setServices);
app.get('/api/services', getServices);
app.put('/api/services', upload.single('img'), addServices);
app.delete('/api/services', upload.none(), removeServices);
app.patch('/api/services', upload.single('img'), editServices);

app.get('/api/portfolio', portfolio.get);
app.post('/api/portfolio', upload.single('bg'), portfolio.set);
app.put('/api/portfolio', upload.single('img'), portfolio.add);
server.listen(process.env.PORT || 8080, () =>
  console.log(`app listen ${process.env.PORT || 8080}`)
);
