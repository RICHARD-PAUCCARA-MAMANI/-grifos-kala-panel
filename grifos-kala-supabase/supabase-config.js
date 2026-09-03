/**
 * =============================================
 * GRIFOS KALA - Supabase Configuration
 * Fecha: 03 de Septiembre del 2026
 * =============================================
 * 
 * Este archivo contiene la configuración de conexión a Supabase.
 * 
 * INSTRUCCIONES:
 * 1. Reemplaza SUPABASE_URL con tu URL de Supabase
 * 2. Reemplaza SUPABASE_ANON_KEY con tu clave anónima
 * 
 * Obtener credenciales:
 * - Ve a https://app.supabase.com
 * - Selecciona tu proyecto
 * - Ve a Settings → API
 * - Copia "Project URL" y "anon public" key
 */

const SUPABASE_CONFIG = {
  // Reemplaza con tu URL de Supabase (ejemplo: https://xyzcompany.supabase.co)
  url: 'YOUR_SUPABASE_URL',
  
  // Reemplaza con tu clave anónima de Supabase
  anonKey: 'YOUR_SUPABASE_ANON_KEY',
};

// =============================================
// TABLAS DE SUPABASE PARA GRIFOS KALA
// =============================================
/*
  Ejecuta este SQL en el SQL Editor de Supabase para crear las tablas:

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
    password_hash TEXT, -- Para autenticación futura
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

  -- Insertar estaciones
  INSERT INTO estaciones (nombre, ciudad) VALUES 
    ('Grifo Kala Arequipa', 'Arequipa'),
    ('Grifo Kala Juliaca', 'Juliaca');

  -- Insertar productos
  INSERT INTO productos (codigo, nombre, precio, unidad, tanque, color_dark, color_light) VALUES 
    ('diesel', 'Diésel B5', 23.10, 'gal', 'D2#1', '#E8A33D', '#C4841D'),
    ('diesel4', 'Diésel D-B5', 23.10, 'gal', 'D2#3 / D2#4', '#D4A017', '#B8920F'),
    ('regular', 'Gasolina Regular', 19.90, 'gal', 'Regular', '#4FB0A6', '#2D8A7E'),
    ('urea', 'Urea 32', 2.50, 'litros', 'Urea', '#8CAE5E', '#5A8A2F');

  -- Insertar empleados de ejemplo
  INSERT INTO empleados (nombre, dni, usuario, estacion_id, rol) VALUES 
    ('Milagros Condori', '48562190', 'mcondori', (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'), 'trabajador'),
    ('Edwin Mamani', '76901234', 'emamani', (SELECT id FROM estaciones WHERE nombre = 'Grifo Kala Arequipa'), 'trabajador');

  -- Insertar horarios para Milagros
  INSERT INTO horarios (empleado_id, dia, libre, hora_inicio, hora_fin) 
  SELECT e.id, d.dia, 
    CASE WHEN d.dia IN ('Sáb', 'Dom') THEN true ELSE false END,
    CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '06:00'::TIME END,
    CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '14:00'::TIME END
  FROM empleados e, (VALUES ('Lun'), ('Mar'), ('Mié'), ('Jue'), ('Vie'), ('Sáb'), ('Dom')) AS d(dia)
  WHERE e.dni = '48562190';

  -- Insertar horarios para Edwin
  INSERT INTO horarios (empleado_id, dia, libre, hora_inicio, hora_fin) 
  SELECT e.id, d.dia, 
    CASE WHEN d.dia IN ('Sáb', 'Dom') THEN true ELSE false END,
    CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '14:00'::TIME END,
    CASE WHEN d.dia NOT IN ('Sáb', 'Dom') THEN '22:00'::TIME END
  FROM empleados e, (VALUES ('Lun'), ('Mar'), ('Mié'), ('Jue'), ('Vie'), ('Sáb'), ('Dom')) AS d(dia)
  WHERE e.dni = '76901234';

  -- Insertar máquinas
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
*/
