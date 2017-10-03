/*basic and test*/
PRAGMA foreign_key=ON;
CREATE TABLE IF NOT EXISTS "User" (
  "Id" INTEGER PRIMARY KEY,
  "UserName" TEXT UNIQUE,
  "Password" TEXT,
  "Active" TEXT
);

CREATE TABLE IF NOT EXISTS "Group" (
  "Id" INTEGER PRIMARY KEY,
  "Name" TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS "UserGroup" (
  "UserId" INTEGER REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  "GroupId" INTEGER REFERENCES "Group"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("UserId", "GroupId")
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


CREATE TABLE IF NOT EXISTS "Producto" (
  "Id" INTEGER PRIMARY KEY,
  "Nombre" TEXT UNIQUE,
  "UnidadDeMedida" TEXT
);


CREATE TABLE IF NOT EXISTS "Envase" (
  "Id" INTEGER PRIMARY KEY,
  "Estado" TEXT,/*value: en uso/nuevo*/
  "EnteId" INTEGER DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Material" TEXT,
  "ProductoId" INTEGER DEFAULT NULL REFERENCES "Producto"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Capacidad" DECIMAL,
  "Numero" TEXT  UNIQUE,
  "NumeroInterno" TEXT,
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
  "Orden" TEXT,
  "Turno" TEXT,
  "Fecha" DATE,
  "Lote" TEXT,
  "FechaInicial" DATE,
  "FechaFinal" DATE,
  "HoraInicial" TIME,
  "HoraFinal" TIME,
  "FechaFabricacion" DATE,
  "FechaVencimiento" DATE,
  "Cantidad" DECIMAL,
  "ProductoId" INTEGER DEFAULT NULL REFERENCES "Producto"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnvaseId" INTEGER DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnteId" INTEGER DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "PurezaFinal" DECIMAL,
  "PresionFinal" DECIMAL,
  "Observacion" TEXT,
  "Despachado" TEXT
  UNIQUE("Orden", "EnvaseId")
);


CREATE TABLE IF NOT EXISTS "Remision" (
  "Id" INTEGER PRIMARY KEY,
  "Numero" TEXT,
  "Fecha" DATE,
  "EnteId" INTEGER DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "ProduccionId" INTEGER DEFAULT NULL REFERENCES "Produccion"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnvaseId" INTEGER DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Total" DECIMAL,
  UNIQUE("Numero", "ProduccionId")
);


CREATE TABLE IF NOT EXISTS "Kardex" (
  "Id" INTEGER PRIMARY KEY,
  "Cantidad" DECIMAL,
  "ProductoId" INTEGER DEFAULT NULL REFERENCES "Producto"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnvaseId" INTEGER DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "FechaElaboracion" DATE,
  "Lote" TEXT,
  "FechaVencimiento" DATE,
  "EnteId" INTEGER DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "FechaSale" DATE,
  "NumeroFacturaSale" TEXT,
  "FechaEntra" DATE,
  "NumeroFacturaEntra" TEXT
);
