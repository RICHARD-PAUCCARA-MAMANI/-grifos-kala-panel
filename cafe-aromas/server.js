/* ============================================
   Café Aromas — Backend API con SQLite (sql.js)
   ============================================
   Ejecutar: node server.js
   Servidor: http://localhost:3000
   Admin:    admin / admin123
   ============================================ */

const express = require('express');
const initSqlJs = require('sql.js');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname), { index: false }));

// ===== sql.js Compatibility Wrapper =====
// Provides an API similar to better-sqlite3 so the rest of the code works unchanged
class DB {
  constructor(sqlDb) {
    this._db = sqlDb;
    this._stmts = new Map();
  }

  pragma(str) {
    this._db.run(`PRAGMA ${str}`);
  }

  exec(sql) {
    this._db.run(sql);
  }

  prepare(sql) {
    // Return a Statement-like object that lazily creates/reuses the sql.js statement
    const obj = {
      _getStmt: () => {
        if (!obj._stmt) {
          obj._stmt = this._db.prepare(sql);
        }
        return obj._stmt;
      },
      run: (...params) => {
        const s = obj._getStmt();
        s.reset();
        const bindParams = params.length > 0 ? (params.length === 1 && Array.isArray(params[0]) ? params[0] : params) : [];
        if (bindParams.length > 0) s.bind(bindParams);
        s.step();
        const lastId = Number(this._db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] || 0);
        return { lastInsertRowid: lastId };
      },
      get: (...params) => {
        const s = obj._getStmt();
        s.reset();
        const bindParams = params.length > 0 ? (params.length === 1 && Array.isArray(params[0]) ? params[0] : params) : [];
        if (bindParams.length > 0) s.bind(bindParams);
        let result;
        if (s.step()) {
          result = s.getAsObject();
        }
        return result;
      },
      all: (...params) => {
        const s = obj._getStmt();
        s.reset();
        const bindParams = params.length > 0 ? (params.length === 1 && Array.isArray(params[0]) ? params[0] : params) : [];
        if (bindParams.length > 0) s.bind(bindParams);
        const results = [];
        while (s.step()) {
          results.push(s.getAsObject());
        }
        return results;
      }
    };
    return obj;
  }

  transaction(fn) {
    return (...args) => {
      this._db.run('BEGIN');
      try {
        fn(...args);
        this._db.run('COMMIT');
      } catch (e) {
        this._db.run('ROLLBACK');
        throw e;
      }
    };
  }
}

// ===== DATABASE =====
const DB_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

let db;

async function initDatabase() {
  const SQL = await initSqlJs();
  const dbPath = path.join(DB_DIR, 'cafeteria.db');

  let buffer;
  try {
    buffer = fs.readFileSync(dbPath);
  } catch (e) {
    buffer = null;
  }

  const sqlDb = new SQL.Database(buffer);
  db = new DB(sqlDb);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // ===== SCHEMA =====
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'cafes',
      price REAL NOT NULL DEFAULT 0,
      stock INTEGER NOT NULL DEFAULT 99,
      emoji TEXT NOT NULL DEFAULT '☕',
      badge TEXT DEFAULT '',
      description TEXT DEFAULT '',
      createdAt TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS workers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user TEXT NOT NULL UNIQUE,
      pass TEXT NOT NULL,
      phone TEXT DEFAULT '',
      createdAt TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      num TEXT NOT NULL,
      workerId INTEGER,
      workerName TEXT NOT NULL DEFAULT '',
      subtotal REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      payment TEXT NOT NULL DEFAULT 'Efectivo',
      createdAt TEXT DEFAULT (datetime('now','localtime')),
      date TEXT DEFAULT (date('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS sale_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      saleId INTEGER NOT NULL,
      productId INTEGER,
      name TEXT NOT NULL,
      emoji TEXT DEFAULT '☕',
      price REAL NOT NULL DEFAULT 0,
      qty INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (saleId) REFERENCES sales(id) ON DELETE CASCADE
    );
  `);

  // ===== SEED DATA =====
  const productCount = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  if (productCount === 0) {
    const CATS = ['destacados','cafes','frios','tes','chocolate','reposteria','snacks','especiales','jugos','smoothies','paninis'];
    const DEF_PROD = [
      {name:'Cappuccino Clásico',cat:'destacados',p:12.00,e:'☕',b:'🔥',d:'Espresso con leche vaporizada y espuma cremosa'},
      {name:'Latte Caramel',cat:'destacados',p:14.50,e:'🥤',b:'🔥',d:'Latte con sirope de caramelo y crema batida'},
      {name:'Mocha Blanco',cat:'destacados',p:15.00,e:'🍫',b:'🔥',d:'Espresso con chocolate blanco y leche'},
      {name:'Affogato',cat:'destacados',p:13.00,e:'🍨',b:'✨',d:'Helado de vainilla con espresso caliente'},
      {name:'Espresso Simple',cat:'cafes',p:6.00,e:'☕',b:'✨',d:'Café espresso concentrado (30ml)'},
      {name:'Espresso Doble',cat:'cafes',p:8.00,e:'☕',d:'Doble shot de espresso (60ml)'},
      {name:'Americano',cat:'cafes',p:8.50,e:'☕',d:'Espresso con agua caliente'},
      {name:'Cappuccino',cat:'cafes',p:12.00,e:'☕',d:'Espresso, leche vaporizada y espuma'},
      {name:'Latte',cat:'cafes',p:12.50,e:'☕',d:'Espresso con leche vaporizada suave'},
      {name:'Mocha',cat:'cafes',p:14.00,e:'☕',d:'Espresso con chocolate y leche'},
      {name:'Macchiato',cat:'cafes',p:11.00,e:'☕',d:'Espresso con un toque de espuma'},
      {name:'Flat White',cat:'cafes',p:13.00,e:'☕',d:'Espresso doble con microespuma'},
      {name:'Café con Leche',cat:'cafes',p:9.00,e:'☕',d:'Café peruano tradicional con leche'},
      {name:'Cortado',cat:'cafes',p:8.00,e:'☕',d:'Espresso cortado con un poco de leche'},
      {name:'Iced Latte',cat:'frios',p:13.00,e:'🧊',d:'Latte frío con hielo'},
      {name:'Cold Brew',cat:'frios',p:14.00,e:'🧊',d:'Café de extracción fría 24h'},
      {name:'Frappé Caramel',cat:'frios',p:16.00,e:'🥤',b:'🔥',d:'Frappé de caramelo con crema'},
      {name:'Frappé Mocha',cat:'frios',p:16.00,e:'🥤',d:'Frappé de chocolate'},
      {name:'Matcha Latte Frío',cat:'frios',p:15.00,e:'🍵',d:'Matcha con leche fría'},
      {name:'Té Earl Grey',cat:'tes',p:7.00,e:'🍵',d:'Té negro aromatizado con bergamota'},
      {name:'Té Verde',cat:'tes',p:7.00,e:'🍵',d:'Té verde suave'},
      {name:'Té de Manzanilla',cat:'tes',p:6.50,e:'🌼',d:'Infusión de manzanilla'},
      {name:'Té Chai Latte',cat:'tes',p:12.00,e:'🍵',b:'🔥',d:'Té chai especiado'},
      {name:'Matcha Latte',cat:'tes',p:14.00,e:'🍵',d:'Matcha ceremonial con leche'},
      {name:'Chocolate Caliente',cat:'chocolate',p:10.00,e:'🍫',d:'Chocolate caliente cremoso'},
      {name:'Chocolate con Avellanas',cat:'chocolate',p:13.00,e:'🍫',d:'Chocolate con crema de avellanas'},
      {name:'Chocolate Blanco',cat:'chocolate',p:11.00,e:'🍫',d:'Chocolate blanco con vainilla'},
      {name:'Submarino',cat:'chocolate',p:12.00,e:'🍫',d:'Leche caliente con barra de chocolate'},
      {name:'Croissant Mantequilla',cat:'reposteria',p:8.00,e:'🥐',d:'Croissant artesanal'},
      {name:'Alfajor de Lucuma',cat:'reposteria',p:6.00,e:'🍪',d:'Alfajor con lucuma y dulce de leche'},
      {name:'Cheesecake Maracuyá',cat:'reposteria',p:14.00,e:'🍰',b:'🔥',d:'Cheesecake con coulis de maracuyá'},
      {name:'Brownie Chocolate',cat:'reposteria',p:9.00,e:'🍫',d:'Brownie húmedo con nueces'},
      {name:'Tarta de Manzana',cat:'reposteria',p:12.00,e:'🥧',d:'Tarta con canela y crumble'},
      {name:'Muffin Arándano',cat:'reposteria',p:7.00,e:'🧁',d:'Muffin esponjoso'},
      {name:'Macarons (3 unid)',cat:'reposteria',p:12.00,e:'🟣',d:'Macarons franceses surtidos'},
      {name:'Sándwich de Pollo',cat:'snacks',p:15.00,e:'🥪',b:'🔥',d:'Pan artesanal con pollo, lechuga y tomate'},
      {name:'Sándwich Vegetal',cat:'snacks',p:13.00,e:'🥪',d:'Pan integral con hummus'},
      {name:'Tostadas con Palta',cat:'snacks',p:11.00,e:'🥑',d:'Tostadas con palta y sal de maras'},
      {name:'Quiche de Espinaca',cat:'snacks',p:14.00,e:'🥧',d:'Quiche con queso de cabra'},
      {name:'Wrap de Jamón',cat:'snacks',p:12.00,e:'🌯',d:'Wrap con jamón, queso y vegetales'},
      {name:'Ensalada Caesar',cat:'snacks',p:16.00,e:'🥗',d:'Ensalada Caesar con pollo'},
      {name:'Café de Olla',cat:'especiales',p:13.00,e:'🏺',b:'🔥',d:'Café en olla de barro con canela'},
      {name:'Latte de Lavanda',cat:'especiales',p:15.00,e:'💜',d:'Latte infusionado con lavanda y miel'},
      {name:'Café Turco',cat:'especiales',p:14.00,e:'☕',d:'Café turco preparado en arena'},
      {name:'Matcha Bombón',cat:'especiales',p:16.00,e:'🟢',d:'Matcha con leche condensada'},
      {name:'Café Dalgona',cat:'especiales',p:15.00,e:'☕',d:'Café batido coreano'},
      {name:'Golden Latte',cat:'especiales',p:14.00,e:'🟡',d:'Leche dorada con cúrcuma'},
      {name:'Croissant Jamón Queso',cat:'snacks',p:14.00,e:'🥐',d:'Croissant relleno horneado'},
      {name:'Té Hibisco',cat:'tes',p:7.50,e:'🌺',d:'Infusión de hibisco'},
      {name:'Affogato Frío',cat:'frios',p:13.00,e:'🍨',d:'Helado con espresso frío'},
      // === Jugos Naturales ===
      {name:'Jugo de Naranja Natural',cat:'jugos',p:7.00,e:'🍊',d:'Naranja recién exprimida'},
      {name:'Jugo de Maracuyá',cat:'jugos',p:8.00,e:'🟡',d:'Maracuyá fresco con un toque de miel'},
      {name:'Jugo de Papaya',cat:'jugos',p:8.00,e:'🧡',d:'Papaya dulce natural'},
      {name:'Jugo de Fresa',cat:'jugos',p:9.00,e:'🍓',d:'Fresas frescas licuadas'},
      {name:'Jugo Verde Detox',cat:'jugos',p:10.00,e:'🥬',b:'🔥',d:'Manzana, apio, espinaca y jengibre'},
      {name:'Limonada Frozen',cat:'jugos',p:9.00,e:'🍋',d:'Limonada natural con hielo picado'},
      // === Smoothies ===
      {name:'Smoothie Fresa y Plátano',cat:'smoothies',p:14.00,e:'🍓',b:'🔥',d:'Fresa, plátano y yogurt natural'},
      {name:'Smoothie Mango y Maracuyá',cat:'smoothies',p:14.00,e:'🥭',d:'Mango, maracuyá y leche evaporada'},
      {name:'Smoothie de Arándanos',cat:'smoothies',p:15.00,e:'🫐',d:'Arándanos, yogurt y miel de abeja'},
      {name:'Smoothie Chocolate y Avellana',cat:'smoothies',p:16.00,e:'🍫',b:'🔥',d:'Chocolate belga, avellanas y leche'},
      {name:'Smoothie Tropical',cat:'smoothies',p:15.00,e:'🥥',d:'Piña, coco, mango y un toque de lima'},
      {name:'Smoothie Verde Energía',cat:'smoothies',p:14.00,e:'🟢',d:'Manzana verde, espinaca y jengibre'},
      // === Paninis & Sándwiches ===
      {name:'Panini de Pollo y Pesto',cat:'paninis',p:16.00,e:'🥪',b:'🔥',d:'Pollo grillé, pesto y mozzarella'},
      {name:'Panini Caprese',cat:'paninis',p:15.00,e:'🥪',d:'Mozzarella fresca, tomate y albahaca'},
      {name:'Panini Jamón Serrano',cat:'paninis',p:17.00,e:'🥪',b:'🔥',d:'Jamón serrano, queso manchego y rúcula'},
      {name:'Panini de Atún y Olivas',cat:'paninis',p:15.00,e:'🥪',d:'Atún, olivas negras y queso crema'},
      {name:'Panini Vegetariano',cat:'paninis',p:15.00,e:'🥪',d:'Champiñones, pimientos y queso de cabra'},
      {name:'Panini Pavo y Queso Suizo',cat:'paninis',p:16.00,e:'🥪',d:'Pavo ahumado, queso suizo y mostaza miel'},
      {name:'Sándwich Club',cat:'paninis',p:18.00,e:'🥪',b:'🔥',d:'Pollo, tocino crocante y lechuga'},
      {name:'Panini Salmón y Queso Crema',cat:'paninis',p:19.00,e:'🥪',b:'✨',d:'Salmón ahumado y queso crema con eneldo'}
    ];

    const insertProd = db.prepare('INSERT INTO products (name,category,price,stock,emoji,badge,description) VALUES (?,?,?,?,?,?,?)');
    const insertMany = db.transaction((prods) => {
      for (const p of prods) {
        insertProd.run(p.name, p.cat, p.p, 99, p.e||'☕', p.b||'', p.d||'');
      }
    });
    insertMany(DEF_PROD);

    // Seed workers
    const adminHash = bcrypt.hashSync('admin123', 10);
    const workerHash = bcrypt.hashSync('1234', 10);
    const insertWorker = db.prepare('INSERT INTO workers (name,user,pass,phone) VALUES (?,?,?,?)');
    insertWorker.run('Administrador', 'admin', adminHash, '');
    insertWorker.run('Barista Principal', 'cajero', workerHash, '999 000 111');
    insertWorker.run('Barista Jr', 'barista', workerHash, '999 000 222');

    console.log('✅ Datos semilla cargados (70 productos, 3 trabajadores)');
  }

  // ===== MIGRATE: Add new product categories if DB already seeded =====
  const updatedCount = db.prepare("SELECT COUNT(*) as c FROM products WHERE category IN ('jugos','smoothies','paninis')").get().c;
  if (updatedCount === 0 && productCount > 0) {
    const NEW_PROD = [
      {name:'Jugo de Naranja Natural',cat:'jugos',p:7.00,e:'🍊',d:'Naranja recién exprimida'},
      {name:'Jugo de Maracuyá',cat:'jugos',p:8.00,e:'🟡',d:'Maracuyá fresco con un toque de miel'},
      {name:'Jugo de Papaya',cat:'jugos',p:8.00,e:'🧡',d:'Papaya dulce natural'},
      {name:'Jugo de Fresa',cat:'jugos',p:9.00,e:'🍓',d:'Fresas frescas licuadas'},
      {name:'Jugo Verde Detox',cat:'jugos',p:10.00,e:'🥬',b:'🔥',d:'Manzana, apio, espinaca y jengibre'},
      {name:'Limonada Frozen',cat:'jugos',p:9.00,e:'🍋',d:'Limonada natural con hielo picado'},
      {name:'Smoothie Fresa y Plátano',cat:'smoothies',p:14.00,e:'🍓',b:'🔥',d:'Fresa, plátano y yogurt natural'},
      {name:'Smoothie Mango y Maracuyá',cat:'smoothies',p:14.00,e:'🥭',d:'Mango, maracuyá y leche evaporada'},
      {name:'Smoothie de Arándanos',cat:'smoothies',p:15.00,e:'🫐',d:'Arándanos, yogurt y miel de abeja'},
      {name:'Smoothie Chocolate y Avellana',cat:'smoothies',p:16.00,e:'🍫',b:'🔥',d:'Chocolate belga, avellanas y leche'},
      {name:'Smoothie Tropical',cat:'smoothies',p:15.00,e:'🥥',d:'Piña, coco, mango y un toque de lima'},
      {name:'Smoothie Verde Energía',cat:'smoothies',p:14.00,e:'🟢',d:'Manzana verde, espinaca y jengibre'},
      {name:'Panini de Pollo y Pesto',cat:'paninis',p:16.00,e:'🥪',b:'🔥',d:'Pollo grillé, pesto y mozzarella'},
      {name:'Panini Caprese',cat:'paninis',p:15.00,e:'🥪',d:'Mozzarella fresca, tomate y albahaca'},
      {name:'Panini Jamón Serrano',cat:'paninis',p:17.00,e:'🥪',b:'🔥',d:'Jamón serrano, queso manchego y rúcula'},
      {name:'Panini de Atún y Olivas',cat:'paninis',p:15.00,e:'🥪',d:'Atún, olivas negras y queso crema'},
      {name:'Panini Vegetariano',cat:'paninis',p:15.00,e:'🥪',d:'Champiñones, pimientos y queso de cabra'},
      {name:'Panini Pavo y Queso Suizo',cat:'paninis',p:16.00,e:'🥪',d:'Pavo ahumado, queso suizo y mostaza miel'},
      {name:'Sándwich Club',cat:'paninis',p:18.00,e:'🥪',b:'🔥',d:'Pollo, tocino crocante y lechuga'},
      {name:'Panini Salmón y Queso Crema',cat:'paninis',p:19.00,e:'🥪',b:'✨',d:'Salmón ahumado y queso crema con eneldo'}
    ];
    const migProd = db.prepare('INSERT OR IGNORE INTO products (name,category,price,stock,emoji,badge,description) VALUES (?,?,?,?,?,?,?)');
    const migMany = db.transaction((prods) => {
      for (const p of prods) {
        migProd.run(p.name, p.cat, p.p, 99, p.e||'☕', p.b||'', p.d||'');
      }
    });
    migMany(NEW_PROD);
    console.log('✅ Migración: 20 nuevos productos agregados (jugos, smoothies, paninis)');
  }

  // Save DB to disk after seeding/migration
  saveDatabase();
}

function saveDatabase() {
  try {
    const data = db._db.export();
    const buffer = Buffer.from(data);
    const dbPath = path.join(DB_DIR, 'cafeteria.db');
    fs.writeFileSync(dbPath, buffer);
  } catch (e) {
    console.error('Error saving database:', e.message);
  }
}

// ===== HELPERS =====
function genSaleNum() {
  const last = db.prepare("SELECT num FROM sales ORDER BY id DESC LIMIT 1").get();
  const n = last ? parseInt(last.num.replace('#CA-','')) + 1 : 1;
  return '#CA-' + String(n).padStart(4,'0');
}

// ===== AUTH =====
app.post('/api/auth/login', (req, res) => {
  try {
    const { user, pass, role } = req.body;
    if (!user || !pass) return res.status(400).json({ error: 'Usuario y contraseña requeridos' });

    if (role === 'admin') {
      const adminRecord = db.prepare('SELECT pass FROM workers WHERE user=?').get('admin');
      if (user === 'admin' && adminRecord && bcrypt.compareSync(pass, adminRecord.pass)) {
        return res.json({ success: true, user: { role: 'admin', name: 'Administrador', id: null } });
      }
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const worker = db.prepare('SELECT id,name,user FROM workers WHERE user=? AND user!=?').get(user, 'admin');
    if (!worker) return res.status(401).json({ error: 'Credenciales inválidas' });

    const dbPass = db.prepare('SELECT pass FROM workers WHERE id=?').get(worker.id).pass;
    if (!bcrypt.compareSync(pass, dbPass)) return res.status(401).json({ error: 'Credenciales inválidas' });

    res.json({ success: true, user: { role: 'worker', name: worker.name, id: worker.id } });
  } catch(e) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// ===== PRODUCTS =====
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY id').all();
  res.json(products);
});

app.post('/api/products', (req, res) => {
  try {
    const { name, category, price, stock, emoji, badge, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Nombre y precio requeridos' });
    const result = db.prepare('INSERT INTO products (name,category,price,stock,emoji,badge,description) VALUES (?,?,?,?,?,?,?)')
      .run(name, category||'cafes', price, stock||99, emoji||'☕', badge||'', description||'');
    saveDatabase();
    res.json({ success: true, id: result.lastInsertRowid, message: 'Producto agregado' });
  } catch(e) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const { name, category, price, stock, emoji, badge, description } = req.body;
    const p = db.prepare('SELECT * FROM products WHERE id=?').get(req.params.id);
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
    db.prepare('UPDATE products SET name=?,category=?,price=?,stock=?,emoji=?,badge=?,description=? WHERE id=?')
      .run(name||p.name, category||p.category, price??p.price, stock??p.stock, emoji||p.emoji, badge||p.badge, description??p.description, req.params.id);
    saveDatabase();
    res.json({ success: true, message: 'Producto actualizado' });
  } catch(e) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const p = db.prepare('SELECT * FROM products WHERE id=?').get(req.params.id);
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
    db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
    saveDatabase();
    res.json({ success: true, message: 'Producto eliminado' });
  } catch(e) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// ===== WORKERS =====
app.get('/api/workers', (req, res) => {
  const workers = db.prepare('SELECT id,name,user,phone FROM workers WHERE id != 1 ORDER BY id').all();
  res.json(workers);
});

app.post('/api/workers', (req, res) => {
  try {
    const { name, user, pass, phone } = req.body;
    if (!name || !user) return res.status(400).json({ error: 'Nombre y usuario requeridos' });
    if (!pass || pass.length < 4) return res.status(400).json({ error: 'Contraseña mínimo 4 caracteres' });
    const exist = db.prepare('SELECT id FROM workers WHERE user=?').get(user);
    if (exist) return res.status(400).json({ error: 'Usuario ya existe' });
    const hash = bcrypt.hashSync(pass, 10);
    const result = db.prepare('INSERT INTO workers (name,user,pass,phone) VALUES (?,?,?,?)').run(name, user, hash, phone||'');
    saveDatabase();
    res.json({ success: true, id: result.lastInsertRowid, message: 'Trabajador registrado' });
  } catch(e) {
    res.status(500).json({ error: 'Error al crear trabajador' });
  }
});

app.put('/api/workers/:id', (req, res) => {
  try {
    const { name, user, pass, phone } = req.body;
    const w = db.prepare('SELECT * FROM workers WHERE id=?').get(req.params.id);
    if (!w) return res.status(404).json({ error: 'Trabajador no encontrado' });
    if (pass && pass.length < 4) return res.status(400).json({ error: 'Contraseña mínimo 4 caracteres' });
    if (pass) {
      const hash = bcrypt.hashSync(pass, 10);
      db.prepare('UPDATE workers SET name=?,user=?,pass=?,phone=? WHERE id=?').run(name||w.name, user||w.user, hash, phone??w.phone, req.params.id);
    } else {
      db.prepare('UPDATE workers SET name=?,user=?,phone=? WHERE id=?').run(name||w.name, user||w.user, phone??w.phone, req.params.id);
    }
    saveDatabase();
    res.json({ success: true, message: 'Trabajador actualizado' });
  } catch(e) {
    res.status(500).json({ error: 'Error al actualizar trabajador' });
  }
});

app.delete('/api/workers/:id', (req, res) => {
  try {
    if (req.params.id === '1') return res.status(400).json({ error: 'No puedes eliminar al administrador' });
    const w = db.prepare('SELECT * FROM workers WHERE id=?').get(req.params.id);
    if (!w) return res.status(404).json({ error: 'Trabajador no encontrado' });
    db.prepare('DELETE FROM workers WHERE id=?').run(req.params.id);
    saveDatabase();
    res.json({ success: true, message: 'Trabajador eliminado' });
  } catch(e) {
    res.status(500).json({ error: 'Error al eliminar trabajador' });
  }
});

// ===== SALES =====
app.get('/api/sales', (req, res) => {
  const sales = db.prepare('SELECT * FROM sales ORDER BY id DESC').all();
  let items = [];
  if (sales.length) {
    const placeholders = sales.map(()=>'?').join(',');
    items = db.prepare(`SELECT * FROM sale_items WHERE saleId IN (${placeholders})`).all(...sales.map(s=>s.id));
  }
  const itemsBySale = {};
  items.forEach(i => { if (!itemsBySale[i.saleId]) itemsBySale[i.saleId] = []; itemsBySale[i.saleId].push(i); });
  sales.forEach(s => s.items = itemsBySale[s.id] || []);
  res.json(sales);
});

app.post('/api/sales', (req, res) => {
  try {
    const { workerId, workerName, items, payment } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'Venta sin productos' });

    const subtotal = items.reduce((s,i) => s + (i.price || 0) * (i.qty || 0), 0);
    const total = subtotal;
    const num = genSaleNum();

    const result = db.prepare('INSERT INTO sales (num,workerId,workerName,subtotal,total,payment) VALUES (?,?,?,?,?,?)')
      .run(num, workerId||null, workerName||'', subtotal, total, payment||'Efectivo');
    const saleId = result.lastInsertRowid;

    const insertItem = db.prepare('INSERT INTO sale_items (saleId,productId,name,emoji,price,qty) VALUES (?,?,?,?,?,?)');
    const insertItems = db.transaction((items) => {
      for (const i of items) {
        insertItem.run(saleId, i.id||null, i.name||'', i.emoji||'☕', i.price||0, i.qty||1);
      }
    });
    insertItems(items);

    // Decrement stock
    const updateStock = db.prepare('UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?');
    const decStock = db.transaction((items) => {
      for (const i of items) {
        if (i.id) updateStock.run(i.qty||1, i.id);
      }
    });
    decStock(items);

    saveDatabase();
    res.json({ success: true, id: saleId, num, message: 'Venta registrada' });
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar venta' });
  }
});

// ===== DASHBOARD =====
app.get('/api/dashboard', (req, res) => {
  const period = req.query.period || 'day';
  let dateFilter = '';

  if (period === 'day') {
    dateFilter = "AND s.createdAt >= datetime('now','-1 day')";
  } else if (period === 'week') {
    dateFilter = "AND s.createdAt >= datetime('now','-7 days')";
  } else if (period === 'month') {
    dateFilter = "AND s.createdAt >= datetime('now','-30 days')";
  } else if (period === 'custom') {
    const from = req.query.from ? `'${req.query.from}'` : "'1970-01-01'";
    const to = req.query.to ? `'${req.query.to}'` : "datetime('now')";
    dateFilter = `AND s.date >= ${from} AND s.date <= ${to}`;
  }

  const totalSales = db.prepare(`SELECT COUNT(*) as c, COALESCE(SUM(total),0) as t FROM sales s WHERE 1=1 ${dateFilter}`).get();
  const productCount = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  const workerCount = db.prepare('SELECT COUNT(*) as c FROM workers WHERE id != 1').get().c;
  const lowStock = db.prepare('SELECT COUNT(*) as c FROM products WHERE stock > 0 AND stock <= 5').get().c;
  const outStock = db.prepare('SELECT COUNT(*) as c FROM products WHERE stock <= 0').get().c;

  // Payment methods distribution
  const payments = db.prepare(`SELECT payment, COALESCE(SUM(total),0) as total FROM sales s WHERE 1=1 ${dateFilter} GROUP BY payment`).all();

  // Recent sales
  const recentSales = db.prepare(`SELECT * FROM sales s WHERE 1=1 ${dateFilter} ORDER BY id DESC LIMIT 12`).all();
  const recentIds = recentSales.map(s=>s.id);
  let recentItems = [];
  if (recentIds.length) {
    const placeholders = recentIds.map(()=>'?').join(',');
    recentItems = db.prepare(`SELECT * FROM sale_items WHERE saleId IN (${placeholders})`).all(...recentIds);
  }
  const itemsMap = {};
  recentItems.forEach(i => { if (!itemsMap[i.saleId]) itemsMap[i.saleId] = []; itemsMap[i.saleId].push(i); });
  recentSales.forEach(s => s.items = itemsMap[s.id] || []);

  // Worker performance
  const workerPerf = db.prepare(`SELECT w.id, w.name, COUNT(s.id) as sales_count, COALESCE(SUM(s.total),0) as total_amount FROM workers w LEFT JOIN sales s ON w.id = s.workerId AND s.createdAt >= datetime('now','-30 days') WHERE w.id != 1 GROUP BY w.id ORDER BY total_amount DESC`).all();

  res.json({
    stats: {
      totalRevenue: totalSales.t || 0,
      orderCount: totalSales.c || 0,
      productCount,
      workerCount,
      lowStock,
      outStock
    },
    payments,
    recentSales,
    workerPerf
  });
});

// ===== ADMIN STATS (all time) =====
app.get('/api/sales/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c, COALESCE(SUM(total),0) as t FROM sales').get();
  const topProducts = db.prepare(`SELECT si.name, si.emoji, SUM(si.qty) as qty, SUM(si.price * si.qty) as total FROM sale_items si GROUP BY si.name ORDER BY total DESC LIMIT 5`).all();
  res.json({ totalSales: total.c, totalRevenue: total.t, topProducts });
});

// ===== SERVE INDEX =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cafeteria.html'));
});

// ===== START =====
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log('');
      console.log('╔══════════════════════════════════════════╗');
      console.log('║     ☕ Café Aromas — Backend API         ║');
      console.log('╠══════════════════════════════════════════╣');
      console.log(`║  URL:      http://localhost:${PORT}        ║`);
      console.log(`║  API:      http://localhost:${PORT}/api    ║`);
      console.log(`║  Admin:    admin / admin123               ║`);
      console.log(`║  Workers:  cajero / 1234, barista / 1234  ║`);
      console.log('╚══════════════════════════════════════════╝');
      console.log('');
    });
  } catch (e) {
    console.error('Failed to start server:', e);
    process.exit(1);
  }
}

startServer();
