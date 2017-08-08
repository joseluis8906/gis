import { GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLList, 
  GraphQLSchema } from 'graphql';
  
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
      },
      Posts: {
        type: new GraphQLList(Post),
        resolve(Person) {
          return Person.getPosts();
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


var Ente = new GraphQLObjectType({
  name: "Ente",
  description: "Object representation of Ente",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Ente) {
          return Ente.Id;
        }
      },
      TipoDocumento: {
        type: GraphQLString,
        resolve(Ente) {
          return Ente.TipoDocumento;
        }
      },
      NumeroDocumento: {
        type: GraphQLString,
        resolve(Ente) {
          return Ente.NumeroDocumento;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(Ente) {
          return Ente.Nombre;
        }
      },
      Direccion: {
        type: GraphQLString,
        resolve(Ente) {
          return Ente.Direccion;
        }
      },
      Telefono: {
        type: GraphQLString,
        resolve(Ente) {
          return Ente.Telefono;
        }
      },
      Relacion: {
        type: GraphQLString,
        resolve(Ente) {
          return Ente.Relacion;
        }
      }
    };
  }
});


//Query
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
      },
      Entes: {
        type: new GraphQLList(Ente),
        args: {
          Id: {type: GraphQLInt},
          TipoDocumento: {type: GraphQLString},
          NumeroDocumento: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          Telefono: {type: GraphQLString},
          Relacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Ente.findAll({where: args});
        }
      }
    };
  }
});


//mutation
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
      },
      AddEnte: {
        type: Ente,
        args: {
          TipoDocumento: {type: GraphQLString},
          NumeroDocumento: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          Telefono: {type: GraphQLString},
          Relacion: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Ente.create({
            TipoDocumento: args.TipoDocumento,
            NumeroDocumento: args.NumeroDocumento,
            Nombre: args.Nombre,
            Direccion: args.Direccion,
            Telefono: args.Telefono,
            Relacion: args.Relacion
          });
        }
      },
      UpdateEnte: {
        type: Ente,
        args: {
          TipoDocumento: {type: GraphQLString},
          NumeroDocumento: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          Telefono: {type: GraphQLString},
          Relacion: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Ente.update({
            Nombre: args.Nombre,
            Direccion: args.Direccion,
            Telefono: args.Telefono,
            Relacion: args.Relacion
          },
          { where: {
              TipoDocumento: args.TipoDocumento,
              NumeroDocumento: args.NumeroDocumento
            }
          });
        }
      }
    };
  }
});


//schema
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;

