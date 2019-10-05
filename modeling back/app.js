const http = require('http'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  jwt = require('jsonwebtoken');

const decodeJWT = require('./helpers/decodeJWT');
const fidnUser = require('./helpers/findUser');

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
server.listen(8080, () => console.log('app listen to 8080'));
