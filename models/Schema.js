import { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

import Db from './Db.js';

var Person = new GraphQLObjectType({
  name: "Person",
  description: "Object representation of Person",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Person) {
          return Person.Id;
        }
      },
      Email: {
        type: GraphQLString,
        resolve(Person) {
          return Person.Email;
        }
      },
      FirstName: {
        type: GraphQLString,
        resolve(Person) {
          return Person.FirstName;
        }
      },
      LastName: {
        type: GraphQLString,
        resolve(Person) {
          return Person.LastName;
        }
      }
    };
  }
});


var Post = new GraphQLObjectType({
  name: "Post",
  description: "Object representation of Post",
  fields: () => {
    return {
      PersonId: {
        type: GraphQLInt,
        resolve(Post) {
          return Post.PersonId;
        }
      },
      Title: {
        type: GraphQLString,
        resolve(Post) {
          return Post.Title;
        }
      },
      Content: {
        type: GraphQLString,
        resolve(Post) {
          return Post.Content;
        }
      }
    };
  }
});


var Query = new GraphQLObjectType({
  name: "Query",
  description: "Object representation of Query",
  fields: () => {
    return {
      People: {
        type: new GraphQLList(Person),
        args: {
          Id: {type: GraphQLInt},
          Email: {type: GraphQLString},
          FirstName: {type: GraphQLString},
          LastName: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Person.findAll({where: args});
        }
      },
      Posts: {
        type: new GraphQLList(Post),
        args: {
          PersonId: {type: GraphQLInt},
          Title: {type: GraphQLString},
          Content: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Post.findAll({where: args});
        }
      }
    };
  }
});

var Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Function to create stuf",
  fields: () => {
    return {
      AddPerson: {
        type: Person,
        args: {
          Email: {type: GraphQLInt},
          FirstName: {type: GraphQLString},
          LastName: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Person.create({
            Email: args.Email,
            FirstName: args.FirstName,
            LastName: args.LastName
          });
        }
      }
    };
  }
});

var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;

