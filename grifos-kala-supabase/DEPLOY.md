# 🚀 Guía de Despliegue - Grifos Kala

**Fecha:** 03 de Septiembre del 2026

---

## Opción 1: Despliegue Manual en Vercel (Recomendado)

### Paso 1: Preparar el repositorio
```bash
cd grifos-kala-supabase
git init
git add .
git commit -m "Initial commit"
```

### Paso 2: Subir a GitHub
1. Crea un nuevo repositorio en GitHub
2. Sube los archivos:
```bash
git remote add origin https://github.com/TU_USUARIO/grifos-kala-supabase.git
git push -u origin main
```

### Paso 3: Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "Add New..." → "Project"
4. Selecciona tu repositorio `grifos-kala-supabase`
5. Configuración:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** (dejar vacío)
   - **Output Directory:** ./
6. Haz clic en "Deploy"

### Paso 4: Configurar Dominio (Opcional)
1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado

---

## Opción 2: Despliegue con Vercel CLI

### Instalar Vercel CLI
```bash
npm install -g vercel
```

### Desplegar
```bash
cd grifos-kala-supabase
vercel login
vercel
```

---

## 🔧 Configurar Supabase

### Paso 1: Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Regístrate con GitHub
3. Crea un nuevo proyecto

### Paso 2: Obtener credenciales
1. Ve a tu proyecto en Supabase
2. Settings → API
3. Copia:
   - **Project URL** (ejemplo: `https://xyzcompany.supabase.co`)
   - **anon public key**

### Paso 3: Configurar en el código
Abre `index.html` y reemplaza:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Tu URL aquí
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Tu clave aquí
```

### Paso 4: Crear tablas en Supabase
1. Ve a tu proyecto en Supabase
2. SQL Editor
3. Copia y pega el SQL de `supabase-config.js`
4. Haz clic en "Run"

---

## 📋 Variables de Entorno (Opcional)

Si usas Vercel, puedes configurar variables de entorno:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - `SUPABASE_URL` = tu URL de Supabase
   - `SUPABASE_ANON_KEY` = tu clave anónima

---

## ✅ Verificación

### Probar locally
```bash
cd grifos-kala-supabase
npx serve .
# Abre http://localhost:3000
```

### Probar en producción
1. Ve a tu URL de Vercel (ejemplo: `https://grifos-kala.vercel.app`)
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores de conexión a Supabase

---

## 🔍 Solución de Problemas

### Error: "Supabase no configurado"
- Verifica que hayas reemplazado `YOUR_SUPABASE_URL` y `YOUR_SUPABASE_ANON_KEY`
- Asegúrate de que no haya espacios extra

### Error: "Failed to fetch"
- Verifica tu conexión a internet
- Revisa que la URL de Supabase sea correcta
- Verifica que las tablas existan en Supabase

### Error: "Permission denied"
- Verifica que las políticas RLS de Supabase estén configuradas
- Para pruebas, puedes desactivar RLS temporalmente

---

## 📞 Soporte

Si tienes problemas, verifica:
1. [Documentación de Supabase](https://supabase.com/docs)
2. [Documentación de Vercel](https://vercel.com/docs)
3. Consola del navegador para errores

---

**GRIFOS KALA S.A.C.**  
Fecha: 03 de Septiembre del 2026
