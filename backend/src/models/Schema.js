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


//recprodcom
var Recprodcom = new GraphQLObjectType({
  name: "Recprodcom",
  description: "Object representation of Recprodcom",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Recprodcom) {
          return Recprodcom.Id;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.Numero;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.Fecha;
        }
      },
      Lote: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.Lote;
        }
      },
      FechaFabricacion: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.FechaFabricacion;
        }
      },
      FechaVencimiento: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.FechaVencimiento;
        }
      },
      Cantidad: {
        type: GraphQLFloat,
        resolve(Recprodcom) {
          return Recprodcom.Cantidad;
        }
      },
      ProductoId: {
        type: GraphQLInt,
        resolve(Recprodcom) {
          return Recprodcom.ProductoId;
        }
      },
      EnteId: {
        type: GraphQLInt,
        resolve(Recprodcom) {
          return Recprodcom.EnteId;
        }
      },
      EnvaseId: {
        type: GraphQLInt,
        resolve(Recprodcom) {
          return Recprodcom.EnvaseId;
        }
      },
      PurezaFinal: {
        type: GraphQLFloat,
        resolve(Recprodcom) {
          return Recprodcom.PurezaFinal;
        }
      },
      PresionFinal: {
        type: GraphQLFloat,
        resolve(Recprodcom) {
          return Recprodcom.PresionFinal;
        }
      },
      Certificado: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.Certificado;
        }
      },
      RegistroSanitario: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.RegistroSanitario;
        }
      },
      Otros: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.Otros;
        }
      },
      Observacion: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.Observacion;
        }
      },
      Despachado: {
        type: GraphQLString,
        resolve(Recprodcom) {
          return Recprodcom.Despachado;
        }
      },
      Proveedor: {
        type: Ente,
        resolve(Recprodcom) {
          return Recprodcom.getEnte();
        }
      },
      Envase: {
        type: Envase,
        resolve(Recprodcom) {
          return Recprodcom.getEnvase();
        }
      },
      Producto: {
        type: Producto,
        resolve(Recprodcom) {
          return Recprodcom.getProducto();
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
      RecprodcomId: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.RecprodcomId;
        }
      },
      EnvaseEntraId: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.EnvaseEntraId;
        }
      },
      EnvaseSaleId: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.EnvaseSaleId;
        }
      },
      Total: {
        type: GraphQLFloat,
        resolve(Remision) {
          return Remision.Total;
        }
      },
      Tipo: {
        type: GraphQLString,
        resolve(Remision) {
          return Remision.Tipo;
        }
      },
      VendedorId: {
        type: GraphQLInt,
        resolve(Remision) {
          return Remision.VendedorId;
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
      Recprodcom: {
        type: Recprodcom,
        resolve(Remision) {
          return Remision.getRecprodcom();
        }
      },
      EnvaseEntra: {
        type: Envase,
        resolve(Remision) {
          return Remision.getEnvaseEntra();
        }
      },
      EnvaseSale: {
        type: Envase,
        resolve(Remision) {
          return Remision.getEnvaseSale();
        }
      },
      Vendedor: {
        type: Ente,
        resolve(Remision) {
          return Remision.getVendedor();
        }
      },
    }
  }
});


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
});

//Correria
var Correria = new GraphQLObjectType({
  name: "Correria",
  description: "Object representation of Correria",
  fields: () => {
    return {
      Id: {
        type: GraphQLInt,
        resolve(Correria) {
          return Correria.Id;
        }
      },
      Numero: {
        type: GraphQLString,
        resolve(Correria) {
          return Correria.Numero;
        }
      },
      Fecha: {
        type: GraphQLString,
        resolve(Correria) {
          return Correria.Fecha;
        }
      },
      EnteId: {
        type: GraphQLInt,
        resolve(Correria) {
          return Correria.EnteId;
        }
      },
      ProduccionId: {
        type: GraphQLInt,
        resolve(Correria) {
          return Correria.ProduccionId;
        }
      },
      RecprodcomId: {
        type: GraphQLInt,
        resolve(Correria) {
          return Correria.RecprodcomId;
        }
      },
      Ente: {
        type: Ente,
        resolve(Correria) {
          return Correria.getEnte();
        }
      },
      Produccion: {
        type: Produccion,
        resolve(Correria) {
          return Correria.getProduccion();
        }
      },
      Recprodcom: {
        type: Recprodcom,
        resolve(Correria) {
          return Correria.getRecprodcom();
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
          if(!args.NombreDocumento){
            return Db.models.Ente.findAll({
              where: args
            });
          }

          return Db.models.Ente.findAll({
            where: {
              $or: [
                {
                  NumeroDocumento: {$like: ("%"+args.NombreDocumento+"%")}
                },
                {
                  Nombre: {$like: ("%"+args.NombreDocumento+"%")}
                }
              ],
              Relacion: args.Relacion ? {$like: ("%"+args.Relacion+"%")} : {$or: ['Cliente', 'Propia', 'Proveedor', 'Cliente Y Proveedor']}
            },
            order: [['Nombre', 'ASC']]
          });
        }
      },
      EntesByNombre: {
        type: new GraphQLList(Ente),
        args: {
          Nombre: {type: GraphQLString},
          Relacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Ente.findAll({
            where: {
              Nombre: {$like: ("%"+args.Nombre+"%")},

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
          if(args.EnteId || args.ProductoId){
            return Db.models.Envase.findAll({where: args});
          }
          else if(!args.Numero){
            return Db.models.Envase.findAll();
          }

          return Db.models.Envase.findAll({
            where: {
              Numero: {$like: ("%"+args.Numero+"%")},
              Disponible: args.Disponible ? args.Disponible : {$or: ['Si', 'No']},
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
      LastProduccion : {
        type: Produccion,
        args: {},
        resolve (root, args) {
          return Db.models.Produccion.findOne({order: [['Orden', 'DESC']]})
        }
      },
      LastLote : {
        type: Produccion,
        args: {
          Fecha: {type: GraphQLString}
        },
        resolve (root, args) {
          var month = new Date(Number(args.Fecha.substr(0,4), args.Fecha.substr(6,2), 0)).getDate();
          var DateOne = `${args.Fecha.substr(0,7)}-01T00:00:00`;
          var DateTwo = `${args.Fecha.substr(0,7)}-${month}T00:00:00`;
          return Db.models.Produccion.findOne({
            where: {
              $and: {
                Fecha: {
                  $gte: new Date(DateOne),
                  $lte: new Date(DateTwo)
                }
              }
            },
            order: [['Fecha', 'DESC'], ['Lote', 'DESC']]});
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
          NumeroEnvase: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Produccion.findAll({
            where:{
              Despachado: 'No',
              FechaFabricacion: { $lte: new Date(args.FechaFabricacion+'T00:00:00') }
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
      ProduccionsByCorreria: {
        type: new GraphQLList(Produccion),
        args: {
          VendedorId: {type: GraphQLInt},
          NumeroEnvase: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Produccion.findAll({
            where:{
              Despachado: 'No',
              FechaFabricacion: { $lte: new Date(args.FechaFabricacion+'T00:00:00') }
            },
            order: [['Orden', 'ASC']],
            include: [
              {
                model: Db.models.Envase,
                where:{
                  Numero: {$like: ("%"+args.NumeroEnvase+"%")},
                }
              },
              {
                model: Db.models.Correria,
                where: {
                  EnteId: args.VendedorId
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
      Recprodcoms: {
        type: new GraphQLList(Recprodcom),
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          Lote: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          Cantidad: {type: GraphQLFloat},
          EnteId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Certificado: {type: GraphQLString},
          RegistroSanitario: {type: GraphQLString},
          Otros: {type: GraphQLString},
          Observacion: {type: GraphQLString},
          Despachado: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Recprodcom.findAll({
            where: args,
            order: [['Numero', 'ASC']]
          });
        }
      },
      LastRecprodcom : {
        type: Recprodcom,
        args: {},
        resolve (root, args) {
          return Db.models.Recprodcom.findOne({order: [['Numero', 'DESC']]})
        }
      },
      LastLoteRecprodcom : {
        type: Recprodcom,
        args: {
          Fecha: {type: GraphQLString}
        },
        resolve (root, args) {
          var month = new Date(Number(args.Fecha.substr(0,4), args.Fecha.substr(6,2), 0)).getDate();
          var DateOne = `${args.Fecha.substr(0,7)}-01T00:00:00`;
          var DateTwo = `${args.Fecha.substr(0,7)}-${month}T00:00:00`;
          return Db.models.Recprodcom.findOne({
            where: {
              $and: {
                Fecha: {
                  $gte: new Date(DateOne),
                  $lte: new Date(DateTwo)
                }
              }
            },
            order: [['Fecha', 'DESC'], ['Lote', 'DESC']]});
        }
      },
      RecprodcomsByEnvase: {
        type: new GraphQLList(Recprodcom),
        args: {
          NumeroEnvase: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Recprodcom.findAll({
            where:{
              Despachado: 'No',
              FechaFabricacion: { $lte: new Date(args.FechaFabricacion+'T00:00:00') }
            },
            order: [['Numero', 'ASC']],
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
      RecprodcomsByCorreria: {
        type: new GraphQLList(Recprodcom),
        args: {
          VendedorId: {type: GraphQLInt},
          NumeroEnvase: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString}
        },
        resolve(root, args) {
          return Db.models.Recprodcom.findAll({
            where:{
              Despachado: 'No',
              FechaFabricacion: { $lte: new Date(args.FechaFabricacion+'T00:00:00') }
            },
            order: [['Numero', 'ASC']],
            include: [
              {
                model: Db.models.Envase,
                where:{
                  Numero: {$like: ("%"+args.NumeroEnvase+"%")},
                }
              },
              {
                model: Db.models.Correria,
                where: {
                  EnteId: args.VendedorId
                }
              }
            ]
          });
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
          RecprodcomId: {type: GraphQLInt},
          EnvaseEntraId: {type: GraphQLInt},
          EnvaseSaleId: {type: GraphQLInt},
          Total: {type: GraphQLFloat},
          Tipo: {type: GraphQLString},
          VendedorId: {type: GraphQLInt},
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
          RecprodcomId: {type: GraphQLInt},
          EnvaseEntraId: {type: GraphQLInt},
          EnvaseSaleId: {type: GraphQLInt},
          Total: {type: GraphQLFloat},
          Tipo: {type: GraphQLFloat},
          VendedorId: {type: GraphQLInt},
        },
        resolve(root, args) {
          return Db.models.Remision.findOne({where: args, order: [['Fecha', 'DESC'], ['Numero', 'DESC']]})
        }
      },
      LastRemision: {
        type: Remision,
        args: {},
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
              order: [['FechaEntra', 'DESC'], ['NumeroFacturaEntra', 'ASC'], ['FechaSale', 'DESC'], ['NumeroFacturaSale', 'ASC']]
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
              order: [['FechaEntra', 'DESC'], ['NumeroFacturaEntra', 'ASC'], ['FechaSale', 'DESC'], ['NumeroFacturaSale', 'ASC']]
            })
          } else {
            return Db.models.Kardex.findAll({
              where: {
                $or: [
                  {FechaEntra: {$between: [args.FechaInicial, args.FechaFinal]}},
                  {FechaSale: {$between: [args.FechaInicial, args.FechaFinal]}}
                ]
              },
              order: [['FechaEntra', 'DESC'], ['NumeroFacturaEntra', 'ASC'], ['FechaSale', 'DESC'], ['NumeroFacturaSale', 'ASC']]
            })
          }
        }
      },
      Correrias: {
        type: new GraphQLList(Correria),
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          ProduccionId: {type: GraphQLInt},
          RecprodcomId: {type: GraphQLInt},
        },
        resolve(root, args) {
          return Db.models.Correria.findAll({ where: args, order: [['Fecha', 'DESC'], ['Numero', 'DESC']]})
        }
      },
      LastCorreria : {
        type: Correria,
        args: {},
        resolve (root, args) {
          return Db.models.Correria.findOne({order: [['Numero', 'DESC']]})
        }
      },
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

          Db.models.Envase.findOne({
            where: {
              Id: args.EnvaseId
            }
          }).then( R => {
            if(R){
              R.Disponible = "No";
              R.save();
            }
          });

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

            Db.models.Envase.findOne({
              where: {
                Id: R.EnvaseId
              }
            }).then( E => {
              if(E){
                E.Disponible = "Si";
                E.save();
              }
            });

            return R.destroy();
          });
        }
      },
      CreateRecprodcom: {
        type: Recprodcom,
        args: {
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          Lote: {type: GraphQLString},
          FechaFabricacion: {type: GraphQLString},
          FechaVencimiento: {type: GraphQLString},
          Cantidad: {type: GraphQLFloat},
          EnteId: {type: GraphQLInt},
          EnvaseId: {type: GraphQLInt},
          ProductoId: {type: GraphQLInt},
          PurezaFinal: {type: GraphQLFloat},
          PresionFinal: {type: GraphQLFloat},
          Certificado: {type: GraphQLString},
          RegistroSanitario: {type: GraphQLString},
          Otros: {type: GraphQLString},
          Observacion: {type: GraphQLString},
          Despachado: {type: GraphQLString}
        },
        resolve(_, args) {

          Db.models.Envase.findOne({
            where: {
              Id: args.EnvaseId
            }
          }).then( R => {

            if(R){
              R.Disponible = "No";
              R.save();
            }
          });

          return Db.models.Recprodcom.create({
            Numero: args.Numero,
            Fecha: args.Fecha,
            Lote: args.Lote,
            FechaFabricacion: args.FechaFabricacion,
            FechaVencimiento: args.FechaVencimiento,
            Cantidad: args.Cantidad,
            EnteId: args.EnteId,
            EnvaseId: args.EnvaseId,
            ProductoId: args.ProductoId,
            PurezaFinal: args.PurezaFinal,
            PresionFinal: args.PresionFinal,
            Certificado: args.Certificado,
            RegistroSanitario: args.RegistroSanitario,
            Otros: args.Otros,
            Observacion: args.Observacion,
            Despachado: 'No'
          }).then( R => {

              return R;

          });
        }
      },
      UpdateOneRecprodcom: {
        type: Recprodcom,
        args: {
          Id: {type: GraphQLInt},
          Cantidad: {type: GraphQLFloat},
          EnvaseId: {type: GraphQLInt},
          Despachado: {type: GraphQLString}
        },
        resolve(_, args) {
          return Db.models.Recprodcom.findOne({
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
      DeleteRecprodcom: {
        type: Recprodcom,
        args: {
          Id: {type: GraphQLInt}
        },
        resolve(_, args) {
          return Db.models.Recprodcom.findOne({
            where: {
              Id: args.Id
            }
          }).then( R => {

            Db.models.Envase.findOne({
              where: {
                Id: R.EnvaseId
              }
            }).then( E => {
              if(E){
                E.Disponible = "Si";
                E.save();
              }
            });

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
          EnvaseProduccionId: {type: GraphQLInt},
          RecprodcomId: {type: GraphQLInt},
          EnvaseRecprodcomId: {type: GraphQLInt},
          EnvaseEntraId: {type: GraphQLInt},
          Total: {type: GraphQLFloat},
          VendedorId: {type: GraphQLInt}
        },
        resolve(_, args) {

          if(args.ProduccionId){
            Db.models.Produccion.findOne({
              where: {
                Id: args.ProduccionId
              }
            }).then ( P => {
              P.Despachado = 'Si';
              P.save();

              Db.models.Kardex.create({
                Cantidad: P.Cantidad,
                ProductoId: P.ProductoId,
                EnvaseId: P.EnvaseId,
                FechaElaboracion: P.FechaFabricacion,
                Lote: P.Lote,
                FechaVencimiento: P.FechaVencimiento,
                EnteId: args.EnteId,
                FechaSale: args.Fecha,
                NumeroFacturaSale: args.Numero,
                FechaEntra: null,
                NumeroFacturaEntra: null,
                Tipo: 'Cliente'
              });
            });
          }

          if(args.RecprodcomId){
            Db.models.Recprodcom.findOne({
              where: {
                Id: args.RecprodcomId
              }
            }).then ( P => {
              P.Despachado = 'Si';
              P.save();

              Db.models.Kardex.create({
                Cantidad: P.Cantidad,
                ProductoId: P.ProductoId,
                EnvaseId: P.EnvaseId,
                FechaElaboracion: P.FechaFabricacion,
                Lote: P.Lote,
                FechaVencimiento: P.FechaVencimiento,
                EnteId: args.EnteId,
                FechaSale: args.Fecha,
                NumeroFacturaSale: args.Numero,
                FechaEntra: null,
                NumeroFacturaEntra: null,
                Tipo: 'Cliente'
              });
            });
          }

          if(args.EnvaseProduccionId){
            Db.models.Envase.findOne({
              where: {
                Id: args.EnvaseProduccionId
              }
            }).then( E => {
              E.Disponible = 'Si';
              E.save();
            });
          }

          if(args.EnvaseRecprodcomId){
            Db.models.Envase.findOne({
              where: {
                Id: args.EnvaseRecprodcomId
              }
            }).then( E => {
              E.Disponible = 'Si';
              E.save();
            });
          }

          if(args.EnvaseEntraId){
            Db.models.Kardex.findOne({
              where: {
                EnvaseId: args.EnvaseEntraId,
                EnteId: args.EnteId,
                FechaEntra: null,
                NumeroFacturaEntra: null
              }
            }).then( KE => {
              if (KE) {
                KE.FechaEntra = args.Fecha;
                KE.NumeroFacturaEntra = args.Numero;
                KE.save();
              }else{
                Db.models.Envase.findOne({
                  where: {
                    Id: args.EnvaseEntraId
                  }
                }).then(EN => {
                  Db.models.Kardex.create({
                    Cantidad: EN.Capacidad,
                    ProductoId: EN.ProductoId,
                    EnvaseId: EN.Id,
                    FechaElaboracion: null,
                    Lote: null,
                    FechaVencimiento: null,
                    EnteId: args.EnteId,
                    FechaSale: null,
                    NumeroFacturaSale: null,
                    FechaEntra: args.Fecha,
                    NumeroFacturaEntra: args.Numero,
                    Tipo: 'Cliente'
                  });
                })
              }
            });
          }

          return Db.models.Remision.create({
            Numero: args.Numero,
            Fecha: args.Fecha,
            EnteId: args.EnteId,
            ProduccionId: args.ProduccionId,
            RecprodcomId: args.RecprodcomId,
            EnvaseEntraId: args.EnvaseEntraId,
            Total: args.Total,
            Tipo: 'Cliente',
            VendedorId: args.VendedorId
          }).then( R => {
            return R;
          });
        }

      },
      CreateRemisionProveedor: {
        type: Remision,
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          EnvaseEntraId: {type: GraphQLInt},
          EnvaseSaleId: {type: GraphQLInt},
          Total: {type: GraphQLFloat}
        },
        resolve(_, args) {

          if(args.EnvaseEntraId){
            Db.models.Kardex.findOne({
              where: {
                EnvaseId: args.EnvaseEntraId,
                EnteId: args.EnteId,
                FechaEntra: null,
                NumeroFacturaEntra: null
              }
            }).then( KE => {
              if (KE) {
                KE.FechaEntra = args.Fecha;
                KE.NumeroFacturaEntra = args.Numero;
                KE.save();
              }else{
                Db.models.Envase.findOne({
                  where: {
                    Id: args.EnvaseEntraId
                  }
                }).then(EN => {
                  Db.models.Kardex.create({
                    Cantidad: EN.Capacidad,
                    ProductoId: EN.ProductoId,
                    EnvaseId: EN.Id,
                    FechaElaboracion: null,
                    Lote: null,
                    FechaVencimiento: null,
                    EnteId: args.EnteId,
                    FechaSale: null,
                    NumeroFacturaSale: null,
                    FechaEntra: args.Fecha,
                    NumeroFacturaEntra: args.Numero,
                    Tipo: 'Proveedor'
                  });
                })
              }
            });
          }

          else if(args.EnvaseSaleId){
            Db.models.Kardex.findOne({
              where: {
                EnvaseId: args.EnvaseSaleId,
                EnteId: args.EnteId,
                FechaSale: null,
                NumeroFacturaSale: null
              }
            }).then( KE => {
              if (KE) {
                KE.FechaSale = args.Fecha;
                KE.NumeroFacturaSale = args.Numero;
                KE.save();
              }else{
                Db.models.Envase.findOne({
                  where: {
                    Id: args.EnvaseSaleId
                  }
                }).then(EN => {
                  Db.models.Kardex.create({
                    Cantidad: EN.Capacidad,
                    ProductoId: EN.ProductoId,
                    EnvaseId: EN.Id,
                    FechaElaboracion: null,
                    Lote: null,
                    FechaVencimiento: null,
                    EnteId: args.EnteId,
                    FechaSale: args.Fecha,
                    NumeroFacturaSale: args.Numero,
                    FechaEntra: null,
                    NumeroFacturaEntra: null,
                    Tipo: 'Proveedor'
                  });
                })
              }
            });
          }

          return Db.models.Remision.create({
            Numero: args.Numero,
            Fecha: args.Fecha,
            EnteId: args.EnteId,
            EnvaseSaleId: args.EnvaseSaleId,
            EnvaseEntraId: args.EnvaseEntraId,
            Tipo: 'Proveedor',
            VendedorId: args.VendedorId
          }).then( R => {
            return R;
          });
        }

      },
      DeleteRemision: {
        type: Remision,
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          ProduccionId: {type: GraphQLInt},
          EnvaseProduccionId: {type: GraphQLInt},
          RecprodcomId: {type: GraphQLInt},
          EnvaseRecprodcomId: {type: GraphQLInt},
          EnvaseEntraId: {type: GraphQLInt}
        },
        resolve(_, args) {

          if(args.ProduccionId){
            Db.models.Produccion.findOne({
              where: {
                Id: args.ProduccionId
              }
            }).then ( P => {
              P.Despachado = 'No';
              P.save();
            });
          }

          if(args.RecprodcomId){
            Db.models.Recprodcom.findOne({
              where: {
                Id: args.RecprodcomId
              }
            }).then ( P => {
              P.Despachado = 'No';
              P.save();
            });
          }

          if(args.EnvaseProduccionId){
            Db.models.Envase.findOne({
              where: {
                Id: args.EnvaseProduccionId
              }
            }).then( E => {
              E.Disponible = 'No';
              E.save();
            });
          }

          if(args.EnvaseRecprodcomId){
            Db.models.Envase.findOne({
              where: {
                Id: args.EnvaseRecprodcomId
              }
            }).then( E => {
              E.Disponible = 'No';
              E.save();
            });
          }

          Db.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseProduccionId ? args.EnvaseProduccionId : args.EnvaseRecprodcomId,
              NumeroFacturaSale: args.Numero
            }
          }).then( KS => {
            if (KS) {
              KS.destroy();
            }
          });

          Db.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseEntraId,
              NumeroFacturaEntra: args.Numero
            }
          }).then( KE => {
            if (KE) {
              if(KE.FechaSale !== null && KE.NumeroFacturaSale !== null){
                KE.FechaEntra = null;
                KE.NumeroFacturaEntra = null;
                KE.save();
              } else {
                KE.destroy();
              }
            }
          });

          return Db.models.Remision.findOne({
            where: {
              Id: args.Id
            }
          }).then( R => {
            return R.destroy();
          });

        }
      },
      DeleteRemisionProveedor: {
        type: Remision,
        args: {
          Id: {type: GraphQLInt},
          Numero: {type: GraphQLString},
          EnvaseEntraId: {type: GraphQLInt},
          EnvaseSaleId: {type: GraphQLInt},
        },
        resolve(_, args) {

          Db.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseEntraId,
              NumeroFacturaEntra: args.Numero
            }
          }).then( KE => {
            if (KE) {
              if(KE.FechaSale !== null && KE.NumeroFacturaSale !== null){
                KE.FechaEntra = null;
                KE.NumeroFacturaEntra = null;
                KE.save();
              } else {
                KE.destroy();
              }
            }
          });

          Db.models.Kardex.findOne({
            where: {
              EnvaseId: args.EnvaseSaleId,
              NumeroFacturaSale: args.Numero
            }
          }).then( KS => {
            if (KS) {
              KS.destroy();
            }
          });

          return Db.models.Remision.findOne({
            where: {
              Id: args.Id
            }
          }).then( R => {
            return R.destroy();
          });
        }
      },
      CreateCorreria: {
        type: Correria,
        args: {
          Numero: {type: GraphQLString},
          Fecha: {type: GraphQLString},
          EnteId: {type: GraphQLInt},
          ProduccionId: {type: GraphQLInt},
          RecprodcomId: {type: GraphQLInt},
        },
        resolve(_, args) {
          return Db.models.Correria.create({
            Numero: args.Numero,
            Fecha: args.Fecha,
            EnteId: args.EnteId,
            ProduccionId: args.ProduccionId,
            RecprodcomId: args.RecprodcomId
          });
        }
      },
      DeleteCorreria: {
        type: Correria,
        args: {
          Id: {type: GraphQLInt}
        },
        resolve(_, args) {
          return Db.models.Correria.findOne({
            where: args
          }).then(C => {
            if(C){
             return C.destroy();
            }
          })
        }
      },
    };
  }
});


//schema
var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
