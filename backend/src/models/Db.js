import Path from 'path';
import Sequelize from 'sequelize';

var db = Path.resolve(__dirname, '../../db/Db.sqlite');

const Db = new Sequelize(`sqlite://${db}`);

const User = Db.define('User', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  UserName: {type: Sequelize.STRING, unique: true},
  Password: Sequelize.STRING,
},
{
  timestamps: false,
  freezeTableName: true
});

const Person = Db.define('Person', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Email: {type: Sequelize.STRING, unique: true},
  FirstName: Sequelize.STRING,
  LastName: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


const Post = Db.define('Post', {
  PersonId: {type: Sequelize.INTEGER, primaryKey: true, references: {model: Person, key: 'Id'}},
  Title: Sequelize.STRING,
  Content: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

Person.hasMany(Post);
Post.belongsTo(Person);


//############# gis ################

//Ente
const Ente = Db.define('Ente', {
  Id: {type: Sequelize.INTEGER, primaryKey: true},
  TipoDocumento: Sequelize.STRING,
  NumeroDocumento: Sequelize.STRING,
  Nombre: Sequelize.STRING,
  Direccion: Sequelize.STRING,
  Telefono: Sequelize.STRING,
  Relacion: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//Envase
const Envase = Db.define('Envase', {
  Id: {type: Sequelize.INTEGER, primaryKey: true},
  Estado: Sequelize.STRING,
  EnteId: {type: Sequelize.INTEGER, references: {model: Ente, key: 'Id'}},
  Material: Sequelize.STRING,
  Capacidad: Sequelize.DECIMAL,
  Numero: {type: Sequelize.STRING, unique:true},
  NumeroInterno: {type: Sequelize.STRING, unique: true},
  ClaseProducto: Sequelize.STRING,
  Presion: Sequelize.DECIMAL,
  AlturaConValvula: Sequelize.DECIMAL,
  PesoConValvula: Sequelize.DECIMAL,
  Valvula: Sequelize.STRING,
  TipoValvula: Sequelize.STRING,
  AcabadoColor: Sequelize.STRING,
  NormaTecnicaFabricacion: Sequelize.STRING,
  Proveedor: Sequelize.STRING,
  FechaCompra: Sequelize.DATEONLY,
  Garantia: Sequelize.DATEONLY,
  FechaFabricacion: Sequelize.DATEONLY,
  PruebaHidrostatica: Sequelize.DATEONLY,
  EquipoAlquilado: Sequelize.STRING,
  FechaAlquiler: Sequelize.DATEONLY,
  Observaciones: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Envase);
Envase.belongsTo(Ente);


//produccion
const Produccion = Db.define('Produccion', {
  Id: {type: Sequelize.INTEGER, primaryKey: true},
  Fecha: Sequelize.DATEONLY,
  Lote: Sequelize.STRING,
  FechaFabricacion: Sequelize.DATEONLY,
  FechaVencimiento: Sequelize.DATEONLY,
  Cantidad: Sequelize.DECIMAL,
  Producto: Sequelize.STRING,
  EnvaseId: {type: Sequelize.INTEGER, references: {model: Envase, key: "Id"}},
  PurezaFinal: Sequelize.DECIMAL,
  PresionFinal: Sequelize.DECIMAL
},
{
  timestamps: false,
  freezeTableName: true
});

Envase.hasMany(Produccion);
Produccion.belongsTo(Envase);


//remision
const Remision = Db.define('Remision', {
  Id: {type: Sequelize.INTEGER, primaryKey: true},
  Fecha: Sequelize.DATE,
  Numero: Sequelize.INTEGER,
  Sale: Sequelize.STRING,
  Entra: Sequelize.STRING,
  EnteId: {type: Sequelize.INTEGER, references: {model: Ente, key: "Id"}},
  EnvaseId: {type: Sequelize.INTEGER, references: {model: Envase, key: "Id"}}
},
{
  timestamps: false,
  freezeTableName: true
});


//open connection
Db.authenticate().then(() => {
  console.log('Db conection success');
  Db.query("PRAGMA foreign_keys=ON").spread( (Result, Metadata) => {
    Db.query("PRAGMA foreign_keys").spread( (Result, Metadata) => {
      console.log(Result);
    });
  });
}).catch(Err => {
  console.log('Db conection failed');
});


export default Db;
