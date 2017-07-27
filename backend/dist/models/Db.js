'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _path2.default.resolve(__dirname, '../../db/Db.sqlite');

var Db = new _sequelize2.default('sqlite://' + db);

var User = Db.define('User', {
  Id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
  UserName: { type: _sequelize2.default.STRING, unique: true },
  Password: _sequelize2.default.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

var Person = Db.define('Person', {
  Id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
  Email: { type: _sequelize2.default.STRING, unique: true },
  FirstName: _sequelize2.default.STRING,
  LastName: _sequelize2.default.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

var Post = Db.define('Post', {
  PersonId: { type: _sequelize2.default.INTEGER, primaryKey: true, references: { model: Person, key: 'Id' } },
  Title: _sequelize2.default.STRING,
  Content: _sequelize2.default.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

Person.hasMany(Post);
Post.belongsTo(Person);

Db.authenticate().then(function () {
  console.log('Db conection success');
}).catch(function (Err) {
  console.log('Db conection failed');
});

exports.default = Db;