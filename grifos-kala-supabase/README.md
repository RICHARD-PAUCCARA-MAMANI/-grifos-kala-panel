# 🚗 GRIFOS KALA - Panel de Operaciones

**Fecha de creación:** 03 de Septiembre del 2026  
**Versión:** 1.0 - Prueba Supabase + Vercel  
**Estado:** En desarrollo/prueba

---

## 📋 Descripción del Proyecto

Sistema integral de gestión para estaciones de servicio (grifos) de la empresa **GRIFOS KALA S.A.C.**  
Diseñado para gestionar ventas de combustible, empleados, máquinas, facturación electrónica y cierres de turno.

---

## 🔧 Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Frontend | React 18 (CDN) |
| CSS | Estilos en línea (inline styles) |
| Gráficos | Recharts 2.12.7 |
| Iconos | Lucide + SVG personalizados |
| Build | Babel Standalone |
| **Base de Datos** | **Supabase (PostgreSQL)** |
| **Hosting** | **Vercel** |
| APIs Externas | ApisPeru (facturación), Factiliza (DNI/RUC) |

---

## ✅ Funcionalidades Implementadas

### 1. 🔐 Autenticación
- Login de trabajadores y administradores
- Roles diferenciados con permisos distintos
- Selección de estación (Arequipa / Juliaca)
- Contraseña con toggle de visibilidad

### 2. 📊 Dashboard Administrador
- **KPIs en tiempo real:**
  - Ventas del día
  - Galones despachados
  - Facturas emitidas (con RUC)
  - Boletas emitidas (sin RUC)
- **Gráfico de ventas** por estación (últimos 7 días)
- **Edición de precios** vigentes en tiempo real

### 3. ⛽ Gestión de Productos
| Producto | Unidad | Precio |
|----------|--------|--------|
| Diésel B5 | gal | S/ 23.10 |
| Diésel D-B5 | gal | S/ 23.10 |
| Gasolina Regular | gal | S/ 19.90 |
| Urea 32 | litros | S/ 2.50 |

- Tablas de calibración matemáticas para tanques cilíndricos
- Cálculo de capacidad por nivel de cm

### 4. 📄 Facturación Electrónica
- **Tipos de comprobante:**
  - Factura (con RUC) - Serie F001
  - Boleta (sin RUC) - Serie B001
- **Integración con ApisPeru:**
  - Emisión de comprobantes electrónicos
  - Cálculo automático de IGV (18%)
- **Consulta de documentos:**
  - RUC vía API Factiliza
  - DNI vía API Factiliza

### 5. 👥 Gestión de Trabajadores
- Alta, edición y baja de empleados
- Horarios semanales personalizados
- Asignación por estación de servicio
- Datos: nombre, DNI, usuario, horario

**Ejemplo de trabajadores:**
- Milagros Condori (Turno: 06:00 - 14:00)
- Edwin Mamani (Turno: 14:00 - 22:00)

### 6. 🔧 Gestión de Máquinas y Mangueras
- **Máquinas registradas:**
  - Máquina 1: Tanques D2#3 y D2#4 (Diésel D-B5)
  - Máquina 2: Tanque Regular (Gasolina)
  - Máquina 3: Tanque D2#1 (Diésel B5)
  - Máquina 4: Tanque Urea
- 4 mangueras por máquina
- Estados: Activa / Inactiva
- Lecturas con cálculo automático de galones

### 7. 💰 Métodos de Pago
- Efectivo
- Tarjeta (crédito/débito)
- Yape
- Transferencia bancaria
- Depósito

### 8. 🖨️ Cierre de Turno
- Resumen de ventas virtuales y reales
- Registro de gastos del turno
- Control de caja inicial y final
- Varillado (medición de tanques)
- Exportación a PDF / Impresión

### 9. 🎨 Diseño UI/UX
- **Tema oscuro/claro** con toggle
- **Responsive:** móvil y escritorio
- **Iconos SVG** personalizados (30+ iconos)
- **Fuentes:**
  - Inter (textos generales)
  - Oswald (títulos y KPIs)
  - JetBrains Mono (números y códigos)

---

## 🏢 Datos de la Empresa

```
RUC: 20612345679
Razón Social: GRIFOS KALA S.A.C.
Nombre Comercial: GRIFOS KALA
Dirección: AV. INDUSTRIAL 1234
Distrito: Cercado de Arequipa
Provincia: Arequipa
Ciudad: Arequipa
Ubigeo: 040101
Teléfono: 054-123456
Email: ventas@grifoskala.com
```

---

## 🗺️ Estaciones de Servicio

1. **Grifo Kala Arequipa** - 4 máquinas
2. **Grifo Kala Juliaca** - 1 máquina

---

## 📁 Estructura de Archivos

```
grifos-kala-supabase/
├── index.html          # Archivo principal (React SPA)
└── README.md           # Esta documentación
```

---

## 🚀 Próximos Pasos (Supabase + Vercel)

1. ✅ Crear cuenta en Supabase
2. ✅ Configurar base de datos PostgreSQL
3. ✅ Crear esquema de tablas:
   - `productos` (id, nombre, precio, unidad, tanque)
   - `empleados` (id, nombre, dni, usuario, estacion, horario)
   - `ventas` (id, fecha, empleado_id, metodo_pago, total, items)
   - `turnos` (id, empleado_id, fecha_inicio, fecha_fin, caja)
   - `maquinas` (id, nombre, isla, estado, estacion, producto_id)
4. ✅ Conectar frontend con Supabase
5. ✅ Deploy en Vercel
6. ✅ Probar en producción

---

## 📝 Notas

- Los tokens de API (ApisPeru, Factiliza) están incluidos en el código para pruebas
- Los datos de ventas y empleados son de ejemplo
- El sistema está en fase de pruebas antes de producción

---

**Desarrollado con ❤️ para GRIFOS KALA S.A.C.**  
**Fecha:** 03 de Septiembre del 2026
