CREATE TABLE IF NOT EXISTS "User" (
  "Id" BIGSERIAL PRIMARY KEY,
  "UserName" TEXT UNIQUE,
  "Password" TEXT,
  "Active" TEXT
);

CREATE TABLE IF NOT EXISTS "Group" (
  "Id" BIGSERIAL PRIMARY KEY,
  "Name" TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS "UserGroup" (
  "UserId" BIGINT REFERENCES "User"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  "GroupId" BIGINT REFERENCES "Group"("Id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("UserId", "GroupId")
);

/*empresa*/
CREATE TABLE IF NOT EXISTS "Ente" (
  "Id" BIGSERIAL PRIMARY KEY,
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
  "Id" BIGSERIAL PRIMARY KEY,
  "Nombre" TEXT UNIQUE,
  "UnidadDeMedida" TEXT
);


CREATE TABLE IF NOT EXISTS "Envase" (
  "Id" BIGSERIAL PRIMARY KEY,
  "Estado" TEXT,/*value: en uso/nuevo*/
  "EnteId" BIGINT DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Material" TEXT,
  "ProductoId" BIGINT DEFAULT NULL REFERENCES "Producto"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
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
  "Observaciones" TEXT,
  "Disponible" TEXT
);


CREATE TABLE IF NOT EXISTS "Produccion" (
  "Id" BIGSERIAL PRIMARY KEY,
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
  "ProductoId" BIGINT DEFAULT NULL REFERENCES "Producto"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnvaseId" BIGINT DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "PurezaFinal" DECIMAL,
  "PresionFinal" DECIMAL,
  "Observacion" TEXT,
  "Despachado" TEXT,
  UNIQUE("Orden", "EnvaseId")
);


CREATE TABLE IF NOT EXISTS "Recprodcom" (
  "Id" BIGSERIAL PRIMARY KEY,
  "Numero" TEXT,
  "Fecha" DATE,
  "Lote" TEXT,
  "FechaFabricacion" DATE,
  "FechaVencimiento" DATE,
  "Cantidad" DECIMAL,
  "EnteId" BIGINT DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "ProductoId" BIGINT DEFAULT NULL REFERENCES "Producto"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnvaseId" BIGINT DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "PurezaFinal" DECIMAL,
  "PresionFinal" DECIMAL,
  "Certificado" TEXT,
  "RegistroSanitario" TEXT,
  "Otros" TEXT,
  "Observacion" TEXT,
  "Despachado" TEXT,
  UNIQUE("Numero", "EnvaseId")
);


CREATE TABLE IF NOT EXISTS "Remision" (
  "Id" BIGSERIAL PRIMARY KEY,
  "Numero" TEXT,
  "Fecha" DATE,
  "EnteId" BIGINT DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "ProduccionId" BIGINT DEFAULT NULL REFERENCES "Produccion"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "RecprodcomId" BIGINT DEFAULT NULL REFERENCES "Recprodcom"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnvaseId" BIGINT DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "Total" DECIMAL,
  UNIQUE("Numero", "ProduccionId", "RecprodcomId")
);


CREATE TABLE IF NOT EXISTS "Kardex" (
  "Id" BIGSERIAL PRIMARY KEY,
  "Cantidad" DECIMAL,
  "ProductoId" BIGINT DEFAULT NULL REFERENCES "Producto"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "EnvaseId" BIGINT DEFAULT NULL REFERENCES "Envase"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "FechaElaboracion" DATE,
  "Lote" TEXT,
  "FechaVencimiento" DATE,
  "EnteId" BIGINT DEFAULT NULL REFERENCES "Ente"("Id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
  "FechaSale" DATE,
  "NumeroFacturaSale" TEXT,
  "FechaEntra" DATE,
  "NumeroFacturaEntra" TEXT,
  "Tipo" TEXt
);
