import { GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLFloat,
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
      },
      Envases: {
        type: new GraphQLList(Envase),
        resolve(Ente) {
          return Ente.getEnvases();
        }
      }
    };
  }
});


//envase
var Envase = new GraphQLObjectType({
  name: "Envase",
  description: "Object representation of Envase",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Envase) {
          return Envase.Id;
        }
      },
      Estado: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Estado;
        }
      },
      EnteId: {
        type: GraphQLInt,
        resolve(Envase) {
          return Envase.EnteId;
        }
      },
      Material: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Material;
        }
      },
      Capacidad: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Capacidad;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Numero;
        }
      },
      NumeroInterno: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.NumeroInterno;
        }
      },
      ClaseProducto: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.ClaseProducto;
        }
      },
      Presion: {
        type: GraphQLFloat,
        resolve(Envase) {
          return Envase.Presion;
        }
      },
      AlturaConValvula: {
        type: GraphQLFloat,
        resolve(Envase) {
          return Envase.AlturaConValvula;
        }
      },
      PesoConValvula: {
        type: GraphQLFloat,
        resolve(Envase) {
          return Envase.PesoConValvula;
        }
      },
      Valvula: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Valvula;
        }
      },
      TipoValvula: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.TipoValvula;
        }
      },
      AcabadoColor: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.AcabadoColor;
        }
      },
      NormaTecnicaFabricacion: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.NormaTecnicaFabricacion;
        }
      },
      Proveedor: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Proveedor;
        }
      },
      FechaCompra: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.FechaCompra;
        }
      },
      Garantia: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Garantia;
        }
      },
      FechaFabricacion: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.FechaFabricacion;
        }
      },
      PruebaHidrostatica: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.PruebaHidrostatica;
        }
      },
      EquipoAlquilado: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.EquipoAlquilado;
        }
      },
      FechaAlquiler: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.FechaAlquiler;
        }
      },
      Observaciones: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Observaciones;
        }
      },
      Propietario: {
        type: Ente,
        resolve(Envase) {
          return Envase.getEnte();
        }
      }
    }
  }
});


//Query
var Query = new GraphQLObjectType({
  name: "Query",
  description: "Object representation of Query",
  fields: () => {
    return {
      Hello: {
        type: GraphQLString,
        args: {},
        resolve(root, args) {
          return "world";
        }
      },
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
      },
      EntesByNombre: {
        type: new GraphQLList(Ente),
        args: {
          Nombre: {type: GraphQLString},
        },
        resolve(root, args) {
          return Db.models.Ente.findAll({
            where: {
              Nombre: {$like: ("%"+args.Nombre+"%")}
            }
          });
        }
      },      
      OneEnte: {
        type: Ente,
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
          return Db.models.Ente.findOne({where: args});
        }
      },
      Envases: {
        type: new GraphQLList(Envase),
        args: {
          Id: {type: GraphQLInt},
          Estado: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          Material: {type: GraphQLString},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
          ClaseProducto: {type: GraphQLString},
          Presion: {type: GraphQLFloat},
          AlturaConValvula: {type: GraphQLFloat},
          PesoConValvula: {type: GraphQLFloat},
          Valvula: {type: GraphQLString},
          TipoValvula: {type: GraphQLString},
          AcabadoColor: {type: GraphQLString},
          NormaTecnicaFabricacion: {type: GraphQLString},
          Proveedor: {type: GraphQLString},
          FechaCompra: {type: GraphQLString},
          Garantia: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          PruebaHidrostatica: {type: GraphQLString},
          EquipoAlquilado: {type: GraphQLString},
          FechaAlquiler: {type: GraphQLString},
          Observaciones: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Envase.findAll({where: args});
        }
      },
      OneEnvase: {
        type: Envase,
        args: {
          Id: {type: GraphQLInt},
          Estado: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          Material: {type: GraphQLString},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
          ClaseProducto: {type: GraphQLString},
          Presion: {type: GraphQLFloat},
          AlturaConValvula: {type: GraphQLFloat},
          PesoConValvula: {type: GraphQLFloat},
          Valvula: {type: GraphQLString},
          TipoValvula: {type: GraphQLString},
          AcabadoColor: {type: GraphQLString},
          NormaTecnicaFabricacion: {type: GraphQLString},
          Proveedor: {type: GraphQLString},
          FechaCompra: {type: GraphQLString},
          Garantia: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          PruebaHidrostatica: {type: GraphQLString},
          EquipoAlquilado: {type: GraphQLString},
          FechaAlquiler: {type: GraphQLString},
          Observaciones: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Envase.findOne({where: args}).then(R => {
            return R;
          });
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
      CreateEnte: {
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
          return Db.models.Ente.findOne({where: {
              TipoDocumento: args.TipoDocumento,
              NumeroDocumento: args.NumeroDocumento
          }}).then( R => {
            R.TipoDocumento = args.TipoDocumento;
            R.NumeroDocumento = args.NumeroDocumento;
            R.Nombre = args.Nombre;
            R.Direccion = args.Direccion;
            R.Telefono = args.Telefono;
            R.Relacion = args.Relacion;

            R.save();

            return R;
          });
        }
      },
      CreateEnvase: {
        type: Envase,
        args: {
          Estado: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          Material: {type: GraphQLString},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
          ClaseProducto: {type: GraphQLString},
          Presion: {type: GraphQLFloat},
          AlturaConValvula: {type: GraphQLFloat},
          PesoConValvula: {type: GraphQLFloat},
          Valvula: {type: GraphQLString},
          TipoValvula: {type: GraphQLString},
          AcabadoColor: {type: GraphQLString},
          NormaTecnicaFabricacion: {type: GraphQLString},
          Proveedor: {type: GraphQLString},
          FechaCompra: {type: GraphQLString},
          Garantia: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          PruebaHidrostatica: {type: GraphQLString},
          EquipoAlquilado: {type: GraphQLString},
          FechaAlquiler: {type: GraphQLString},
          Observaciones: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Envase.create({
            Estado: args.Estado,
            EnteId: args.EnteId,
            Material: args.Material,
            Capacidad: args.Capacidad,
            Numero: args.Numero,
            NumeroInterno: args.NumeroInterno,
            ClaseProducto: args.ClaseProducto,
            Presion: args.Presion,
            AlturaConValvula: args.AlturaConValvula,
            PesoConValvula: args.PesoConValvula,
            Valvula: args.Valvula,
            TipoValvula: args.TipoValvula,
            AcabadoColor: args.AcabadoColor,
            NormaTecnicaFabricacion: args.NormaTecnicaFabricacion,
            Proveedor: args.Proveedor,
            FechaCompra: args.FechaCompra,
            Garantia: args.Garantia,
            FechaFabricacion: args.FechaFabricacion,
            PruebaHidrostatica: args.PruebaHidrostatica,
            EquipoAlquilado: args.EquipoAlquilado,
            FechaAlquiler: args.FechaAlquiler,
            Observaciones: args.Observaciones
          }).then(R => {
            R.Propietario = R.getEnte();
            return R;
          });
        }
      },
      UpdateEnvase: {
        type: Envase,
        args: {
          Estado: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          Material: {type: GraphQLString},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
          ClaseProducto: {type: GraphQLString},
          Presion: {type: GraphQLFloat},
          AlturaConValvula: {type: GraphQLFloat},
          PesoConValvula: {type: GraphQLFloat},
          Valvula: {type: GraphQLString},
          TipoValvula: {type: GraphQLString},
          AcabadoColor: {type: GraphQLString},
          NormaTecnicaFabricacion: {type: GraphQLString},
          Proveedor: {type: GraphQLString},
          FechaCompra: {type: GraphQLString},
          Garantia: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          PruebaHidrostatica: {type: GraphQLString},
          EquipoAlquilado: {type: GraphQLString},
          FechaAlquiler: {type: GraphQLString},
          Observaciones: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Envase.findOne({where: {
                NumeroInterno: args.NumeroInterno
              }
            }).then(R => {
              R.Estado = args.Estado;
              R.EnteId = args.EnteId;
              R.Material = args.Material;
              R.Capacidad = args.Capacidad;
              R.Numero = args.Numero;
              R.ClaseProducto = args.ClaseProducto;
              R.Presion = args.Presion;
              R.AlturaConValvula = args.AlturaConValvula;
              R.PesoConValvula = args.PesoConValvula;
              R.Valvula = args.Valvula;
              R.TipoValvula = args.TipoValvula;
              R.AcabadoColor = args.AcabadoColor;
              R.NormaTecnicaFabricacion = args.NormaTecnicaFabricacion;
              R.Proveedor = args.Proveedor;
              R.FechaCompra = args.FechaCompra;
              R.Garantia = args.Garantia;
              R.FechaFabricacion = args.FechaFabricacion;
              R.PruebaHidrostatica = args.PruebaHidrostatica;
              R.EquipoAlquilado = args.EquipoAlquilado;
              R.FechaAlquiler = args.FechaAlquiler;
              R.Observaciones = args.Observaciones;
              
              R.save();
              
              R.Propietario = R.getEnte();
              
              return R;
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

