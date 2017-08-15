/*basic and test*/
PRAGMA foreign_key=ON;
CREATE TABLE IF NOT EXISTS "User" (
  "Id" INTEGER PRIMARY KEY,
  "UserName" TEXT UNIQUE,
  "Password" TEXT,
  "Active" BOOLEAN
);

CREATE TABLE IF NOT EXISTS "Person" (
  "UserId" INTEGER REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE PRIMARY KEY,
  "Email" TEXT UNIQUE,
  "FirstName" TEXT,
  "LastName" TEXT
);

CREATE TABLE IF NOT EXISTS "Post" (
  "Id" INTEGER PRIMARY KEY,
  "PersonId" INTEGER REFERENCES "Person"("UserId") ON DELETE CASCADE ON UPDATE CASCADE,
  "Title" TEXT,
  "Content" TEXT
);


/*empresa*/
PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS "Ente" (
  "Id" INTEGER PRIMARY KEY,
  "TipoDocumento" TEXT NOT NULL,
  "NumeroDocumento" TEXT NOT NULL,
  "Nombre" TEXT,
  "Ciudad" TEXT,
  "Direccion" TEXT,
  "Telefono" TEXT,
  "Relacion" TEXT,/*Propio/Cliente*/
  UNIQUE ("TipoDocumento", "NumeroDocumento")
);


CREATE TABLE IF NOT EXISTS "Envase" (
  "Id" INTEGER PRIMARY KEY,
  "Estado" TEXT,/*value: en uso/nuevo*/
  "EnteId" INTEGER DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Material" TEXT,
  "UnidadMedidaCapacidad" TEXT,
  "Capacidad" DECIMAL,
  "Numero" TEXT  UNIQUE,
  "NumeroInterno" TEXT,
  "ClaseProducto" TEXT,
  "Presion" DECIMAL,
  "AlturaConValvula" DECIMAL,
  "PesoConValvula" DECIMAL,
  "Valvula" TEXT,
  "TipoValvula" TEXT,
  "AcabadoColor" TEXT,
  "NormaTecnicaFabricacion" TEXT,
  "Proveedor" TEXT,
  "FechaCompra" DATE,
  "Garantia" DATE,
  "FechaFabricacion" DATE,
  "PruebaHidrostatica" DATE,
  "EquipoAlquilado" TEXT,
  "FechaAlquiler" DATE,
  "Observaciones" TEXT
);


CREATE TABLE IF NOT EXISTS "Produccion" (
  "Id" INTEGER PRIMARY KEY,
  "Fecha" DATE,
  "Lote" TEXT,
  "FechaFabricacion" DATE,
  "FechaVencimiento" DATE,
  "Cantidad" DECIMAL,
  "Producto" TEXT,
  "EnvaseId" INTEGER DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "PurezaFinal" DECIMAL,
  "PresionFinal" DECIMAL,
  UNIQUE(Fecha, Lote, EnvaseId)
);


CREATE TABLE IF NOT EXISTS "Remision" (
  "Id" INTEGER PRIMARY KEY,
  "Numero" TEXT,
  "Fecha" DATE,
  "EnteId" INTEGER DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Sale" TEXT,
  "Entra" TEXT,
  "ProduccionId" INTEGER DEFAULT NULL REFERENCES "Produccion"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Total" DECIMAL,
  UNIQUE ("Numero", "ProduccionId")
);

