'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _graphqlServerExpress = require('graphql-server-express');

var _Schema = require('./models/Schema');

var _Schema2 = _interopRequireDefault(_Schema);

var _Db = require('./models/Db');

var _Db2 = _interopRequireDefault(_Db);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
/*
var router = express.Router();

app.use('/private', router);

//var Upload = multer();

app.set('superSecret', 'K3J9 8LMN 02F3 B3LW');

router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'] ||
              req.params.token ||
              req.query ? req.query.token : null ||
              req.body ? req.body.token : null;
  // decode token
  if (token) {
    // verifies secret and checks exp
    Jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({ Result: false, Err: 'Falló el token de autenticación' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }else {
    // if there is no token
    // return an error
    return res.status(403).json({Result: 0, Err: 'No se encontró un token de autenticación válido'});
  }
});

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');


app.use('/static', express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
*/

app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: _Schema2.default }));
app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

/*
//generate password
app.get('/generatepassword/:Password', (req, res) => {
  Bcrypt.genSalt(10, (Err, Salt) => {
    Bcrypt.hash(req.params.Password, Salt, (Err, Hash) => {
      res.json({Password: Hash});
    });
  });
});

//login get
app.get('/login/:UserName/:Password', (req, res, next) => {
  var Data = (req.params);
  
  Db.models.User.findOne({where: {UserName: Data.UserName}}).then( R => {
    Bcrypt.compare(Data.Password, R.Password, (Err, Res) => {
      if(Res) {
        Jwt.sign({ User: Data.UserName },
          req.app.get('superSecret'),
          {expiresIn: "365d" /*expires in 365 dias},
          (Err, Token) => {
            if(!Err) {
              res.json({ Result: 1, Token: Token});
            }else{
              res.json({ Result: 0, Err: `Error generando token: ${Err}`});
            }
          });
      }else{
        res.json({ Result: 0, Err: "Password Erronea" });
      }
    });
    
  }).catch(Err => {
    res.json({ Result: 0, Err: `Error consultando ususario: ${Err}` });
  });
  
});

//login post
app.post('/login/', (req, res, next) => {
  var Data = (req.body);
  
  Db.models.User.findOne({where: {UserName: Data.UserName}}).then( R => {
    Bcrypt.compare(Data.Password, R.Password, (Err, Res) => {
      if(Res) {
        Jwt.sign({ User: Data.UserName },
          req.app.get('superSecret'),
          {expiresIn: "365d" /*expires in 365 dias},
          (Err, Token) => {
            if(!Err) {
              res.json({ Result: 1, Token: Token});
            }else{
              res.json({ Result: 0, Err: `Error generando token: ${Err}`});
            }
          });
      }else{
        res.json({ Result: 0, Err: "Password Erronea" });
      }
    });
    
  }).catch(Err => {
    res.json({ Result: 0, Err: `Error consultando ususario: ${Err}` });
  });
  
});

app.get('/', (req, res) => {
  res.render('index', {title: 'Express', message: 'Hello Express!'});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server erro");
});
*/

app.listen(3000, function () {
  console.log('Express runing at http://127.0.0.1:3000');
});