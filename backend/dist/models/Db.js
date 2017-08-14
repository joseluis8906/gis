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

//############# gis ################

//Ente
var Ente = Db.define('Ente', {
  Id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
  TipoDocumento: _sequelize2.default.STRING,
  NumeroDocumento: _sequelize2.default.STRING,
  Nombre: _sequelize2.default.STRING,
  Ciudad: _sequelize2.default.STRING,
  Direccion: _sequelize2.default.STRING,
  Telefono: _sequelize2.default.STRING,
  Relacion: _sequelize2.default.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

//Envase
var Envase = Db.define('Envase', {
  Id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
  Estado: _sequelize2.default.STRING,
  EnteId: { type: _sequelize2.default.INTEGER, references: { model: Ente, key: 'Id' } },
  Material: _sequelize2.default.STRING,
  Capacidad: _sequelize2.default.DECIMAL,
  Numero: { type: _sequelize2.default.STRING, unique: true },
  NumeroInterno: { type: _sequelize2.default.STRING, unique: true },
  ClaseProducto: _sequelize2.default.STRING,
  Presion: _sequelize2.default.DECIMAL,
  AlturaConValvula: _sequelize2.default.DECIMAL,
  PesoConValvula: _sequelize2.default.DECIMAL,
  Valvula: _sequelize2.default.STRING,
  TipoValvula: _sequelize2.default.STRING,
  AcabadoColor: _sequelize2.default.STRING,
  NormaTecnicaFabricacion: _sequelize2.default.STRING,
  Proveedor: _sequelize2.default.STRING,
  FechaCompra: _sequelize2.default.DATEONLY,
  Garantia: _sequelize2.default.DATEONLY,
  FechaFabricacion: _sequelize2.default.DATEONLY,
  PruebaHidrostatica: _sequelize2.default.DATEONLY,
  EquipoAlquilado: _sequelize2.default.STRING,
  FechaAlquiler: _sequelize2.default.DATEONLY,
  Observaciones: _sequelize2.default.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Envase);
Envase.belongsTo(Ente);

//produccion
var Produccion = Db.define('Produccion', {
  Id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
  Fecha: _sequelize2.default.DATEONLY,
  Lote: _sequelize2.default.STRING,
  FechaFabricacion: _sequelize2.default.DATEONLY,
  FechaVencimiento: _sequelize2.default.DATEONLY,
  Cantidad: _sequelize2.default.DECIMAL,
  Producto: _sequelize2.default.STRING,
  EnvaseId: { type: _sequelize2.default.INTEGER, references: { model: Envase, key: "Id" } },
  PurezaFinal: _sequelize2.default.DECIMAL,
  PresionFinal: _sequelize2.default.DECIMAL
}, {
  timestamps: false,
  freezeTableName: true
});

Envase.hasMany(Produccion);
Produccion.belongsTo(Envase);

//remision
var Remision = Db.define('Remision', {
  Id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true },
  Numero: _sequelize2.default.STRING,
  Fecha: _sequelize2.default.DATEONLY,
  EnteId: { type: _sequelize2.default.INTEGER, references: { model: Ente, key: "Id" } },
  Sale: _sequelize2.default.STRING,
  Entra: _sequelize2.default.STRING,
  ProduccionId: { type: _sequelize2.default.INTEGER, references: { model: Produccion, key: "Id" } },
  Total: _sequelize2.default.DECIMAL
}, {
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Remision);
Remision.belongsTo(Ente);

Produccion.hasMany(Remision);
Remision.belongsTo(Produccion);

//open connection
Db.authenticate().then(function () {
  console.log('Db conection success');
  Db.query("PRAGMA foreign_keys=ON").spread(function (Result, Metadata) {
    Db.query("PRAGMA foreign_keys").spread(function (Result, Metadata) {
      console.log(Result);
    });
  });
}).catch(function (Err) {
  console.log('Db conection failed');
});

exports.default = Db;