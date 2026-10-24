-- =============================================
-- GRIFOS KALA - Esquema completo de Supabase
-- Pegar en: SQL Editor → Run
-- =============================================

-- 1. Tabla de Estaciones
CREATE TABLE estaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  direccion TEXT,
  ciudad TEXT DEFAULT 'Arequipa',
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Productos
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL, -- diesel, diesel4, regular, urea
  nombre TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  unidad TEXT NOT NULL, -- gal, litros
  tanque TEXT,
  color_dark TEXT,
  color_light TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Empleados
CREATE TABLE empleados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  dni TEXT UNIQUE NOT NULL,
  usuario TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  estacion_id UUID REFERENCES estaciones(id),
  rol TEXT DEFAULT 'trabajador', -- trabajador, admin
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabla de Horarios
CREATE TABLE horarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empleado_id UUID REFERENCES empleados(id) ON DELETE CASCADE,
  dia TEXT NOT NULL, -- Lun, Mar, Mié, Jue, Vie, Sáb, Dom
  libre BOOLEAN DEFAULT true,
  hora_inicio TIME,
  hora_fin TIME,
  UNIQUE(empleado_id, dia)
);

-- 5. Tabla de Máquinas
CREATE TABLE maquinas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  isla TEXT,
  mangueros INTEGER DEFAULT 4,
  estado TEXT DEFAULT 'Activa', -- Activa, Inactiva, Mantenimiento
  estacion_id UUID REFERENCES estaciones(id),
  producto_id UUID REFERENCES productos(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabla de Clientes
CREATE TABLE clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo_documento TEXT NOT NULL, -- RUC, DNI
  numero_documento TEXT NOT NULL,
  razon_social TEXT,
  direccion TEXT,
  telefono TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tipo_documento, numero_documento)
);

-- 7. Tabla de Turnos
CREATE TABLE turnos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empleado_id UUID REFERENCES empleados(id),
  estacion_id UUID REFERENCES estaciones(id),
  fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_fin TIMESTAMP WITH TIME ZONE,
  caja_inicial DECIMAL(10,2) DEFAULT 0,
  caja_final DECIMAL(10,2),
  varillado DECIMAL(10,2),
  estado TEXT DEFAULT 'abierta', -- abierta, cerrada
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Tabla de Ventas
CREATE TABLE ventas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  turno_id UUID REFERENCES turnos(id),
  empleado_id UUID REFERENCES empleados(id),
  estacion_id UUID REFERENCES estaciones(id),
  cliente_id UUID REFERENCES clientes(id),
  tipo_comprobante TEXT NOT NULL, -- Factura, Boleta
  serie TEXT, -- F001, B001
  correlativo TEXT,
  metodo_pago TEXT NOT NULL, -- efectivo, tarjeta, yape, transferencia, deposito
  subtotal DECIMAL(10,2) NOT NULL,
  igv DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  moneda TEXT DEFAULT 'PEN',
  estado TEXT DEFAULT 'completada', -- completada, anulada
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Tabla de Detalle de Ventas (Items)
CREATE TABLE venta_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  venta_id UUID REFERENCES ventas(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES productos(id),
  nombre TEXT NOT NULL,
  unidad TEXT NOT NULL,
  cantidad DECIMAL(10,3) NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Tabla de Gastos del Turno
CREATE TABLE gastos_turno (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  turno_id UUID REFERENCES turnos(id) ON DELETE CASCADE,
  descripcion TEXT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  categoria TEXT, -- combustible, mantenimiento, sueldos, otros
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Tabla de Precios (historial)
CREATE TABLE precios_historial (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  producto_id UUID REFERENCES productos(id),
  precio_anterior DECIMAL(10,2),
  precio_nuevo DECIMAL(10,2),
  cambiado_por UUID REFERENCES empleados(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- DATOS INICIALES
-- =============================================

INSERT INTO estaciones (nombre, ciudad) VALUES
  ('Grifo Kala Arequipa', 'Arequipa'),
  ('Grifo Kala Juliaca', 'Juliaca');

INSERT INTO productos (codigo, nombre, precio, unidad, tanque, color_dark, color_light) VALUES
  ('diesel', 'Diésel B5', 23.10, 'gal', 'D2#1', '#E8A33D', '#C4841D'),
  ('diesel4', 'Diésel D-B5', 23.10, 'gal', 'D2#3 / D2#4', '#D4A017', '#B8920F'),
  ('regular', 'Gasolina Regular', 19.90, 'gal', 'Regular', '#4FB0A6', '#2D8A7E'),
  ('urea', 'Urea 32', 2.50, 'litros', 'Urea', '#8CAE5E', '#5A8A2F');

INSERT INTO empleados (nombre, dni, usuario, estacion_id, rol) VALUES
  ('Milagros Condori', '48562190', 'mcondori', (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'), 'trabajador'),
  ('Edwin Mamani', '76901234', 'emamani', (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'), 'trabajador');

INSERT INTO horarios (empleado_id, dia, libre, hora_inicio, hora_fin)
SELECT e.id, d.dia,
  CASE WHEN d.dia IN ('Sáb', 'Dom') THEN true ELSE false END,
  CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '06:00'::TIME END,
  CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '14:00'::TIME END
FROM empleados e, (VALUES ('Lun'), ('Mar'), ('Mié'), ('Jue'), ('Vie'), ('Sáb'), ('Dom')) AS d(dia)
WHERE e.dni = '48562190';

INSERT INTO horarios (empleado_id, dia, libre, hora_inicio, hora_fin)
SELECT e.id, d.dia,
  CASE WHEN d.dia IN ('Sáb', 'Dom') THEN true ELSE false END,
  CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '14:00'::TIME END,
  CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '22:00'::TIME END
FROM empleados e, (VALUES ('Lun'), ('Mar'), ('Mié'), ('Jue'), ('Vie'), ('Sáb'), ('Dom')) AS d(dia)
WHERE e.dni = '76901234';

INSERT INTO maquinas (nombre, isla, mangueros, estado, estacion_id, producto_id) VALUES
  ('Máquina 1', 'Tanques D2#3 y D2#4', 4, 'Activa',
    (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'),
    (SELECT id FROM productos WHERE codigo = 'diesel4')),
  ('Máquina 2', 'Tanque Regular', 4, 'Activa',
    (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'),
    (SELECT id FROM productos WHERE codigo = 'regular')),
  ('Máquina 3', 'Tanque D2#1', 4, 'Activa',
    (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'),
    (SELECT id FROM productos WHERE codigo = 'diesel')),
  ('Máquina 4', 'Tanque Urea', 4, 'Activa',
    (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'),
    (SELECT id FROM productos WHERE codigo = 'urea')),
  ('Máquina 1', 'Tanque Regular', 4, 'Activa',
    (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Juliaca'),
    (SELECT id FROM productos WHERE codigo = 'regular'));

-- =============================================================================
-- 12-13. TABLAS DE SINCRONIZACIÓN ENTRE DISPOSITIVOS (varillado y cisternas)
-- =============================================================================
-- Estas dos tablas son independientes: se pueden ejecutar solas en cualquier
-- proyecto (viejo o nuevo) sin necesidad de las tablas 1-11.

-- 12. Historial de varillado (compartido trabajador <-> admin)
CREATE TABLE IF NOT EXISTS varillado_registros (
  id TEXT PRIMARY KEY,                  -- id generado en el navegador
  estacion TEXT,
  trabajador TEXT,
  fecha TEXT,                            -- 'dd/mm/aaaa' mostrado en la UI
  hora TEXT,                             -- 'HH:MM'
  mediciones JSONB DEFAULT '[]'::jsonb,  -- [{ nombre, cm }]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Vehículos y cisternas (ingresos y descargas de galones, consumo, viáticos)
-- Una fila por vehículo; los campos operativos viven en `datos` (jsonb):
--   { galonesConsumidos, galonesIngresados, viaticos, reposiciones, descargas: [...] }
CREATE TABLE IF NOT EXISTS vehiculos (
  id TEXT PRIMARY KEY,                  -- id generado en el navegador
  estacion TEXT,
  tipo TEXT DEFAULT 'cisterna',         -- cisterna | normal
  nombre TEXT,
  placa TEXT,
  datos JSONB DEFAULT '{}'::jsonb,
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar cambios en tiempo real (sincronización inmediata entre paneles)
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE varillado_registros;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE vehiculos;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
