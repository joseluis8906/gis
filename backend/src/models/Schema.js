import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema } from 'graphql';

import Db from './Db.js';

var User = new GraphQLObjectType({
  name: "User",
  description: "Object representation of User",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(User) {
          return User.Id;
        }
      },
      UserName: {
        type: GraphQLString,
        resolve(User) {
          return User.UserName;
        }
      },
      Password: {
        type: GraphQLString,
        resolve(User) {
          return User.Password;
        }
      },
      Active: {
        type: GraphQLString,
        resolve(User) {
          return User.Active;
        }
      },
      Groups: {
        type: new GraphQLList(Group),
        resolve(User) {
          return User.getGroups();
        }
      }
    };
  }
});


var Group = new GraphQLObjectType({
  name: "Group",
  description: "Object representation of Group",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Group) {
          return Group.Id;
        }
      },
      Name: {
        type: GraphQLString,
        resolve(Group) {
          return Group.Name;
        }
      },
      Users: {
        type: new GraphQLList(User),
        resolve(Group) {
          return Group.getUsers();
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
      Disponible: {
        type: GraphQLString,
        resolve(Envase) {
          return Envase.Disponible;
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
      Despachado: {
        type: GraphQLString,
        resolve(Produccion) {
          return Produccion.Despachado;
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


//Kardex
var Kardex = new GraphQLObjectType({
  name: "Kardex",
  description: "Object representation of Kardex",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Kardex) {
          return Kardex.Id;
        }
      },
      Cantidad: {
        type: GraphQLFloat,
        resolve(Kardex) {
          return Kardex.Cantidad;
        }
      },
      ProductoId: {
        type: GraphQLInt,
        resolve(Kardex) {
          return Kardex.ProductoId;
        }
      },
      EnvaseId: {
        type: GraphQLInt,
        resolve(Kardex) {
          return Kardex.EnvaseId;
        }
      },
      FechaElaboracion: {
        type: GraphQLString,
        resolve(Kardex) {
          return Kardex.FechaElaboracion;
        }
      },
      Lote: {
        type: GraphQLString,
        resolve(Kardex) {
          return Kardex.Lote;
        }
      },
      FechaVencimiento: {
        type: GraphQLString,
        resolve(Kardex) {
          return Kardex.FechaVencimiento;
        }
      },
      EnteId: {
        type: GraphQLInt,
        resolve(Kardex) {
          return Kardex.EnteId;
        }
      },
      FechaSale: {
        type: GraphQLString,
        resolve(Kardex) {
          return Kardex.FechaSale;
        }
      },
      NumeroFacturaSale: {
        type: GraphQLString,
        resolve(Kardex) {
          return Kardex.NumeroFacturaSale;
        }
      },
      FechaEntra: {
        type: GraphQLString,
        resolve(Kardex) {
          return Kardex.FechaEntra;
        }
      },
      NumeroFacturaEntra: {
        type: GraphQLString,
        resolve(Kardex) {
          return Kardex.NumeroFacturaEntra;
        }
      },
      Producto: {
        type: Producto,
        resolve(Kardex) {
          return Kardex.getProducto();
        }
      },
      Envase: {
        type: Envase,
        resolve(Kardex) {
          return Kardex.getEnvase();
        }
      },
      Ente: {
        type: Ente,
        resolve(Kardex) {
          return Kardex.getEnte();
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
      Users: {
        type: new GraphQLList(User),
        args: {
          Id: {type: GraphQLInt},
          UserName: {type: GraphQLString},
          Password: {type: GraphQLString},
          Active: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.User.findAll({where: args});
        }
      },
      Groups: {
        type: new GraphQLList(Group),
        args: {
          Id: {type: GraphQLInt},
          Name: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Group.findAll({where: args});
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
          Relacion: {type: GraphQLString},
          NombreDocumento: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Ente.findAll({
            where: {
              $or: [
                {
                  NumeroDocumento: {$like: ("%"+args.NombreDocumento+"%")}
                },
                {
                  Nombre: {$like: ("%"+args.NombreDocumento+"%")}
                }
              ]
            },
            order: [['Nombre', 'ASC']]
          });
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
            },
            order: [['Nombre', 'ASC']]
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
          return Db.models.Ente.findOne({ where: args, order: [['Nombre', 'ASC']] });
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
          return Db.models.Producto.findAll({ where: args, order: [['Nombre', 'ASC']] });
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
          return Db.models.Producto.findOne({ where: args, order: [['Nombre', 'ASC']] });
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
          Observaciones: {type: GraphQLString},
          Disponible: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Envase.findAll({
            where: {
              Numero: {$like: ("%"+args.Numero+"%")},
              Disponible: 'Si'
            },
            order: [['Numero', 'DESC']]
          });
        }
      },
      EnvasesByProducto: {
        type: new GraphQLList(Envase),
        args: {
          Numero: {type: GraphQLString},
          NombreProducto: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Envase.findAll({
            where: {
              Numero: {$like: ("%"+args.Numero+"%")},
              Disponible: 'Si'
            },
            order: [['Numero', 'DESC']],
            include: [
              {
                model: Db.models.Producto,
                where: {Nombre: args.NombreProducto}
              }
            ]
          });
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
          Observaciones: {type: GraphQLString},
          Disponible: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Envase.findOne({ where: args, order: [['Numero', 'DESC']] }).then(R => {
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
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString},
          Despachado: {type: GraphQLString},
        },
        resolve(root, args) {
          return Db.models.Produccion.findAll({
            where: args,
            order: [['Orden', 'ASC']]
          });
        }
      },
      ProduccionsByEnvase: {
        type: new GraphQLList(Produccion),
        args: {
          NumeroEnvase: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Produccion.findAll({
            where:{
              Despachado: 'No'
            },
            order: [['Orden', 'ASC']],
            include: [
              {
                model: Db.models.Envase,
                where:{
                  Numero: {$like: ("%"+args.NumeroEnvase+"%")},
                }
              }
            ]
          });
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
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString},
          Despachado: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Produccion.findOne({ where: args, order: [['Orden', 'ASC']] });
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
          return Db.models.Remision.findAll({ where: args, order: [['Fecha', 'DESC'], ['Numero', 'DESC']]})
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
          return Db.models.Remision.findOne({where: args, order: [['Fecha', 'DESC'], ['Numero', 'DESC']]})
        }
      },
      LastRemision: {
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
          return Db.models.Remision.findOne({where: args, order: [['Numero', 'DESC']]})
        }
      },
      Kardexs: {
        type: new GraphQLList(Kardex),
        args: {
          Tipo: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          FechaInicial: {type: GraphQLString},
          FechaFinal: {type: GraphQLString}
        },
        resolve(root, args) {
          //console.log(args)
          if(args.Tipo === "Único") {
            return Db.models.Kardex.findAll({
              where: {
                EnvaseId: args.EnvaseId,
                $or: [
                  {FechaEntra: {$between: [args.FechaInicial, args.FechaFinal]}},
                  {FechaSale: {$between: [args.FechaInicial, args.FechaFinal]}}
                ]
              },
              order: [['NumeroFacturaSale', 'DESC']]
            })
          } else if(args.Tipo === "Por Cliente") {
            return Db.models.Kardex.findAll({
              where: {
                EnteId: args.EnteId,
                $or: [
                  {FechaEntra: {$between: [args.FechaInicial, args.FechaFinal]}},
                  {FechaSale: {$between: [args.FechaInicial, args.FechaFinal]}}
                ]
              },
              order: [['NumeroFacturaSale', 'DESC']]
            })
          } else {
            return Db.models.Kardex.findAll({
              where: {
                $or: [
                  {FechaEntra: {$between: [args.FechaInicial, args.FechaFinal]}},
                  {FechaSale: {$between: [args.FechaInicial, args.FechaFinal]}}
                ]
              },
              order: [['NumeroFacturaSale', 'DESC']]
            })
          }
        }
      }
    };
  }
});


//mutation
var Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Function to create stuff",
  fields: () => {
    return {
      CreateUser: {
        type: User,
        args: {
          UserName: {type: GraphQLString},
          Password: {type: GraphQLString},
          Active: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.User.create({
            UserName: args.UserName,
            Password: args.Password,
            Active: args.Active
          });
        }
      },
      UpdateUser: {
        type: User,
        args: {
          Id: {type: GraphQLInt},
          UserName: {type: GraphQLString},
          Password: {type: GraphQLString},
          Active: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.User.findOne({
            where: {Id: args.Id}
          }).then( R => {
            R.Password = args.Password,
            R.Active = args.Active
            R.save()
            return R;
          });
        }
      },
      CreateGroup: {
        type: Group,
        args: {
          Name: {type: GraphQLString},
        },
        resolve(_, args) {
          return Db.models.Group.create({
            Name: args.Name
          });
        }
      },
      UpdateGroup: {
        type: Group,
        args: {
          Id: {type: GraphQLInt},
          Name: {type: GraphQLString},
        },
        resolve(_, args) {
          return Db.models.Group.findOne({
            where: {Id: args.Id}
          }).then (R => {
            R.Name = args.Name;
            R.save();
            return R;
          });
        }
      },
      UserAddGroup: {
        type: User,
        args: {
          UserId: {type: GraphQLInt},
          GroupId: {type: GraphQLInt}
        },
        resolve(_, args) {
          return Db.models.User.findOne({
            where: {Id: args.UserId}
          }).then(U => {
            if (U !== null){
              return Db.models.Group.findOne({
                where: {Id: args.GroupId}
              }).then(G => {
                if (G !== null) {
                  return U.addGroup(G).then(R => {
                    return U;
                  })
                } else {
                  return U;
                }
              })
            } else {
              return U;
            }
          });
        }
      },
      UserRemoveGroup: {
        type: User,
        args: {
          UserId: {type: GraphQLInt},
          GroupId: {type: GraphQLInt},
        },
        resolve(_, args) {
          return Db.models.User.findOne({
            where: {Id: args.UserId}
          }).then(U => {
            if (U !== null){
              return Db.models.Group.findOne({
                where: {Id: args.GroupId}
              }).then(G => {
                if (G !== null) {
                  U.removeGroup(G)
                }
                return U;
              })
            } else {
              return U;
            }
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
          Observaciones: {type: GraphQLString},
          Disponible: {type: GraphQLString}
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
            Observaciones: args.Observaciones,
            Disponible: args.Disponible
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
          Observaciones: {type: GraphQLString},
          Disponible: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Envase.findOne({where: {
                Numero: args.Numero
              }
            }).then( R => {
              R.Estado = args.Estado ? args.Estado : R.Estado;
              R.EnteId = args.EnteId ? args.EnteId : R.EnteId;
              R.Material = args.Material ? args.Material : R.Material;
              R.ProductoId = args.ProductoId ? args.ProductoId : R.ProductoId;
              R.Capacidad = args.Capacidad ? args.Capacidad : R.Capacidad;
              R.NumeroInterno = args.NumeroInterno ? args.NumeroInterno : R.NumeroInterno;
              R.Presion = args.Presion ? args.Presion : R.Presion;
              R.AlturaConValvula = args.AlturaConValvula ? args.AlturaConValvula : R.AlturaConValvula;
              R.PesoConValvula = args.PesoConValvula ? args.PesoConValvula : R.PesoConValvula;
              R.Valvula = args.Valvula ? args.Valvula : R.Valvula;
              R.TipoValvula = args.TipoValvula ? args.TipoValvula : R.TipoValvula;
              R.AcabadoColor = args.AcabadoColor ? args.AcabadoColor : R.AcabadoColor;
              R.NormaTecnicaFabricacion = args.NormaTecnicaFabricacion ? args.NormaTecnicaFabricacion : R.NormaTecnicaFabricacion;
              R.Proveedor = args.Proveedor ? args.Proveedor : R.Proveedor;
              R.FechaCompra = args.FechaCompra ? args.FechaCompra : R.FechaCompra;
              R.Garantia = args.Garantia ? args.Garantia : R.Garantia;
              R.FechaFabricacion = args.FechaFabricacion ? args.FechaFabricacion : R.FechaFabricacion;
              R.PruebaHidrostatica = args.PruebaHidrostatica ? args.PruebaHidrostatica : R.PruebaHidrostatica;
              R.EquipoAlquilado = args.EquipoAlquilado ? args.EquipoAlquilado : R.EquipoAlquilado;
              R.FechaAlquiler = args.FechaAlquiler ? args.FechaAlquiler : R.FechaAlquiler;
              R.Observaciones = args.Observaciones ? args.Observaciones : R.Observaciones;
              R.Disponible = args.Disponible ? args.Disponible : R.Disponible;
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
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Observacion: {type: GraphQLString},
          Despachado: {type: GraphQLString}
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
            PurezaFinal: args.PurezaFinal,
            PresionFinal: args.PresionFinal,
            Observacion: args.Observacion,
            Despachado: args.Despachado
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
          Despachado: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Produccion.findOne({
            where: {
              Id: args.Id
            }
          }).then( R => {
            R.Cantidad = args.Cantidad;
            R.EnvaseId = args.EnvaseId;
            R.Despachado = args.Despachado;
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
          Observacion: {type: GraphQLString},
          Despachado: {type: GraphQLString}
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
            Observacion: args.Observacion,
            Despachado: args.Despachado
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
      },
      CreateKardexSale: {
        type: Kardex,
        args: {
          Cantidad: {type: GraphQLFloat},
          ProductoId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          FechaElaboracion: {type: GraphQLString},
          Lote: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          FechaSale: {type: GraphQLString},
          NumeroFacturaSale: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Kardex.create({
            Cantidad: args.Cantidad,
            ProductoId: args.ProductoId,
            EnvaseId: args.EnvaseId,
            FechaElaboracion: args.FechaElaboracion,
            Lote: args.Lote,
            FechaVencimiento: args.FechaVencimiento,
            EnteId: args.EnteId,
            FechaSale: args.FechaSale,
            NumeroFacturaSale: args.NumeroFacturaSale,
            FechaEntra: null,
            NumeroFacturaEntra: null
          }).then( R => {
            return R;
          });
        }
      },
      CreateKardexEntra: {
        type: Kardex,
        args: {
          EnvaseId: {type: GraphQLInt},
          EnteId: {type: GraphQLInt},
          FechaEntra: {type: GraphQLString},
          NumeroFacturaEntra: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseId,
              EnteId: args.EnteId,
              FechaEntra: null,
              NumeroFacturaEntra: null
            }
          }).then( R => {
            if (R) {
              R.FechaEntra = args.FechaEntra;
              R.NumeroFacturaEntra = args.NumeroFacturaEntra;
              R.save();
            }

            return R;

          });
        }
      },
      DeleteKardexSale: {
        type: Kardex,
        args: {
          EnvaseId: {type: GraphQLInt},
          NumeroFacturaSale: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseId,
              NumeroFacturaSale: args.NumeroFacturaSale
            }
          }).then( R => {
            if (R) {
              R.destroy();
            }
            return R;
          });
        }
      },
      DeleteKardexEntra: {
        type: Kardex,
        args: {
          EnvaseId: {type: GraphQLInt},
          NumeroFacturaEntra: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseId,
              NumeroFacturaEntra: args.NumeroFacturaEntra
            }
          }).then( R => {
            if (R) {
              R.FechaEntra = null;
              R.NumeroFacturaEntra = null;
              R.save();
            }
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
