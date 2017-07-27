'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Db = require('./Db.js');

var _Db2 = _interopRequireDefault(_Db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = new _graphql.GraphQLObjectType({
  name: "Person",
  description: "Object representation of Person",
  fields: function fields() {
    return {
      Id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Person) {
          return Person.Id;
        }
      },
      Email: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Person) {
          return Person.Email;
        }
      },
      FirstName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Person) {
          return Person.FirstName;
        }
      },
      LastName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Person) {
          return Person.LastName;
        }
      }
    };
  }
});

var Post = new _graphql.GraphQLObjectType({
  name: "Post",
  description: "Object representation of Post",
  fields: function fields() {
    return {
      PersonId: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(Post) {
          return Post.PersonId;
        }
      },
      Title: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Post) {
          return Post.Title;
        }
      },
      Content: {
        type: _graphql.GraphQLString,
        resolve: function resolve(Post) {
          return Post.Content;
        }
      }
    };
  }
});

var Query = new _graphql.GraphQLObjectType({
  name: "Query",
  description: "Object representation of Query",
  fields: function fields() {
    return {
      People: {
        type: new _graphql.GraphQLList(Person),
        args: {
          Id: { type: _graphql.GraphQLInt },
          Email: { type: _graphql.GraphQLString },
          FirstName: { type: _graphql.GraphQLString },
          LastName: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Person.findAll({ where: args });
        }
      },
      Posts: {
        type: new _graphql.GraphQLList(Post),
        args: {
          PersonId: { type: _graphql.GraphQLInt },
          Title: { type: _graphql.GraphQLString },
          Content: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(root, args) {
          return _Db2.default.models.Post.findAll({ where: args });
        }
      }
    };
  }
});

var Mutation = new _graphql.GraphQLObjectType({
  name: "Mutation",
  description: "Function to create stuf",
  fields: function fields() {
    return {
      AddPerson: {
        type: Person,
        args: {
          Email: { type: _graphql.GraphQLInt },
          FirstName: { type: _graphql.GraphQLString },
          LastName: { type: _graphql.GraphQLString }
        },
        resolve: function resolve(_, args) {
          return _Db2.default.models.Person.create({
            Email: args.Email,
            FirstName: args.FirstName,
            LastName: args.LastName
          });
        }
      }
    };
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

exports.default = Schema;