import Path from 'path';
import Sequelize from 'sequelize';

const models = Path.join(__dirname);
const DbPath = Path.resolve(`${models}/Db.sqlite`);

const Db = new Sequelize(`sqlite://${DbPath}`);

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

Db.authenticate().then(() => {
  console.log('Db conection success');
}).catch(Err => {
  console.log('Db conection failed');
});

export default Db;
