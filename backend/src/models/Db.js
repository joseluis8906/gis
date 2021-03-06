import Path from 'path';
import Sequelize from 'sequelize';

//var db = Path.resolve(__dirname, '../../db/Db.sqlite');
//const Db = new Sequelize(`sqlite://${db}`);

const Db = new Sequelize('unixjs03', 'unixjs', 'K3J9 8LMN 02F3 B3LW', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const User = Db.define('User', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  UserName: {type: Sequelize.STRING, unique: true},
  Password: Sequelize.STRING,
  Active: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

const Group = Db.define('Group', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Name: {type: Sequelize.STRING, unique: true}
},
{
  timestamps: false,
  freezeTableName: true
});

const UserGroup = Db.define('UserGroup', {
  //Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  UserId: {type: Sequelize.INTEGER, references: {model: User, key: 'Id'}},
  GroupId: {type: Sequelize.INTEGER, references: {model: Group, key: 'Id'}}
},
{
  timestamps: false,
  freezeTableName: true
});

User.belongsToMany(Group, {through: 'UserGroup'});
Group.belongsToMany(User, {through: 'UserGroup'});


//############# gis ################

//Ente
const Ente = Db.define('Ente', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  TipoDocumento: Sequelize.STRING,
  NumeroDocumento: Sequelize.STRING,
  Nombre: Sequelize.STRING,
  Ciudad: Sequelize.STRING,
  Direccion: Sequelize.STRING,
  Telefono: Sequelize.STRING,
  Relacion: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//Producto
const Producto = Db.define('Producto', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Nombre: Sequelize.STRING,
  UnidadDeMedida: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});


//Envase
const Envase = Db.define('Envase', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Estado: Sequelize.STRING,
  EnteId: {type: Sequelize.INTEGER, references: {model: Ente, key: 'Id'}},
  Material: Sequelize.STRING,
  ProductoId: {type: Sequelize.INTEGER, references: {model: Producto, key: 'Id'}},
  Capacidad: Sequelize.DECIMAL,
  Numero: {type: Sequelize.STRING, unique:true},
  NumeroInterno: Sequelize.STRING,
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
  Observaciones: Sequelize.STRING,
  Disponible: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Envase);
Envase.belongsTo(Ente);

Producto.hasMany(Envase);
Envase.belongsTo(Producto);


//produccion
const Produccion = Db.define('Produccion', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Orden: Sequelize.STRING,
  Turno: Sequelize.STRING,
  Fecha: Sequelize.DATEONLY,
  Lote: Sequelize.STRING,
  FechaInicial: Sequelize.DATEONLY,
  FechaFinal: Sequelize.DATEONLY,
  HoraInicial: Sequelize.TIME,
  HoraFinal: Sequelize.TIME,
  FechaFabricacion: Sequelize.DATEONLY,
  FechaVencimiento: Sequelize.DATEONLY,
  Cantidad: Sequelize.DECIMAL,
  ProductoId: {type: Sequelize.INTEGER, references: {model: Producto, key: "Id"}},
  EnvaseId: {type: Sequelize.INTEGER, references: {model: Envase, key: "Id"}},
  PurezaFinal: Sequelize.DECIMAL,
  PresionFinal: Sequelize.DECIMAL,
  Observacion: Sequelize.TEXT,
  Despachado: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

Envase.hasMany(Produccion);
Produccion.belongsTo(Envase);

Producto.hasMany(Produccion);
Produccion.belongsTo(Producto);


//recprodcom
const Recprodcom = Db.define('Recprodcom', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Numero: Sequelize.STRING,
  Fecha: Sequelize.DATEONLY,
  Lote: Sequelize.STRING,
  FechaFabricacion: Sequelize.DATEONLY,
  FechaVencimiento: Sequelize.DATEONLY,
  Cantidad: Sequelize.DECIMAL,
  EnteId: {type: Sequelize.INTEGER, references: {model: Ente, key: "Id"}},
  ProductoId: {type: Sequelize.INTEGER, references: {model: Producto, key: "Id"}},
  EnvaseId: {type: Sequelize.INTEGER, references: {model: Envase, key: "Id"}},
  PurezaFinal: Sequelize.DECIMAL,
  PresionFinal: Sequelize.DECIMAL,
  Certificado: Sequelize.TEXT,
  RegistroSanitario: Sequelize.TEXT,
  Otros: Sequelize.TEXT,
  Observacion: Sequelize.TEXT,
  Despachado: Sequelize.STRING
},
{
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Recprodcom);
Recprodcom.belongsTo(Ente);

Envase.hasMany(Recprodcom);
Recprodcom.belongsTo(Envase);

Producto.hasMany(Recprodcom);
Recprodcom.belongsTo(Producto);


//remision
const Remision = Db.define('Remision', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Numero: Sequelize.STRING,
  Fecha: Sequelize.DATEONLY,
  EnteId: {type: Sequelize.INTEGER, references: {model: Ente, key: "Id"}},
  ProduccionId: {type: Sequelize.INTEGER, references: {model: Produccion, key: "Id"}},
  RecprodcomId: {type: Sequelize.INTEGER, references: {model: Recprodcom, key: "Id"}},
  EnvaseEntraId: {type: Sequelize.INTEGER, references: {model: Envase, key: "Id"}},
  EnvaseSaleId: {type: Sequelize.INTEGER, references: {model: Envase, key: "Id"}},
  Total: Sequelize.DECIMAL,
  Tipo: Sequelize.STRING,
  VendedorId: {type: Sequelize.INTEGER, references: {model: Ente, key: "Id"}}
},
{
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Remision, {foreignKey: 'EnteId'})
Remision.belongsTo(Ente, {foreignKey: 'EnteId'})

Produccion.hasMany(Remision)
Remision.belongsTo(Produccion)

Recprodcom.hasMany(Remision)
Remision.belongsTo(Recprodcom)

Envase.hasOne(Remision, {foreignKey: 'EnvaseEntraId'});
Remision.belongsTo(Envase, {as: 'EnvaseEntra',  foreignKey: 'EnvaseEntraId'});

Envase.hasOne(Remision, {foreignKey: 'EnvaseSaleId'});
Remision.belongsTo(Envase, {as: 'EnvaseSale', foreignKey: 'EnvaseSaleId'});

Ente.hasMany(Remision, {foreignKey: 'VendedorId'})
Remision.belongsTo(Ente, {foreignKey: 'VendedorId', as: 'Vendedor'})


//kardex
const Kardex = Db.define('Kardex', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Cantidad: Sequelize.DECIMAL,
  ProductoId: {type: Sequelize.INTEGER, references: {model: Producto, key: 'Id'}},
  EnvaseId: {type: Sequelize.INTEGER, references: {model: Envase, key: "Id"}},
  FechaElaboracion: Sequelize.DATEONLY,
  Lote: Sequelize.STRING,
  FechaVencimiento: Sequelize.DATEONLY,
  EnteId: {type: Sequelize.INTEGER, references: {model: Ente, key: "Id"}},
  FechaSale: Sequelize.DATEONLY,
  NumeroFacturaSale: Sequelize.TEXT,
  FechaEntra: Sequelize.DATEONLY,
  NumeroFacturaEntra: Sequelize.TEXT,
  Tipo: Sequelize.TEXT
},
{
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Kardex)
Kardex.belongsTo(Ente)

Producto.hasMany(Kardex)
Kardex.belongsTo(Producto)

Envase.hasMany(Kardex)
Kardex.belongsTo(Envase)

const Correria = Db.define('Correria', {
  Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  Numero: Sequelize.STRING,
  Fecha: Sequelize.DATEONLY,
  EnteId: {type: Sequelize.INTEGER, references: {model: Ente, key: "Id"}},
  ProduccionId: {type: Sequelize.INTEGER, references: {model: Produccion, key: "Id"}},
  RecprodcomId: {type: Sequelize.INTEGER, references: {model: Recprodcom, key: "Id"}},
},
{
  timestamps: false,
  freezeTableName: true
});

Ente.hasMany(Correria)
Correria.belongsTo(Ente)

Produccion.hasOne(Correria)
Correria.belongsTo(Produccion)

Recprodcom.hasOne(Correria)
Correria.belongsTo(Recprodcom)


//open connection
Db.authenticate().then(() => {
  console.log('Db conection success');
  //Db.query("PRAGMA foreign_keys=ON").spread( (Result, Metadata) => {
  //  Db.query("PRAGMA foreign_keys").spread( (Result, Metadata) => {
  //    console.log(Result);
  //  });
  //});
}).catch(Err => {
  console.log('Db conection failed');
});


export default Db;
