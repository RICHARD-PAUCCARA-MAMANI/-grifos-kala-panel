// ===== DEFAULT PRODUCTS (fallback cuando no hay datos guardados) =====
const DEFAULT_PRODUCTS = [
  // Frutas y Verduras
  { id: 1, name: 'Manzana Roja x kg', category: 'frutas', price: 6.50, emoji: '🍎', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', desc: 'Manzanas rojas frescas, dulces y crujientes. Perfectas para jugos o consumo directo.', badge: 'Oferta', stock: 99 },
  { id: 2, name: 'Plátano de Seda x kg', category: 'frutas', price: 4.20, emoji: '🍌', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b7e3?w=400&h=400&fit=crop', desc: 'Plátanos dulces y suaves, ideales para postres o desayunos.', stock: 99 },
  { id: 3, name: 'Papaya x kg', category: 'frutas', price: 5.00, emoji: '🍈', imageUrl: 'https://images.unsplash.com/photo-1547481358-1002933f7d14?w=400&h=400&fit=crop', desc: 'Papaya jugosa y dulce, rica en vitamina C.', badge: 'Nuevo', stock: 30 },
  { id: 4, name: 'Fresas x 500g', category: 'frutas', price: 7.50, emoji: '🍓', imageUrl: 'https://images.unsplash.com/photo-1563856917-0d32f50d18bc?w=400&h=400&fit=crop', desc: 'Fresas frescas importadas, perfectas para postres y jugos.', stock: 40 },
  { id: 5, name: 'Limón x kg', category: 'frutas', price: 3.80, emoji: '🍋', imageUrl: 'https://images.unsplash.com/photo-1555948657-3e6396489437?w=400&h=400&fit=crop', desc: 'Limones frescos, ideales para ceviche y bebidas.', stock: 80 },
  { id: 6, name: 'Cebolla Roja x kg', category: 'frutas', price: 3.20, emoji: '🧅', imageUrl: 'https://images.unsplash.com/photo-1518977807-062e74360e22?w=400&h=400&fit=crop', desc: 'Cebolla roja nacional, ideal para ensaladas y guisos.', stock: 60 },
  { id: 7, name: 'Papa Amarilla x kg', category: 'frutas', price: 4.00, emoji: '🥔', imageUrl: 'https://images.unsplash.com/photo-1518977604-032223019882?w=400&h=400&fit=crop', desc: 'Papa amarilla peruana, perfecta para puré y sopas.', stock: 0 },
  { id: 8, name: 'Tomate Italiano x kg', category: 'frutas', price: 4.50, emoji: '🍅', imageUrl: 'https://images.unsplash.com/photo-1546135934-641676edb964?w=400&h=400&fit=crop', desc: 'Tomates frescos y carnosos, ideales para salsas y ensaladas.', stock: 50 },
  { id: 9, name: 'Aguacate x unidad', category: 'frutas', price: 3.00, emoji: '🥑', imageUrl: 'https://images.unsplash.com/photo-1523049673-0498eb75249f?w=400&h=400&fit=crop', desc: 'Aguacates maduros y cremosos.', badge: 'Oferta', stock: 25 },
  // Lácteos
  { id: 10, name: 'Leche Fresca x 1L', category: 'lacteos', price: 5.50, emoji: '🥛', imageUrl: 'https://images.unsplash.com/photo-1550583162-a25e2e4b3e83?w=400&h=400&fit=crop', desc: 'Leche fresca pasteurizada, cremosa y nutritiva.', stock: 99 },
  { id: 11, name: 'Yogurt Natural x 1L', category: 'lacteos', price: 7.00, emoji: '🫗', imageUrl: 'https://images.unsplash.com/photo-1514365850-c65a4c9c2420?w=400&h=400&fit=crop', desc: 'Yogurt natural sin azúcar, ideal para desayunos saludables.', stock: 45 },
  { id: 12, name: 'Queso Fresco x 250g', category: 'lacteos', price: 6.00, emoji: '🧀', imageUrl: 'https://images.unsplash.com/photo-1627588365-1d044009761e?w=400&h=400&fit=crop', desc: 'Queso fresco artesanal, suave y delicioso.', stock: 30 },
  { id: 13, name: 'Mantequilla x 200g', category: 'lacteos', price: 8.50, emoji: '🧈', imageUrl: 'https://images.unsplash.com/photo-1589464010-826d9c6722ea?w=400&h=400&fit=crop', desc: 'Mantequilla cremosa, ideal para untar y hornear.', stock: 40 },
  { id: 14, name: 'Huevos de Granja x 30', category: 'lacteos', price: 14.00, emoji: '🥚', imageUrl: 'https://images.unsplash.com/photo-1506976446-c672d547f872?w=400&h=400&fit=crop', desc: 'Huevos frescos de granja, ricos en proteínas.', badge: 'Oferta', stock: 60 },
  { id: 15, name: 'Crema de Leche x 200ml', category: 'lacteos', price: 6.50, emoji: '🥛', imageUrl: 'https://images.unsplash.com/photo-1530639902-120023ee45c7?w=400&h=400&fit=crop', desc: 'Crema de leche espesa, ideal para cocina y postres.', stock: 35 },
  // Panadería
  { id: 16, name: 'Pan Molde Integral x 500g', category: 'panaderia', price: 7.50, emoji: '🍞', imageUrl: 'https://images.unsplash.com/photo-1509440599-e65922e3792c?w=400&h=400&fit=crop', desc: 'Pan integral suave y nutritivo, rico en fibra.', stock: 50 },
  { id: 17, name: 'Pan Francés x unidad', category: 'panaderia', price: 1.50, emoji: '🥖', imageUrl: 'https://images.unsplash.com/photo-1507491761-0089f2a2f768?w=400&h=400&fit=crop', desc: 'Pan francés crujiente, horneado diariamente.', stock: 0 },
  { id: 18, name: 'Tortillas de Harina x 6', category: 'panaderia', price: 5.00, emoji: '🫓', imageUrl: 'https://images.unsplash.com/photo-1574484632719-e1a4c3f7a5c5?w=400&h=400&fit=crop', desc: 'Tortillas suaves, perfectas para wraps y tacos.', stock: 30 },
  { id: 19, name: 'Galletas de Avena x 200g', category: 'panaderia', price: 6.00, emoji: '🍪', imageUrl: 'https://images.unsplash.com/photo-1558961363-f2dc8c163766?w=400&h=400&fit=crop', desc: 'Galletas caseras de avena con pasas.', stock: 0 },
  // Bebidas
  { id: 20, name: 'Agua Mineral x 1.5L', category: 'bebidas', price: 3.00, emoji: '💧', imageUrl: 'https://images.unsplash.com/photo-1520677097-36e788c1c4e7?w=400&h=400&fit=crop', desc: 'Agua mineral natural, hidratación pura.', stock: 99 },
  { id: 21, name: 'Gaseosa Cola x 2L', category: 'bebidas', price: 7.00, emoji: '🥤', imageUrl: 'https://images.unsplash.com/photo-1554907976-5834927ed14b?w=400&h=400&fit=crop', desc: 'Gaseosa cola para compartir en familia.', stock: 99 },
  { id: 22, name: 'Jugo de Naranja x 1L', category: 'bebidas', price: 8.00, emoji: '🍊', imageUrl: 'https://images.unsplash.com/photo-1561956692-487c66914ed0?w=400&h=400&fit=crop', desc: 'Jugo de naranja natural, sin azúcar añadida.', badge: 'Nuevo', stock: 20 },
  { id: 23, name: 'Cerveza Artesanal x 330ml', category: 'bebidas', price: 12.00, emoji: '🍺', imageUrl: 'https://images.unsplash.com/photo-1535955639-6dd19d722bf3?w=400&h=400&fit=crop', desc: 'Cerveza artesanal local, sabor único.', stock: 25 },
  { id: 24, name: 'Inca Kola x 2L', category: 'bebidas', price: 7.50, emoji: '🥤', imageUrl: 'https://images.unsplash.com/photo-1543253687-c931c8e01855?w=400&h=400&fit=crop', desc: 'La gaseosa peruana más tradicional.', stock: 80 },
  { id: 25, name: 'Café Molido x 250g', category: 'bebidas', price: 15.00, emoji: '☕', imageUrl: 'https://images.unsplash.com/photo-1495474472235-51543232c96c?w=400&h=400&fit=crop', desc: 'Café peruano de altura, molido y aromático.', badge: 'Oferta', stock: 15 },
  // Despensa
  { id: 26, name: 'Arroz Extra x 5kg', category: 'despensa', price: 18.50, emoji: '🍚', imageUrl: 'https://images.unsplash.com/photo-1586281825-1e35a82dc437?w=400&h=400&fit=crop', desc: 'Arroz extra premium, el mejor para tu mesa.', badge: 'Oferta', stock: 99 },
  { id: 27, name: 'Fideos Spaghetti x 500g', category: 'despensa', price: 4.00, emoji: '🍝', imageUrl: 'https://images.unsplash.com/photo-1561276566-51d6c307ecd5?w=400&h=400&fit=crop', desc: 'Fideos de pasta dura, cocción perfecta.', stock: 99 },
  { id: 28, name: 'Aceite Vegetal x 1L', category: 'despensa', price: 9.00, emoji: '🫒', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', desc: 'Aceite vegetal puro, ideal para cocinar.', stock: 70 },
  { id: 29, name: 'Azúcar Blanca x 2kg', category: 'despensa', price: 7.00, emoji: '🍬', imageUrl: 'https://images.unsplash.com/photo-1580234795-5853fdeef2e9?w=400&h=400&fit=crop', desc: 'Azúcar blanca refinada, endulza tus comidas.', stock: 60 },
  { id: 30, name: 'Sal de Mesa x 500g', category: 'despensa', price: 2.00, emoji: '🧂', imageUrl: 'https://images.unsplash.com/photo-1474222175044-ed3e1e5f5f7a?w=400&h=400&fit=crop', desc: 'Sal de mesa fina, yodada.', stock: 90 },
  { id: 31, name: 'Lentejas x 500g', category: 'despensa', price: 5.50, emoji: '🫘', imageUrl: 'https://images.unsplash.com/photo-1515543089-651c37368502?w=400&h=400&fit=crop', desc: 'Lentejas seleccionadas, ricas en hierro.', stock: 50 },
  { id: 32, name: 'Atún en Lata x 170g', category: 'despensa', price: 5.00, emoji: '🥫', imageUrl: 'https://images.unsplash.com/photo-1580537655944-890c6cd8d15a?w=400&h=400&fit=crop', desc: 'Atún en aceite vegetal, práctico y delicioso.', stock: 40 },
  { id: 33, name: 'Salsa de Tomate x 500g', category: 'despensa', price: 6.50, emoji: '🥫', imageUrl: 'https://images.unsplash.com/photo-1593437890082-5f4d25eb6b3a?w=400&h=400&fit=crop', desc: 'Salsa de tomate casera, lista para usar.', stock: 30 },
  // Limpieza
  { id: 34, name: 'Detergente Líquido x 1L', category: 'limpieza', price: 12.00, emoji: '🧴', imageUrl: 'https://images.unsplash.com/photo-1556741292-23f2f0174ca9?w=400&h=400&fit=crop', desc: 'Detergente líquido concentrado, fresco aroma.', stock: 55 },
  { id: 35, name: 'Lavavajillas x 750ml', category: 'limpieza', price: 8.00, emoji: '🧼', imageUrl: 'https://images.unsplash.com/photo-1584820926498-91c0b88d7d6b?w=400&h=400&fit=crop', desc: 'Lavavajillas líquido con poder desengrasante.', stock: 40 },
  { id: 36, name: 'Lejía x 1L', category: 'limpieza', price: 4.50, emoji: '🧪', imageUrl: 'https://images.unsplash.com/photo-1584620612-da180862024c?w=400&h=400&fit=crop', desc: 'Lejía concentrada, desinfección total.', stock: 60 },
  { id: 37, name: 'Papel Higiénico x 12 rollos', category: 'limpieza', price: 16.00, emoji: '🧻', imageUrl: 'https://images.unsplash.com/photo-1584622129-9e8c335bb52d?w=400&h=400&fit=crop', desc: 'Papel higiénico suave, triple hoja.', badge: 'Oferta', stock: 35 },
  { id: 38, name: 'Esponja Multiusos x 3', category: 'limpieza', price: 4.00, emoji: '🧽', imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop', desc: 'Esponjas resistentes para limpieza general.', stock: 50 },
  // Snacks
  { id: 39, name: 'Papas Fritas x 150g', category: 'snacks', price: 5.00, emoji: '🍟', imageUrl: 'https://images.unsplash.com/photo-1566843431-29e2467d3f94?w=400&h=400&fit=crop', desc: 'Papas fritas crocantes, sabor original.', stock: 0 },
  { id: 40, name: 'Chocolate con Leche x 100g', category: 'snacks', price: 7.00, emoji: '🍫', imageUrl: 'https://images.unsplash.com/photo-1511388099-06041cc93976?w=400&h=400&fit=crop', desc: 'Chocolate cremoso con leche, irresistible.', stock: 30 },
  { id: 41, name: 'Mix de Frutos Secos x 200g', category: 'snacks', price: 12.00, emoji: '🥜', imageUrl: 'https://images.unsplash.com/photo-1605209724995-acf70aca25a5?w=400&h=400&fit=crop', desc: 'Mix de almendras, nueces y pasas.', badge: 'Nuevo', stock: 20 },
  { id: 42, name: 'Chizitos x 200g', category: 'snacks', price: 4.50, emoji: '🫘', imageUrl: 'https://images.unsplash.com/photo-1550686041-366bd7f57aa3?w=400&h=400&fit=crop', desc: 'Snack crocante de maíz, sabor queso.', stock: 45 },
  // Carnes y Pollo
  { id: 43, name: 'Pollo Entero x 2kg', category: 'carnes', price: 22.00, emoji: '🍗', imageUrl: 'https://images.unsplash.com/photo-1604569926-53818e3a246a?w=400&h=400&fit=crop', desc: 'Pollo fresco de corral, criado sin hormonas.', badge: 'Oferta', stock: 20 },
  { id: 44, name: 'Carne Molida x 500g', category: 'carnes', price: 15.00, emoji: '🥩', imageUrl: 'https://images.unsplash.com/photo-1543352633-3dc84e460492?w=400&h=400&fit=crop', desc: 'Carne molida de res, 90% magra.', stock: 25 },
  { id: 45, name: 'Pechuga de Pollo x 500g', category: 'carnes', price: 13.00, emoji: '🍗', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', desc: 'Pechuga de pollo fresca, sin piel.', stock: 0 },
  { id: 46, name: 'Chorizo Parrillero x 400g', category: 'carnes', price: 14.00, emoji: '🌭', imageUrl: 'https://images.unsplash.com/photo-1559981835-520c8411d943?w=400&h=400&fit=crop', desc: 'Chorizo artesanal para parrilla, especias únicas.', stock: 30 },
  { id: 47, name: 'Pescado Fresco x 500g', category: 'carnes', price: 18.00, emoji: '🐟', imageUrl: 'https://images.unsplash.com/photo-1519708277-2708304245cc?w=400&h=400&fit=crop', desc: 'Filete de pescado fresco del día.', badge: 'Nuevo', stock: 15 }
];

const CATEGORIES = [
  { id: 'frutas', name: 'Frutas y Verduras', icon: 'fa-solid fa-apple-whole', color: '#E74C3C', bg: '#FDEDEC' },
  { id: 'lacteos', name: 'Lácteos', icon: 'fa-solid fa-cow', color: '#3498DB', bg: '#EBF5FB' },
  { id: 'panaderia', name: 'Panadería', icon: 'fa-solid fa-bread-slice', color: '#E67E22', bg: '#FEF5E7' },
  { id: 'bebidas', name: 'Bebidas', icon: 'fa-solid fa-wine-bottle', color: '#9B59B6', bg: '#F4ECF7' },
  { id: 'despensa', name: 'Despensa', icon: 'fa-solid fa-wheat-awn', color: '#F39C12', bg: '#FEF9E7' },
  { id: 'limpieza', name: 'Limpieza', icon: 'fa-solid fa-soap', color: '#1ABC9C', bg: '#E8F6F3' },
  { id: 'snacks', name: 'Snacks', icon: 'fa-solid fa-cookie', color: '#E91E63', bg: '#FCE4EC' },
  { id: 'carnes', name: 'Carnes y Pollo', icon: 'fa-solid fa-drumstick-bite', color: '#D35400', bg: '#FAE5D3' }
];

// ===== PRODUCT MANAGER (Catálogo Dinámico) =====
class ProductManager {
  constructor() {
    this._products = [];
    this._nextId = 1;
    this._listeners = [];
    this._load();
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.getAll()));
  }

  getAll() {
    return [...this._products];
  }

  getById(id) {
    return this._products.find(p => p.id === id);
  }

  getByCategory(categoryId) {
    return this._products.filter(p => p.category === categoryId);
  }

  search(term) {
    const t = term.toLowerCase();
    return this._products.filter(p =>
      p.name.toLowerCase().includes(t) || p.desc.toLowerCase().includes(t)
    );
  }

  add(data) {
    const product = {
      id: this._nextId++,
      name: data.name.trim(),
      category: data.category,
      price: parseFloat(data.price) || 0,
      emoji: data.emoji || '📦',
      imageUrl: data.imageUrl || '',
      desc: data.desc ? data.desc.trim() : '',
      badge: data.badge || '',
      stock: data.stock !== undefined ? parseInt(data.stock) : 99
    };
    this._products.push(product);
    this._save();
    this._notify();
    return product;
  }

  update(id, data) {
    const idx = this._products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const product = this._products[idx];
    if (data.name !== undefined) product.name = data.name.trim();
    if (data.category !== undefined) product.category = data.category;
    if (data.price !== undefined) product.price = parseFloat(data.price) || 0;
    if (data.emoji !== undefined) product.emoji = data.emoji || '📦';
    if (data.imageUrl !== undefined) product.imageUrl = data.imageUrl || '';
    if (data.desc !== undefined) product.desc = data.desc.trim();
    if (data.badge !== undefined) product.badge = data.badge;
    if (data.stock !== undefined) product.stock = parseInt(data.stock) || 0;
    this._save();
    this._notify();
    return product;
  }

  delete(id) {
    this._products = this._products.filter(p => p.id !== id);
    this._save();
    this._notify();
  }

  getNextId() {
    return this._nextId;
  }

  get count() {
    return this._products.length;
  }

  _load() {
    try {
      const stored = localStorage.getItem('mdj_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._products = parsed;
          this._nextId = Math.max(...parsed.map(p => p.id), 0) + 1;
          return;
        }
      }
    } catch {}
    // Fallback to defaults
    this._products = DEFAULT_PRODUCTS.map(p => ({ ...p }));
    this._nextId = Math.max(...this._products.map(p => p.id), 0) + 1;
    this._save();
  }

  _save() {
    try {
      localStorage.setItem('mdj_products', JSON.stringify(this._products));
    } catch {}
  }
}

// ===== ORDER HISTORY =====
class OrderHistory {
  constructor() {
    this._orders = [];
    this._listeners = [];
    this._load();
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.getAll()));
  }

  addOrder(orderData) {
    const order = {
      id: 'MDJ-' + String(this._nextOrderNum()).padStart(4, '0'),
      ...orderData,
      status: 'pending',
      createdAt: Date.now()
    };
    this._orders.unshift(order);
    this._save();
    this._notify();
    return order;
  }

  getAll() {
    return [...this._orders];
  }

  getById(id) {
    return this._orders.find(o => o.id === id);
  }

  updateStatus(id, newStatus) {
    const order = this._orders.find(o => o.id === id);
    if (!order) return false;
    order.status = newStatus;
    this._save();
    this._notify();
    return true;
  }

  get totalRevenue() {
    return this._orders.reduce((sum, o) => sum + (o.total || 0), 0);
  }

  get uniqueClients() {
    return new Set(this._orders.map(o => o.phone)).size;
  }

  getById(id) {
    return this._orders.find(o => o.id === id);
  }

  getOrdersByUser(email) {
    if (!email) return [];
    return this._orders.filter(o => o.userEmail === email);
  }

  get count() {
    return this._orders.length;
  }

  _nextOrderNum() {
    if (this._orders.length === 0) return 1;
    const nums = this._orders.map(o => {
      const match = o.id.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    });
    return Math.max(...nums, 0) + 1;
  }

  _load() {
    try {
      const stored = localStorage.getItem('mdj_orders');
      if (stored) {
        this._orders = JSON.parse(stored);
      }
    } catch {}
  }

  _save() {
    try {
      localStorage.setItem('mdj_orders', JSON.stringify(this._orders));
    } catch {}
  }
}

// ===== CART MANAGER =====
class Cart {
  constructor() {
    this.items = [];
    this._listeners = [];
    this._load();
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.items));
  }

  add(productId, quantity = 1) {
    const product = productManager.getById(productId);
    if (!product) return false;
    if (product.stock !== undefined && product.stock <= 0) {
      return false;
    }
    const existing = this.items.find(item => item.productId === productId);
    const currentQty = existing ? existing.quantity : 0;
    if (product.stock !== undefined && currentQty + quantity > product.stock) {
      return false;
    }
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }
    this._save();
    this._notify();
    return true;
  }

  remove(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this._save();
    this._notify();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      this._save();
      this._notify();
    }
  }

  clear() {
    this.items = [];
    this._save();
    this._notify();
  }

  get count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal() {
    return this.items.reduce((sum, item) => {
      const product = productManager.getById(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  get shipping() {
    return this.subtotal >= 50 ? 0 : 8;
  }

  get total() {
    return this.subtotal + this.shipping;
  }

  getItems() {
    return this.items.map(item => ({
      ...item,
      product: productManager.getById(item.productId)
    })).filter(item => item.product !== undefined);
  }

  _save() {
    try {
      localStorage.setItem('mdj_cart', JSON.stringify(this.items));
    } catch {}
  }

  _load() {
    try {
      const stored = localStorage.getItem('mdj_cart');
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch {}
  }
}

// ===== USER AUTH =====
class UserAuth {
  constructor() {
    this.currentUser = null;
    this._listeners = [];
    this._load();
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.currentUser));
  }

  login(email, password) {
    if (!email || !password) return { success: false, error: 'Todos los campos son obligatorios' };
    try {
      const users = JSON.parse(localStorage.getItem('mdj_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return { success: false, error: 'Credenciales inválidas' };
      this.currentUser = { email: user.email, name: user.name };
      this._save();
      this._notify();
      return { success: true };
    } catch { return { success: false, error: 'Error al iniciar sesión' }; }
  }

  signup(name, email, password) {
    if (!name || !email || !password) return { success: false, error: 'Todos los campos son obligatorios' };
    if (password.length < 6) return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    try {
      const users = JSON.parse(localStorage.getItem('mdj_users') || '[]');
      if (users.find(u => u.email === email)) return { success: false, error: 'Este correo ya está registrado' };
      users.push({ name, email, password, createdAt: Date.now() });
      localStorage.setItem('mdj_users', JSON.stringify(users));
      this.currentUser = { email, name };
      this._save();
      this._notify();
      return { success: true };
    } catch { return { success: false, error: 'Error al registrarse' }; }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('mdj_current_user');
    this._notify();
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  _save() {
    try { localStorage.setItem('mdj_current_user', JSON.stringify(this.currentUser)); } catch {}
  }

  _load() {
    try {
      const saved = localStorage.getItem('mdj_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email) this.currentUser = parsed;
      }
    } catch {}
  }
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(amount) {
  return 'S/ ' + amount.toFixed(2);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getCategoryName(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}

function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id);
}

function getProductImage(product) {
  if (product.imageUrl) {
    return product.imageUrl;
  }
  return null;
}

// ===== STATE =====
const productManager = new ProductManager();
const orderHistory = new OrderHistory();
const cart = new Cart();
const userAuth = new UserAuth();
let currentCategory = 'all';
let currentSearch = '';

// ===== DOM REFERENCES =====
// Navigation
const headerLinks = document.querySelectorAll('.header-link');
const heroSection = document.getElementById('hero');
const categoriesSection = document.getElementById('categories');
const featuredSection = document.getElementById('featured');
const allProductsSection = document.getElementById('allProducts');
const contactSection = document.getElementById('contactSection');

// Products
const featuredGrid = document.getElementById('featuredGrid');
const productsGrid = document.getElementById('productsGrid');
const productsEmpty = document.getElementById('productsEmpty');
const filterChips = document.getElementById('filterChips');
const categoriesGrid = document.getElementById('categoriesGrid');

// Search
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');

// Cart
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartEmpty = document.getElementById('cartEmpty');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartShipping = document.getElementById('cartShipping');
const cartTotal = document.getElementById('cartTotal');
const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
const cartWhatsAppBtn = document.getElementById('cartWhatsAppBtn');
const cartEmptyBtn = document.getElementById('cartEmptyBtn');

// Checkout
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutClose = document.getElementById('checkoutClose');
const checkoutFormEl = document.getElementById('checkoutForm');
const checkoutSuccessEl = document.getElementById('checkoutSuccess');
const checkoutName = document.getElementById('checkoutName');
const checkoutPhone = document.getElementById('checkoutPhone');
const checkoutAddress = document.getElementById('checkoutAddress');
const checkoutDistrict = document.getElementById('checkoutDistrict');
const checkoutPayment = document.getElementById('checkoutPayment');
const checkoutNotes = document.getElementById('checkoutNotes');
const checkoutItemsEl = document.getElementById('checkoutItems');
const checkoutSubtotal = document.getElementById('checkoutSubtotal');
const checkoutShipping = document.getElementById('checkoutShipping');
const checkoutTotal = document.getElementById('checkoutTotal');
const checkoutSubmit = document.getElementById('checkoutSubmit');
const checkoutError = document.getElementById('checkoutError');
const orderId = document.getElementById('orderId');
const orderPhone = document.getElementById('orderPhone');
const orderAddress = document.getElementById('orderAddress');
const orderPayment = document.getElementById('orderPayment');
const checkoutNewOrder = document.getElementById('checkoutNewOrder');

// Toast
const toast = document.getElementById('toast');

// Others
const heroWhatsApp = document.getElementById('heroWhatsApp');
const whatsappFloat = document.getElementById('whatsappFloat');



// Order History (client)
const orderHistoryLink = document.getElementById('orderHistoryLink');
const orderHistoryOverlay = document.getElementById('orderHistoryOverlay');
const orderHistoryModal = document.getElementById('orderHistoryModal');
const orderHistoryClose = document.getElementById('orderHistoryClose');
const orderHistoryEmpty = document.getElementById('orderHistoryEmpty');
const orderHistoryList = document.getElementById('orderHistoryList');
const orderHistoryItems = document.getElementById('orderHistoryItems');

// Auth
const authOverlay = document.getElementById('authOverlay');
const authModal = document.getElementById('authModal');
const authClose = document.getElementById('authClose');
const authTitle = document.getElementById('authTitle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginSubmit = document.getElementById('loginSubmit');
const loginError = document.getElementById('loginError');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupSubmit = document.getElementById('signupSubmit');
const signupError = document.getElementById('signupError');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const authLoggedIn = document.getElementById('authLoggedIn');
const authAvatar = document.getElementById('authAvatar');
const authUserName = document.getElementById('authUserName');
const authUserEmail = document.getElementById('authUserEmail');
const authLogoutBtn = document.getElementById('authLogoutBtn');
const userAuthLink = document.getElementById('userAuthLink');
const userAuthLinkText = document.getElementById('userAuthLinkText');

// ===== TOAST =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== RENDER FUNCTIONS =====

// Categories
function renderCategories() {
  categoriesGrid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const count = productManager.getByCategory(cat.id).length;
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.category = cat.id;
    card.innerHTML = `
      <div class="category-card-icon" style="background:${cat.bg};color:${cat.color}">
        <i class="${cat.icon}"></i>
      </div>
      <div class="category-card-name">${escapeHtml(cat.name)}</div>
      <div class="category-card-count">${count} productos</div>
    `;
    card.addEventListener('click', () => {
      currentCategory = cat.id;
      showPage('products');
      updateFilterChips();
      renderProducts();
      allProductsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    categoriesGrid.appendChild(card);
  });
}

// Products
function renderFeatured() {
  const all = productManager.getAll();
  const featured = [...all].sort(() => Math.random() - 0.5).slice(0, 8);
  featuredGrid.innerHTML = '';
  featured.forEach((product, i) => {
    featuredGrid.appendChild(createProductCard(product, i));
  });
}

function renderProducts() {
  let filtered = productManager.getAll();

  if (currentSearch) {
    filtered = productManager.search(currentSearch);
  }

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    productsEmpty.classList.remove('hidden');
    return;
  }

  productsEmpty.classList.add('hidden');
  productsGrid.innerHTML = '';
  filtered.forEach((product, i) => {
    productsGrid.appendChild(createProductCard(product, i));
  });
}

function createProductCard(product, index) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.animationDelay = `${(index % 12) * 0.05}s`;
  card.dataset.productId = product.id;

  const badgeHtml = product.badge
    ? `<span class="product-card-badge ${product.badge === 'Nuevo' ? 'new' : ''}">${product.badge === 'Oferta' ? '🔥 ' : '✨ '}${product.badge}</span>`
    : '';

  const outOfStock = product.stock <= 0;
  const cartItem = cart.items.find(i => i.productId === product.id);
  const inCart = cartItem ? cartItem.quantity : 0;
  const maxReached = outOfStock || (!outOfStock && product.stock !== undefined && inCart >= product.stock);

  const imgSrc = getProductImage(product);
  const imageHtml = imgSrc
    ? `<img src="${imgSrc}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
       <span class="product-emoji" style="display:none">${product.emoji || '📦'}</span>`
    : `<span class="product-emoji">${product.emoji || '📦'}</span>`;

  card.innerHTML = `
    <div class="product-card-image">
      ${imageHtml}
      ${outOfStock ? '<span class="product-card-badge out-of-stock">❌ Agotado</span>' : badgeHtml}
    </div>
    <div class="product-card-body">
      <div class="product-card-category">${getCategoryName(product.category)}</div>
      <div class="product-card-name">${escapeHtml(product.name)}</div>
      ${!outOfStock && product.stock !== undefined ? `<div class="product-card-stock">📦 Stock: ${product.stock} unid.</div>` : ''}
      <div class="product-card-desc">${escapeHtml(product.desc)}</div>
      <div class="product-card-footer">
        <div class="product-card-price">
          ${formatPrice(product.price)}
        </div>
        <button class="product-card-add ${inCart > 0 ? 'added' : ''} ${maxReached ? 'disabled' : ''}" data-action="add" ${maxReached ? 'disabled' : ''} title="${outOfStock ? 'Producto agotado' : (maxReached ? 'Stock máximo alcanzado' : (inCart > 0 ? 'Agregar otro' : 'Agregar al carrito'))}">
          <i class="fa-solid ${outOfStock ? 'fa-ban' : (maxReached ? 'fa-ban' : (inCart > 0 ? 'fa-check' : 'fa-plus'))}"></i>
        </button>
      </div>
    </div>
  `;

  const addBtn = card.querySelector('[data-action="add"]');
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (outOfStock) {
      showToast('❌ Producto agotado');
      return;
    }
    if (maxReached) {
      showToast('❌ Stock máximo alcanzado en el carrito');
      return;
    }
    const success = cart.add(product.id);
    if (!success) {
      showToast('❌ No hay suficiente stock disponible');
      return;
    }
    showToast(`${product.name} agregado al carrito`);
    addBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    addBtn.classList.add('added');
    setTimeout(() => {
      addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
      addBtn.classList.remove('added');
    }, 800);
  });

  return card;
}

// Filter chips
function renderFilterChips() {
  filterChips.innerHTML = '';
  const allChip = document.createElement('button');
  allChip.className = `filter-chip ${currentCategory === 'all' ? 'active' : ''}`;
  allChip.dataset.category = 'all';
  allChip.textContent = 'Todos';
  allChip.addEventListener('click', () => {
    currentCategory = 'all';
    updateFilterChips();
    renderProducts();
  });
  filterChips.appendChild(allChip);

  CATEGORIES.forEach(cat => {
    const chip = document.createElement('button');
    chip.className = `filter-chip ${currentCategory === cat.id ? 'active' : ''}`;
    chip.dataset.category = cat.id;
    chip.textContent = cat.name;
    chip.addEventListener('click', () => {
      currentCategory = cat.id;
      updateFilterChips();
      renderProducts();
    });
    filterChips.appendChild(chip);
  });
}

function updateFilterChips() {
  filterChips.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.category === currentCategory);
  });
}

// ===== CART UI =====
function updateCartUI() {
  const count = cart.count;
  if (count > 0) {
    cartBadge.textContent = count;
    cartBadge.classList.remove('hidden');
  } else {
    cartBadge.classList.add('hidden');
  }
}

function renderCartSidebar() {
  const items = cart.getItems();

  if (items.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartItems.classList.add('hidden');
    cartFooter.classList.add('hidden');
    return;
  }

  cartEmpty.classList.add('hidden');
  cartItems.classList.remove('hidden');
  cartFooter.classList.remove('hidden');

  cartItems.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-image">
        ${getProductImage(item.product)
          ? `<img src="${item.product.imageUrl}?w=100&h=100&fit=crop" alt="${escapeHtml(item.product.name)}" onerror="this.style.display='none';this.parentElement.innerHTML='${item.product.emoji || '📦'}'" />`
          : `${item.product.emoji || '📦'}`}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHtml(item.product.name)}</div>
        <div class="cart-item-price">${formatPrice(item.product.price)}</div>
        <div class="cart-item-quantity">
          <button class="cart-item-qty-btn" data-action="dec" data-id="${item.productId}">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button class="cart-item-qty-btn" data-action="inc" data-id="${item.productId}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="cart-item-remove" data-action="remove" data-id="${item.productId}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

    el.querySelector('[data-action="inc"]').addEventListener('click', () => {
      cart.updateQuantity(item.productId, item.quantity + 1);
    });
    el.querySelector('[data-action="dec"]').addEventListener('click', () => {
      cart.updateQuantity(item.productId, item.quantity - 1);
    });
    el.querySelector('[data-action="remove"]').addEventListener('click', () => {
      cart.remove(item.productId);
      showToast(`${item.product.name} eliminado del carrito`);
    });

    cartItems.appendChild(el);
  });

  cartSubtotal.textContent = formatPrice(cart.subtotal);
  cartShipping.textContent = cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping);
  cartTotal.textContent = formatPrice(cart.total);
}

// ===== CHECKOUT =====
function renderCheckoutSummary() {
  const items = cart.getItems();
  checkoutItemsEl.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'checkout-item';
    const imgSrc = getProductImage(item.product);
    el.innerHTML = `
      <span class="checkout-item-info">
        ${imgSrc ? `<img src="${imgSrc}?w=32&h=32&fit=crop" class="checkout-item-img" alt="" />` : ''}
        ${escapeHtml(item.product.name)} x${item.quantity}
      </span>
      <span>${formatPrice(item.product.price * item.quantity)}</span>
    `;
    checkoutItemsEl.appendChild(el);
  });

  checkoutSubtotal.textContent = formatPrice(cart.subtotal);
  checkoutShipping.textContent = cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping);
  checkoutTotal.textContent = formatPrice(cart.total);
}

function openCheckout() {
  if (cart.count === 0) {
    showToast('Agrega productos al carrito primero');
    return;
  }
  closeCart();
  checkoutFormEl.classList.remove('hidden');
  checkoutSuccessEl.classList.add('hidden');
  checkoutError.textContent = '';
  checkoutSubmit.disabled = false;
  checkoutSubmit.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirmar pedido';
  checkoutName.value = '';
  checkoutPhone.value = '';
  checkoutAddress.value = '';
  checkoutDistrict.value = '';
  checkoutPayment.value = '';
  checkoutNotes.value = '';
  checkoutOverlay.classList.remove('hidden');
  checkoutModal.classList.remove('hidden');
  renderCheckoutSummary();
  setTimeout(() => checkoutName.focus(), 200);
}

function closeCheckout() {
  checkoutOverlay.classList.add('hidden');
  checkoutModal.classList.add('hidden');
}

function handleCheckout() {
  const name = checkoutName.value.trim();
  const phone = checkoutPhone.value.trim();
  const address = checkoutAddress.value.trim();
  const district = checkoutDistrict.value;
  const payment = checkoutPayment.value;
  const notes = checkoutNotes.value.trim();

  if (!name) { checkoutError.textContent = 'Por favor ingresa tu nombre'; checkoutName.focus(); return; }
  if (!phone) { checkoutError.textContent = 'Por favor ingresa tu teléfono'; checkoutPhone.focus(); return; }
  if (!address) { checkoutError.textContent = 'Por favor ingresa tu dirección'; checkoutAddress.focus(); return; }
  if (!district) { checkoutError.textContent = 'Por favor selecciona tu distrito'; checkoutDistrict.focus(); return; }
  if (!payment) { checkoutError.textContent = 'Por favor selecciona tu método de pago'; checkoutPayment.focus(); return; }

  checkoutError.textContent = '';
  checkoutSubmit.disabled = true;
  checkoutSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando...';

  setTimeout(() => {
    const items = cart.getItems();
    const itemList = items.map(i => `• ${i.product.emoji} ${i.product.name} x${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`).join('\n');

    // Save order to history
    const order = orderHistory.addOrder({
      userEmail: userAuth.isLoggedIn() ? userAuth.currentUser.email : null,
      name,
      phone,
      address: `${address}, ${district}`,
      district,
      payment,
      notes,
      items: items.map(i => ({
        productId: i.productId,
        productName: i.product.name,
        productEmoji: i.product.emoji,
        quantity: i.quantity,
        price: i.product.price
      })),
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      total: cart.total
    });

    // Show success
    checkoutFormEl.classList.add('hidden');
    checkoutSuccessEl.classList.remove('hidden');
    orderId.textContent = order.id;
    orderPhone.textContent = phone;
    orderAddress.textContent = `${address}, ${district}`;
    orderPayment.textContent = payment;

    const waMessage = encodeURIComponent(
      `🛒 *Nuevo Pedido - ${order.id}*\n\n` +
      `*Cliente:* ${name}\n` +
      `*Teléfono:* ${phone}\n` +
      `*Dirección:* ${address}, ${district}\n` +
      `*Pago:* ${payment}\n` +
      (notes ? `*Notas:* ${notes}\n\n` : '\n') +
      `*Productos:*\n${itemList}\n\n` +
      `*Subtotal:* ${formatPrice(cart.subtotal)}\n` +
      `*Envío:* ${cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping)}\n` +
      `*Total: ${formatPrice(cart.total)}*`
    );

    heroWhatsApp.href = `https://wa.me/51999888777?text=${waMessage}`;
    whatsappFloat.href = `https://wa.me/51999888777?text=${waMessage}`;

    cart.clear();

    checkoutSubmit.disabled = false;
    checkoutSubmit.innerHTML = '<i class="fa-solid fa-check-circle"></i> Confirmar pedido';
  }, 1200);
}

// ===== PAGE NAVIGATION =====
function showPage(page) {
  headerLinks.forEach(l => l.classList.remove('active'));

  heroSection.style.display = 'none';
  allProductsSection.style.display = 'none';
  contactSection.style.display = 'none';

  if (page === 'home') {
    document.querySelector('[data-page="home"]').classList.add('active');
    heroSection.style.display = '';
    allProductsSection.style.display = '';
    contactSection.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (page === 'products') {
    document.querySelector('[data-page="products"]').classList.add('active');
    allProductsSection.style.display = '';
    allProductsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (page === 'contact') {
    document.querySelector('[data-page="contact"]').classList.add('active');
    contactSection.style.display = '';
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ===== CART SIDEBAR TOGGLE =====
function openCart() {
  renderCartSidebar();
  cartOverlay.classList.remove('hidden');
  cartSidebar.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartOverlay.classList.add('hidden');
  cartSidebar.classList.add('hidden');
  document.body.style.overflow = '';
}

// ===== WHATSAPP ORDER =====
function buildWhatsAppOrder() {
  if (cart.count === 0) {
    showToast('Agrega productos al carrito primero');
    return;
  }

  const items = cart.getItems();
  const itemList = items.map(i => `• ${i.product.emoji} ${i.product.name} x${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`).join('\n');
  const message = encodeURIComponent(
    `🛒 *Pedido por WhatsApp*\n\n` +
    `*Productos:*\n${itemList}\n\n` +
    `*Subtotal:* ${formatPrice(cart.subtotal)}\n` +
    `*Envío:* ${cart.shipping === 0 ? 'Gratis' : formatPrice(cart.shipping)}\n` +
    `*Total: ${formatPrice(cart.total)}*\n\n` +
    `Por favor, envíame la confirmación del pedido. ¡Gracias! 🙏`
  );

  window.open(`https://wa.me/51999888777?text=${message}`, '_blank');
}

// ===== USER AUTH UI =====
function openAuth() {
  closeCart();
  closeCheckout();
  closeOrderHistory();
  authOverlay.classList.remove('hidden');
  authModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  showLoginForm();
}

function closeAuth() {
  authOverlay.classList.add('hidden');
  authModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function showLoginForm() {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  authLoggedIn.classList.add('hidden');
  authTitle.innerHTML = '<i class="fa-solid fa-user"></i> Iniciar Sesión';
  loginError.textContent = '';
  signupError.textContent = '';
}

function showSignupForm() {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  authLoggedIn.classList.add('hidden');
  authTitle.innerHTML = '<i class="fa-solid fa-user-plus"></i> Crear Cuenta';
  loginError.textContent = '';
  signupError.textContent = '';
}

function updateAuthUI() {
  if (userAuth.isLoggedIn()) {
    userAuthLinkText.textContent = userAuth.currentUser.name;
    userAuthLink.querySelector('i').className = 'fa-solid fa-user-check';
  } else {
    userAuthLinkText.textContent = 'Iniciar Sesión';
    userAuthLink.querySelector('i').className = 'fa-solid fa-user';
  }
}

function handleLogin() {
  const email = loginEmail.value.trim();
  const password = loginPassword.value;
  const result = userAuth.login(email, password);
  if (result.success) {
    closeAuth();
    updateAuthUI();
    showToast('👋 ¡Bienvenido, ' + userAuth.currentUser.name + '!');
  } else {
    loginError.textContent = result.error;
  }
}

function handleSignup() {
  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;
  const result = userAuth.signup(name, email, password);
  if (result.success) {
    closeAuth();
    updateAuthUI();
    showToast('✅ Cuenta creada. ¡Bienvenido, ' + name + '!');
  } else {
    signupError.textContent = result.error;
  }
}

function handleLogout() {
  userAuth.logout();
  updateAuthUI();
  showToast('👋 Sesión cerrada');
}

function getStatusLabel(status) {
  const labels = { pending: 'Pendiente', confirmed: 'Confirmado', shipping: 'En envío', delivered: 'Entregado', cancelled: 'Cancelado' };
  return labels[status] || status;
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
    d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

// ===== ORDER HISTORY (CLIENT) =====
function openOrderHistory() {
  closeCart();
  closeCheckout();
  closeAuth();
  orderHistoryOverlay.classList.remove('hidden');
  orderHistoryModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderOrderHistory();
}

function closeOrderHistory() {
  orderHistoryOverlay.classList.add('hidden');
  orderHistoryModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function renderOrderHistory() {
  if (!userAuth.isLoggedIn()) {
    orderHistoryEmpty.innerHTML = `
      <i class="fa-solid fa-user-lock"></i>
      <h3>Inicia sesión para ver tus pedidos</h3>
      <p>Necesitas iniciar sesión para consultar el historial de tus compras</p>
      <button class="cart-empty-btn" onclick="openAuth()">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> Iniciar Sesión
      </button>
    `;
    orderHistoryEmpty.classList.remove('hidden');
    orderHistoryList.classList.add('hidden');
    return;
  }

  const orders = orderHistory.getOrdersByUser(userAuth.currentUser.email);

  if (orders.length === 0) {
    orderHistoryEmpty.innerHTML = `
      <i class="fa-solid fa-receipt"></i>
      <h3>No tienes pedidos aún</h3>
      <p>Cuando realices una compra, el pedido aparecerá aquí</p>
    `;
    orderHistoryEmpty.classList.remove('hidden');
    orderHistoryList.classList.add('hidden');
    return;
  }

  orderHistoryEmpty.classList.add('hidden');
  orderHistoryList.classList.remove('hidden');
  orderHistoryItems.innerHTML = '';

  orders.forEach(order => {
    const statusMap = {
      pending: { label: 'Pendiente', class: 'pending' },
      confirmed: { label: 'Confirmado', class: 'confirmed' },
      shipping: { label: 'En envío', class: 'shipping' },
      delivered: { label: 'Entregado', class: 'delivered' },
      cancelled: { label: 'Cancelado', class: 'cancelled' }
    };
    const st = statusMap[order.status] || statusMap.pending;

    const card = document.createElement('div');
    card.className = 'order-history-card';
    card.innerHTML = `
      <div class="order-history-card-header">
        <span class="order-history-card-id">${order.id}</span>
        <span class="order-history-card-date">${formatDate(order.createdAt)}</span>
      </div>
      <div class="order-history-card-body">
        <span class="status-badge ${st.class}">${st.label}</span>
        <span style="margin-left:10px">${escapeHtml(order.name)} · ${escapeHtml(order.district)}</span>
      </div>
      <div class="order-history-card-footer">
        <span class="order-history-card-total">${formatPrice(order.total)}</span>
        <span style="font-size:12px;color:var(--text-tertiary)">${order.items ? order.items.length : 0} productos</span>
      </div>
    `;

    card.addEventListener('click', () => {
      // Toggle detail expansion
      const existingDetail = card.querySelector('.order-history-detail');
      if (existingDetail) {
        existingDetail.remove();
        return;
      }
      const detail = document.createElement('div');
      detail.className = 'order-history-detail';
      let itemsHtml = '';
      if (order.items) {
        itemsHtml = '<div class="order-detail-items">' +
          order.items.map(i =>
            `<div class="order-detail-item"><span>${i.productEmoji || '📦'} ${i.productName} x${i.quantity}</span><span>${formatPrice(i.price * i.quantity)}</span></div>`
          ).join('') +
        '</div>';
      }
      detail.innerHTML = `
        <p><span>Dirección</span><span>${escapeHtml(order.address)}</span></p>
        <p><span>Pago</span><span>${order.payment}</span></p>
        <p><span>Subtotal</span><span>${formatPrice(order.subtotal)}</span></p>
        <p><span>Envío</span><span>${order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}</span></p>
        <p style="font-weight:700;color:var(--green);font-size:15px"><span>TOTAL</span><span>${formatPrice(order.total)}</span></p>
        ${itemsHtml}
      `;
      card.appendChild(detail);
    });

    orderHistoryItems.appendChild(card);
  });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Navigation
  headerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // Hero buttons
  document.querySelector('.hero-btn-primary')?.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('products');
  });

  heroWhatsApp.addEventListener('click', (e) => {
    e.preventDefault();
    if (cart.count > 0) {
      buildWhatsAppOrder();
    } else {
      window.open('https://wa.me/51999888777?text=¡Hola!%20Quiero%20hacer%20un%20pedido', '_blank');
    }
  });

  // Search
  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
      setTimeout(() => searchInput.focus(), 100);
    }
  });

  searchClose.addEventListener('click', () => {
    searchBar.classList.add('hidden');
    searchInput.value = '';
    currentSearch = '';
    renderProducts();
  });

  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim();
    renderProducts();
    if (currentSearch && allProductsSection.style.display === 'none') {
      showPage('products');
    }
  });

  // Cart
  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  cartEmptyBtn.addEventListener('click', () => {
    closeCart();
    showPage('products');
  });

  cart.onChange(() => {
    updateCartUI();
    if (!cartSidebar.classList.contains('hidden')) {
      renderCartSidebar();
    }
    document.querySelectorAll('.product-card').forEach(card => {
      const id = parseInt(card.dataset.productId);
      const btn = card.querySelector('[data-action="add"]');
      if (btn && id) {
        const item = cart.items.find(i => i.productId === id);
        if (item) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';
          btn.classList.add('added');
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            btn.classList.remove('added');
          }, 800);
        }
      }
    });
  });

  // Product manager changes -> re-render
  productManager.onChange(() => {
    renderCategories();
    renderFilterChips();
    renderFeatured();
    renderProducts();
  });

  // Checkout buttons
  cartCheckoutBtn.addEventListener('click', openCheckout);
  cartWhatsAppBtn.addEventListener('click', buildWhatsAppOrder);

  // Checkout modal
  checkoutClose.addEventListener('click', closeCheckout);
  checkoutOverlay.addEventListener('click', closeCheckout);
  checkoutSubmit.addEventListener('click', handleCheckout);
  checkoutNewOrder.addEventListener('click', () => {
    closeCheckout();
    showPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('¡Gracias por tu compra! 🎉');
  });

  // Enter key on checkout
  checkoutNotes.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCheckout();
    }
  });

  // Auth
  userAuthLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (userAuth.isLoggedIn()) {
      openAuth(); // Shows logged-in state
      authLoggedIn.classList.remove('hidden');
      loginForm.classList.add('hidden');
      signupForm.classList.add('hidden');
      authTitle.innerHTML = '<i class="fa-solid fa-user-check"></i> Mi Cuenta';
      authUserName.textContent = userAuth.currentUser.name;
      authUserEmail.textContent = userAuth.currentUser.email;
      authAvatar.textContent = userAuth.currentUser.name.charAt(0).toUpperCase();
    } else {
      openAuth();
    }
  });

  authOverlay.addEventListener('click', closeAuth);
  authClose.addEventListener('click', closeAuth);

  showSignup.addEventListener('click', (e) => { e.preventDefault(); showSignupForm(); });
  showLogin.addEventListener('click', (e) => { e.preventDefault(); showLoginForm(); });

  loginSubmit.addEventListener('click', handleLogin);
  signupSubmit.addEventListener('click', handleSignup);
  authLogoutBtn.addEventListener('click', handleLogout);

  loginEmail.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginPassword.focus(); });
  loginPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLogin(); });
  signupName.addEventListener('keydown', (e) => { if (e.key === 'Enter') signupEmail.focus(); });
  signupEmail.addEventListener('keydown', (e) => { if (e.key === 'Enter') signupPassword.focus(); });
  signupPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSignup(); });

  // Order History (client)
  orderHistoryLink.addEventListener('click', (e) => {
    e.preventDefault();
    openOrderHistory();
  });
  orderHistoryOverlay.addEventListener('click', closeOrderHistory);
  orderHistoryClose.addEventListener('click', closeOrderHistory);

  // Keyboard: Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!orderHistoryModal.classList.contains('hidden')) { closeOrderHistory(); return; }
      closeAuth();
      closeCart();
      closeCheckout();
    }
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Footer category links
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const text = link.textContent.trim();
      const cat = CATEGORIES.find(c => c.name === text);
      if (cat) {
        e.preventDefault();
        currentCategory = cat.id;
        showPage('products');
        updateFilterChips();
        renderProducts();
      }
    });
  });
}

// ===== INIT =====
function init() {
  renderCategories();
  renderFilterChips();
  renderFeatured();
  renderProducts();
  updateCartUI();
  updateAuthUI();
  setupEventListeners();

  // Listen for auth changes
  userAuth.onChange(() => {
    updateAuthUI();
  });

  showPage('home');

  console.log('🛒 Mercado Don José — Tienda Online lista');
  console.log(`📦 ${productManager.count} productos en ${CATEGORIES.length} categorías`);
  console.log(`📋 ${orderHistory.count} pedidos registrados`);
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
