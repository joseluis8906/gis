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


var Producto = new GraphQLObjectType({
  name: "Producto",
  description: "Object representation of Producto",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Producto) {
          return Producto.Id;
        }
      },
      Nombre: {
        type: GraphQLString,
        resolve(Producto) {
          return Producto.Nombre;
        }
      },
      UnidadDeMedida: {
        type: GraphQLString,
        resolve(Producto) {
          return Producto.UnidadDeMedida;
        }
      }
    }
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
      Ciudad: {
        type: GraphQLString,
        resolve(Ente) {
          return Ente.Ciudad;
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
      ProductoId: {
        type: GraphQLInt,
        resolve(Envase) {
          return Envase.ProductoId;
        }
      },
      Capacidad: {
        type: GraphQLFloat,
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
      },
      Producto: {
        type: Producto,
        resolve(Envase) {
          return Envase.getProducto();
        }
      }
    }
  }
});


//produccion
var Produccion = new GraphQLObjectType({
  name: "Produccion",
  description: "Object representation of Produccion",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Produccion) {
          return Produccion.Id;
        }
      },
      Orden: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.Orden;
        }
      },
      Turno: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.Turno;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.Fecha;
        }
      },
      Lote: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.Lote;
        }
      },
      FechaInicial: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.FechaInicial;
        }
      },
      FechaFinal: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.FechaFinal;
        }
      },
      HoraInicial: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.HoraInicial;
        }
      },
      HoraFinal: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.HoraFinal;
        }
      },
      FechaFabricacion: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.FechaFabricacion;
        }
      },
      FechaVencimiento: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.FechaVencimiento;
        }
      },
      Cantidad: {
        type: GraphQLFloat,
        resolve(Produccion) {
          return Produccion.Cantidad;
        }
      },
      ProductoId: {
        type: GraphQLInt,
        resolve(Produccion) {
          return Produccion.ProductoId;
        }
      },
      EnvaseId: {
        type: GraphQLInt,
        resolve(Produccion) {
          return Produccion.EnvaseId;
        }
      },
      ClienteId: {
        type: GraphQLInt,
        resolve(Produccion) {
          return Produccion.EnteId;
        }
      },
      PurezaFinal: {
        type: GraphQLFloat,
        resolve(Produccion) {
          return Produccion.PurezaFinal;
        }
      },
      PresionFinal: {
        type: GraphQLFloat,
        resolve(Produccion) {
          return Produccion.PresionFinal;
        }
      },
      Observacion: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.Observacion;
        }
      },
      Envase: {
        type: Envase,
        resolve(Produccion) {
          return Produccion.getEnvase();
        }
      },
      Producto: {
        type: Producto,
        resolve(Produccion) {
          return Produccion.getProducto();
        }
      },
      Cliente: {
        type: Ente,
        resolve(Produccion) {
          return Produccion.getEnte();
        }
      }
    }
  }
});


//remision
var Remision = new GraphQLObjectType({
  name: "Remision",
  description: "Object representation of Remision",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.Id;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Remision) {
          return Remision.Numero;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Remision) {
          return Remision.Fecha;
        }
      },
      EnteId: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.EnteId;
        }
      },
      ProduccionId: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.ProduccionId;
        }
      },
      EnvaseId: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.EnvaseId;
        }
      },
      Total: {
        type: GraphQLFloat,
        resolve(Remision) {
          return Remision.Total;
        }
      },
      Ente: {
        type: Ente,
        resolve(Remision) {
          return Remision.getEnte();
        }
      },
      Produccion: {
        type: Produccion,
        resolve(Remision) {
          return Remision.getProduccion();
        }
      },
      Envase: {
        type: Envase,
        resolve(Remision) {
          return Remision.getEnvase();
        }
      }
    }
  }
})


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
          Ciudad: {type: GraphQLString},
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
          Ciudad: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          Telefono: {type: GraphQLString},
          Relacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Ente.findOne({where: args});
        }
      },
      Productos: {
        type: new GraphQLList(Producto),
        args: {
          Id: {type: GraphQLInt},
          Nombre: {type: GraphQLString},
          UnidadDeMedida: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Producto.findAll({where: args});
        }
      },
      OneProducto: {
        type: Producto,
        args: {
          Id: {type: GraphQLInt},
          Nombre: {type: GraphQLString},
          UnidadDeMedida: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Producto.findOne({where: args});
        }
      },
      Envases: {
        type: new GraphQLList(Envase),
        args: {
          Id: {type: GraphQLInt},
          Estado: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          Material: {type: GraphQLString},
          ProductoId: {type: GraphQLInt},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
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
          ProductoId: {type: GraphQLInt},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
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
      },
      Produccions: {
        type: new GraphQLList(Produccion),
        args: {
          Id: {type: GraphQLInt},
          Orden: {type: GraphQLString},
          Turno: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          Lote: {type: GraphQLString},
          FechaInicial: {type: GraphQLString},
          FechaFinal: {type: GraphQLString},
          HoraInicial: {type: GraphQLString},
          HoraFinal: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          Cantidad: {type: GraphQLFloat},
          EnvaseId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          EnteId: {type: GraphQLInt},
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Produccion.findAll({where: args},);
        }
      },
      ProduccionsByClient: {
        type: new GraphQLList(Produccion),
        args: {
          Fecha: {type: GraphQLString},
          FechaInicial: {type: GraphQLString},
          FechaFinal: {type: GraphQLString},
          HoraInicial: {type: GraphQLString},
          HoraFinal: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          Cantidad: {type: GraphQLFloat},
          EnvaseId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          ClienteId: {type: GraphQLInt},
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Produccion.findAll({where: args},);
        }
      },
      OneProduccion: {
        type: Produccion,
        args: {
          Id: {type: GraphQLInt},
          Orden: {type: GraphQLString},
          Turno: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          Lote: {type: GraphQLString},
          FechaInicial: {type: GraphQLString},
          FechaFinal: {type: GraphQLString},
          HoraInicial: {type: GraphQLString},
          HoraFinal: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          Cantidad: {type: GraphQLFloat},
          EnvaseId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          ClienteId: {type: GraphQLInt},
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Produccion.findOne({where: args});
        }
      },
      Remisions: {
        type: new GraphQLList(Remision),
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          ProduccionId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          Total: {type: GraphQLFloat}
        },
        resolve(root, args) {
          return Db.models.Remision.findAll({where: args})
        }
      },
      OneRemision: {
        type: Remision,
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          ProduccionId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          Total: {type: GraphQLFloat}
        },
        resolve(root, args) {
          return Db.models.Remision.findOne({where: args})
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
          Ciudad: {type: GraphQLString},
          Direccion: {type: GraphQLString},
          Telefono: {type: GraphQLString},
          Relacion: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Ente.create({
            TipoDocumento: args.TipoDocumento,
            NumeroDocumento: args.NumeroDocumento,
            Nombre: args.Nombre,
            Ciudad: args.Ciudad,
            Direccion: args.Direccion,
            Telefono: args.Telefono,
            Relacion: args.Relacion
          }).then( R => {
            return R;
          });
        }
      },
      UpdateEnte: {
        type: Ente,
        args: {
          TipoDocumento: {type: GraphQLString},
          NumeroDocumento: {type: GraphQLString},
          Nombre: {type: GraphQLString},
          Ciudad: {type: GraphQLString},
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
            R.Ciudad = args.Ciudad,
            R.Direccion = args.Direccion;
            R.Telefono = args.Telefono;
            R.Relacion = args.Relacion;

            R.save();

            return R;
          });
        }
      },
      CreateProducto: {
        type: Producto,
        args: {
          Nombre: {type: GraphQLString},
          UnidadDeMedida: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Producto.create({
            Nombre: args.Nombre,
            UnidadDeMedida: args.UnidadDeMedida
          }).then( R => {
            return R;
          });
        }
      },
      UpdateProducto: {
        type: Producto,
        args: {
          Nombre: {type: GraphQLString},
          UnidadDeMedida: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Producto.findOne({where: {
              Nombre: args.Nombre
          }}).then( R => {
            R.UnidadDeMedida = args.UnidadDeMedida;
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
          ProductoId: {type: GraphQLInt},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
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
            ProductoId: args.ProductoId,
            Capacidad: args.Capacidad,
            Numero: args.Numero,
            NumeroInterno: args.NumeroInterno,
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
          }).then( R => {
            R.Propietario = R.getEnte();
            R.Producto = R.getProducto();
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
          ProductoId: {type: GraphQLInt},
          Capacidad: {type: GraphQLFloat},
          Numero: {type: GraphQLString},
          NumeroInterno: {type: GraphQLString},
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
                Numero: args.Numero
              }
            }).then( R => {
              R.Estado = args.Estado;
              R.EnteId = args.EnteId;
              R.Material = args.Material;
              R.ProductoId = args.ProductoId;
              R.Capacidad = args.Capacidad;
              R.NumeroInterno = args.NumeroInterno;
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
              R.Producto = R.getProducto();
              
              return R;
          });
        }
      },
      CreateProduccion: {
        type: Produccion,
        args: {
          Id: {type: GraphQLInt},
          Orden: {type: GraphQLString},
          Turno: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          Lote: {type: GraphQLString},
          FechaInicial: {type: GraphQLString},
          FechaFinal: {type: GraphQLString},
          HoraInicial: {type: GraphQLString},
          HoraFinal: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          Cantidad: {type: GraphQLFloat},
          EnvaseId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          ClienteId: {type: GraphQLInt},
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Produccion.create({
            Orden: args.Orden,
            Turno: args.Turno,
            Fecha: args.Fecha,
            Lote: args.Lote,
            FechaInicial: args.FechaInicial,
            FechaFinal: args.FechaFinal,
            HoraInicial: args.HoraInicial,
            HoraFinal: args.HoraFinal,
            FechaFabricacion: args.FechaFabricacion,
            FechaVencimiento: args.FechaVencimiento,
            Cantidad: args.Cantidad,
            ProductoId: args.ProductoId,
            EnvaseId: args.EnvaseId,
            EnteId: args.ClienteId,
            PurezaFinal: args.PurezaFinal,
            PresionFinal: args.PresionFinal,
            Observacion: args.Observacion
          }).then( R => {
          
            return R;
            
          });
        }
      },
      UpdateOneProduccion: {
        type: Produccion,
        args: {
          Id: {type: GraphQLInt},
          Orden: {type: GraphQLString},
          Cantidad: {type: GraphQLFloat},
          EnvaseId: {type: GraphQLInt},
          ClienteId: {type: GraphQLInt}
        },
        resolve(_, args) {
          return Db.models.Produccion.findOne({ 
            where: {
              Id: args.Id
            }
          }).then( R => {
            R.Cantidad = args.Cantidad;
            R.EnvaseId = args.EnvaseId;
            R.EnteId = args.ClienteId;
            R.save();
            return R;
          });
        }
      },
      UpdateProduccions: {
        type: Produccion,
        args: {
          Id: {type: GraphQLInt},
          Orden: {type: GraphQLString},
          Turno: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          Lote: {type: GraphQLString},
          FechaInicial: {type: GraphQLString},
          FechaFinal: {type: GraphQLString},
          HoraInicial: {type: GraphQLString},
          HoraFinal: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Produccion.update({ 
            Turno: args.Turno,
            Fecha: args.Fecha,
            Lote: args.Lote,
            FechaInicial: args.FechaInicial,
            FechaFinal: args.FechaFinal,
            HoraInicial: args.HoraInicial,
            HoraFinal: args.HoraFinal,
            FechaFabricacion: args.FechaFabricacion,
            FechaVencimiento: args.FechaVencimiento,
            PurezaFinal: args.PurezaFinal,
            PresionFinal: args.PresionFinal,
            Observacion: args.Observacion
          },{
            where: {
              Orden: args.Orden
            }
          });
        }
      },
      DeleteProduccion: {
        type: Produccion,
        args: {
          Id: {type: GraphQLInt}
        },
        resolve(_, args) {
          return Db.models.Produccion.findOne({
            where : {
              Id: args.Id
            }
          }).then( R => {
            return R.destroy();
          });
        }
      },
      CreateRemision: {
        type: Remision,
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          ProduccionId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          Total: {type: GraphQLFloat}
        },
        resolve(_, args) {
          return Db.models.Remision.create({
            Numero: args.Numero,
            Fecha: args.Fecha,
            EnteId: args.EnteId,
            ProduccionId: args.ProduccionId,
            EnvaseId: args.EnvaseId,
            Total: args.Total
          }).then( R => {
            return R;
            
          });
        }
      },
      UpdateRemision: {
        type: Remision,
        args: {
          Id: {type: GraphQLInt},
          EnteId: {type: GraphQLInt},
          ProduccionId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          Total: {type: GraphQLFloat}
        },
        resolve(_, args) {
          return Db.models.Remision.findOne({
            where: {
              Id: args.Id
            }
          }).then( R => {
            
            R.EnteId = args.EnteId;
            R.ProduccionId = args.ProduccionId;
            R.EnvaseId = args.EnvaseId;
            R.Total = args.Total;
            R.save();
            return R;
            
          });
        }
      },
      DeleteRemision: {
        type: Remision,
        args: {
          Id: {type: GraphQLInt}
        },
        resolve(_, args) {
          return Db.models.Remision.findOne({
            where: {
              Id: args.Id
            }
          }).then( R => {
            return R.destroy();
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

