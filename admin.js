// ===== DEFAULT PRODUCTS (fallback) =====
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Manzana Roja x kg', category: 'frutas', price: 6.50, emoji: '🍎', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop', desc: 'Manzanas rojas frescas, dulces y crujientes.', badge: 'Oferta', stock: 99 },
  { id: 2, name: 'Plátano de Seda x kg', category: 'frutas', price: 4.20, emoji: '🍌', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b7e3?w=400&h=400&fit=crop', desc: 'Plátanos dulces y suaves.', stock: 99 },
  { id: 3, name: 'Papaya x kg', category: 'frutas', price: 5.00, emoji: '🍈', imageUrl: 'https://images.unsplash.com/photo-1547481358-1002933f7d14?w=400&h=400&fit=crop', desc: 'Papaya jugosa y dulce.', badge: 'Nuevo', stock: 30 },
  { id: 4, name: 'Fresas x 500g', category: 'frutas', price: 7.50, emoji: '🍓', imageUrl: 'https://images.unsplash.com/photo-1563856917-0d32f50d18bc?w=400&h=400&fit=crop', desc: 'Fresas frescas importadas.', stock: 40 },
  { id: 5, name: 'Limón x kg', category: 'frutas', price: 3.80, emoji: '🍋', imageUrl: 'https://images.unsplash.com/photo-1555948657-3e6396489437?w=400&h=400&fit=crop', desc: 'Limones frescos.', stock: 80 },
  { id: 6, name: 'Cebolla Roja x kg', category: 'frutas', price: 3.20, emoji: '🧅', imageUrl: 'https://images.unsplash.com/photo-1518977807-062e74360e22?w=400&h=400&fit=crop', desc: 'Cebolla roja nacional.', stock: 60 },
  { id: 7, name: 'Papa Amarilla x kg', category: 'frutas', price: 4.00, emoji: '🥔', imageUrl: 'https://images.unsplash.com/photo-1518977604-032223019882?w=400&h=400&fit=crop', desc: 'Papa amarilla peruana.', stock: 0 },
  { id: 8, name: 'Tomate Italiano x kg', category: 'frutas', price: 4.50, emoji: '🍅', imageUrl: 'https://images.unsplash.com/photo-1546135934-641676edb964?w=400&h=400&fit=crop', desc: 'Tomates frescos y carnosos.', stock: 50 },
  { id: 9, name: 'Aguacate x unidad', category: 'frutas', price: 3.00, emoji: '🥑', imageUrl: 'https://images.unsplash.com/photo-1523049673-0498eb75249f?w=400&h=400&fit=crop', desc: 'Aguacates maduros y cremosos.', badge: 'Oferta', stock: 25 },
  { id: 10, name: 'Leche Fresca x 1L', category: 'lacteos', price: 5.50, emoji: '🥛', imageUrl: 'https://images.unsplash.com/photo-1550583162-a25e2e4b3e83?w=400&h=400&fit=crop', desc: 'Leche fresca pasteurizada.', stock: 99 },
  { id: 11, name: 'Yogurt Natural x 1L', category: 'lacteos', price: 7.00, emoji: '🫗', imageUrl: 'https://images.unsplash.com/photo-1514365850-c65a4c9c2420?w=400&h=400&fit=crop', desc: 'Yogurt natural sin azúcar.', stock: 45 },
  { id: 12, name: 'Queso Fresco x 250g', category: 'lacteos', price: 6.00, emoji: '🧀', imageUrl: 'https://images.unsplash.com/photo-1627588365-1d044009761e?w=400&h=400&fit=crop', desc: 'Queso fresco artesanal.', stock: 30 },
  { id: 13, name: 'Mantequilla x 200g', category: 'lacteos', price: 8.50, emoji: '🧈', imageUrl: 'https://images.unsplash.com/photo-1589464010-826d9c6722ea?w=400&h=400&fit=crop', desc: 'Mantequilla cremosa.', stock: 40 },
  { id: 14, name: 'Huevos de Granja x 30', category: 'lacteos', price: 14.00, emoji: '🥚', imageUrl: 'https://images.unsplash.com/photo-1506976446-c672d547f872?w=400&h=400&fit=crop', desc: 'Huevos frescos de granja.', badge: 'Oferta', stock: 60 },
  { id: 15, name: 'Crema de Leche x 200ml', category: 'lacteos', price: 6.50, emoji: '🥛', imageUrl: 'https://images.unsplash.com/photo-1530639902-120023ee45c7?w=400&h=400&fit=crop', desc: 'Crema de leche espesa.', stock: 35 },
  { id: 16, name: 'Pan Molde Integral x 500g', category: 'panaderia', price: 7.50, emoji: '🍞', imageUrl: 'https://images.unsplash.com/photo-1509440599-e65922e3792c?w=400&h=400&fit=crop', desc: 'Pan integral suave.', stock: 50 },
  { id: 17, name: 'Pan Francés x unidad', category: 'panaderia', price: 1.50, emoji: '🥖', imageUrl: 'https://images.unsplash.com/photo-1507491761-0089f2a2f768?w=400&h=400&fit=crop', desc: 'Pan francés crujiente.', stock: 0 },
  { id: 18, name: 'Tortillas de Harina x 6', category: 'panaderia', price: 5.00, emoji: '🫓', imageUrl: 'https://images.unsplash.com/photo-1574484632719-e1a4c3f7a5c5?w=400&h=400&fit=crop', desc: 'Tortillas suaves.', stock: 30 },
  { id: 19, name: 'Galletas de Avena x 200g', category: 'panaderia', price: 6.00, emoji: '🍪', imageUrl: 'https://images.unsplash.com/photo-1558961363-f2dc8c163766?w=400&h=400&fit=crop', desc: 'Galletas caseras de avena.', stock: 0 },
  { id: 20, name: 'Agua Mineral x 1.5L', category: 'bebidas', price: 3.00, emoji: '💧', imageUrl: 'https://images.unsplash.com/photo-1520677097-36e788c1c4e7?w=400&h=400&fit=crop', desc: 'Agua mineral natural.', stock: 99 },
  { id: 21, name: 'Gaseosa Cola x 2L', category: 'bebidas', price: 7.00, emoji: '🥤', imageUrl: 'https://images.unsplash.com/photo-1554907976-5834927ed14b?w=400&h=400&fit=crop', desc: 'Gaseosa cola.', stock: 99 },
  { id: 22, name: 'Jugo de Naranja x 1L', category: 'bebidas', price: 8.00, emoji: '🍊', imageUrl: 'https://images.unsplash.com/photo-1561956692-487c66914ed0?w=400&h=400&fit=crop', desc: 'Jugo de naranja natural.', badge: 'Nuevo', stock: 20 },
  { id: 23, name: 'Cerveza Artesanal x 330ml', category: 'bebidas', price: 12.00, emoji: '🍺', imageUrl: 'https://images.unsplash.com/photo-1535955639-6dd19d722bf3?w=400&h=400&fit=crop', desc: 'Cerveza artesanal local.', stock: 25 },
  { id: 24, name: 'Inca Kola x 2L', category: 'bebidas', price: 7.50, emoji: '🥤', imageUrl: 'https://images.unsplash.com/photo-1543253687-c931c8e01855?w=400&h=400&fit=crop', desc: 'La gaseosa peruana más tradicional.', stock: 80 },
  { id: 25, name: 'Café Molido x 250g', category: 'bebidas', price: 15.00, emoji: '☕', imageUrl: 'https://images.unsplash.com/photo-1495474472235-51543232c96c?w=400&h=400&fit=crop', desc: 'Café peruano de altura.', badge: 'Oferta', stock: 15 },
  { id: 26, name: 'Arroz Extra x 5kg', category: 'despensa', price: 18.50, emoji: '🍚', imageUrl: 'https://images.unsplash.com/photo-1586281825-1e35a82dc437?w=400&h=400&fit=crop', desc: 'Arroz extra premium.', badge: 'Oferta', stock: 99 },
  { id: 27, name: 'Fideos Spaghetti x 500g', category: 'despensa', price: 4.00, emoji: '🍝', imageUrl: 'https://images.unsplash.com/photo-1561276566-51d6c307ecd5?w=400&h=400&fit=crop', desc: 'Fideos de pasta dura.', stock: 99 },
  { id: 28, name: 'Aceite Vegetal x 1L', category: 'despensa', price: 9.00, emoji: '🫒', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', desc: 'Aceite vegetal puro.', stock: 70 },
  { id: 29, name: 'Azúcar Blanca x 2kg', category: 'despensa', price: 7.00, emoji: '🍬', imageUrl: 'https://images.unsplash.com/photo-1580234795-5853fdeef2e9?w=400&h=400&fit=crop', desc: 'Azúcar blanca refinada.', stock: 60 },
  { id: 30, name: 'Sal de Mesa x 500g', category: 'despensa', price: 2.00, emoji: '🧂', imageUrl: 'https://images.unsplash.com/photo-1474222175044-ed3e1e5f5f7a?w=400&h=400&fit=crop', desc: 'Sal de mesa fina.', stock: 90 },
  { id: 31, name: 'Lentejas x 500g', category: 'despensa', price: 5.50, emoji: '🫘', imageUrl: 'https://images.unsplash.com/photo-1515543089-651c37368502?w=400&h=400&fit=crop', desc: 'Lentejas seleccionadas.', stock: 50 },
  { id: 32, name: 'Atún en Lata x 170g', category: 'despensa', price: 5.00, emoji: '🥫', imageUrl: 'https://images.unsplash.com/photo-1580537655944-890c6cd8d15a?w=400&h=400&fit=crop', desc: 'Atún en aceite vegetal.', stock: 40 },
  { id: 33, name: 'Salsa de Tomate x 500g', category: 'despensa', price: 6.50, emoji: '🥫', imageUrl: 'https://images.unsplash.com/photo-1593437890082-5f4d25eb6b3a?w=400&h=400&fit=crop', desc: 'Salsa de tomate casera.', stock: 30 },
  { id: 34, name: 'Detergente Líquido x 1L', category: 'limpieza', price: 12.00, emoji: '🧴', imageUrl: 'https://images.unsplash.com/photo-1556741292-23f2f0174ca9?w=400&h=400&fit=crop', desc: 'Detergente líquido concentrado.', stock: 55 },
  { id: 35, name: 'Lavavajillas x 750ml', category: 'limpieza', price: 8.00, emoji: '🧼', imageUrl: 'https://images.unsplash.com/photo-1584820926498-91c0b88d7d6b?w=400&h=400&fit=crop', desc: 'Lavavajillas con poder desengrasante.', stock: 40 },
  { id: 36, name: 'Lejía x 1L', category: 'limpieza', price: 4.50, emoji: '🧪', imageUrl: 'https://images.unsplash.com/photo-1584620612-da180862024c?w=400&h=400&fit=crop', desc: 'Lejía concentrada.', stock: 60 },
  { id: 37, name: 'Papel Higiénico x 12 rollos', category: 'limpieza', price: 16.00, emoji: '🧻', imageUrl: 'https://images.unsplash.com/photo-1584622129-9e8c335bb52d?w=400&h=400&fit=crop', desc: 'Papel higiénico suave.', badge: 'Oferta', stock: 35 },
  { id: 38, name: 'Esponja Multiusos x 3', category: 'limpieza', price: 4.00, emoji: '🧽', imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop', desc: 'Esponjas resistentes.', stock: 50 },
  { id: 39, name: 'Papas Fritas x 150g', category: 'snacks', price: 5.00, emoji: '🍟', imageUrl: 'https://images.unsplash.com/photo-1566843431-29e2467d3f94?w=400&h=400&fit=crop', desc: 'Papas fritas crocantes.', stock: 0 },
  { id: 40, name: 'Chocolate con Leche x 100g', category: 'snacks', price: 7.00, emoji: '🍫', imageUrl: 'https://images.unsplash.com/photo-1511388099-06041cc93976?w=400&h=400&fit=crop', desc: 'Chocolate cremoso.', stock: 30 },
  { id: 41, name: 'Mix de Frutos Secos x 200g', category: 'snacks', price: 12.00, emoji: '🥜', imageUrl: 'https://images.unsplash.com/photo-1605209724995-acf70aca25a5?w=400&h=400&fit=crop', desc: 'Mix de almendras, nueces y pasas.', badge: 'Nuevo', stock: 20 },
  { id: 42, name: 'Chizitos x 200g', category: 'snacks', price: 4.50, emoji: '🫘', imageUrl: 'https://images.unsplash.com/photo-1550686041-366bd7f57aa3?w=400&h=400&fit=crop', desc: 'Snack crocante de maíz.', stock: 45 },
  { id: 43, name: 'Pollo Entero x 2kg', category: 'carnes', price: 22.00, emoji: '🍗', imageUrl: 'https://images.unsplash.com/photo-1604569926-53818e3a246a?w=400&h=400&fit=crop', desc: 'Pollo fresco de corral.', badge: 'Oferta', stock: 20 },
  { id: 44, name: 'Carne Molida x 500g', category: 'carnes', price: 15.00, emoji: '🥩', imageUrl: 'https://images.unsplash.com/photo-1543352633-3dc84e460492?w=400&h=400&fit=crop', desc: 'Carne molida de res.', stock: 25 },
  { id: 45, name: 'Pechuga de Pollo x 500g', category: 'carnes', price: 13.00, emoji: '🍗', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop', desc: 'Pechuga de pollo fresca.', stock: 0 },
  { id: 46, name: 'Chorizo Parrillero x 400g', category: 'carnes', price: 14.00, emoji: '🌭', imageUrl: 'https://images.unsplash.com/photo-1559981835-520c8411d943?w=400&h=400&fit=crop', desc: 'Chorizo artesanal para parrilla.', stock: 30 },
  { id: 47, name: 'Pescado Fresco x 500g', category: 'carnes', price: 18.00, emoji: '🐟', imageUrl: 'https://images.unsplash.com/photo-1519708277-2708304245cc?w=400&h=400&fit=crop', desc: 'Filete de pescado fresco.', badge: 'Nuevo', stock: 15 }
];

const CATEGORIES = [
  { id: 'frutas', name: 'Frutas y Verduras', icon: 'fa-solid fa-apple-whole', color: '#E74C3C' },
  { id: 'lacteos', name: 'Lácteos', icon: 'fa-solid fa-cow', color: '#3498DB' },
  { id: 'panaderia', name: 'Panadería', icon: 'fa-solid fa-bread-slice', color: '#E67E22' },
  { id: 'bebidas', name: 'Bebidas', icon: 'fa-solid fa-wine-bottle', color: '#9B59B6' },
  { id: 'despensa', name: 'Despensa', icon: 'fa-solid fa-wheat-awn', color: '#F39C12' },
  { id: 'limpieza', name: 'Limpieza', icon: 'fa-solid fa-soap', color: '#1ABC9C' },
  { id: 'snacks', name: 'Snacks', icon: 'fa-solid fa-cookie', color: '#E91E63' },
  { id: 'carnes', name: 'Carnes y Pollo', icon: 'fa-solid fa-drumstick-bite', color: '#D35400' }
];

// ===== PRODUCT MANAGER =====
class ProductManager {
  constructor() {
    this._products = [];
    this._nextId = 1;
    this._listeners = [];
    this._load();
  }
  onChange(fn) { this._listeners.push(fn); }
  _notify() { this._listeners.forEach(fn => fn(this.getAll())); }
  getAll() { return [...this._products]; }
  getById(id) { return this._products.find(p => p.id === id); }
  getByCategory(categoryId) { return this._products.filter(p => p.category === categoryId); }
  search(term) {
    const t = term.toLowerCase();
    return this._products.filter(p => p.name.toLowerCase().includes(t) || p.desc.toLowerCase().includes(t));
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
    this._save(); this._notify();
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
    this._save(); this._notify();
    return product;
  }
  delete(id) {
    this._products = this._products.filter(p => p.id !== id);
    this._save(); this._notify();
  }
  get count() { return this._products.length; }
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
    this._products = DEFAULT_PRODUCTS.map(p => ({ ...p }));
    this._nextId = Math.max(...this._products.map(p => p.id), 0) + 1;
    this._save();
  }
  _save() {
    try { localStorage.setItem('mdj_products', JSON.stringify(this._products)); } catch {}
  }
}

// ===== ORDER HISTORY =====
class OrderHistory {
  constructor() {
    this._orders = [];
    this._listeners = [];
    this._load();
  }
  onChange(fn) { this._listeners.push(fn); }
  _notify() { this._listeners.forEach(fn => fn(this.getAll())); }
  getAll() { return [...this._orders]; }
  getById(id) { return this._orders.find(o => o.id === id); }
  updateStatus(id, newStatus) {
    const order = this._orders.find(o => o.id === id);
    if (!order) return false;
    order.status = newStatus;
    this._save(); this._notify();
    return true;
  }
  get totalRevenue() { return this._orders.reduce((sum, o) => sum + (o.total || 0), 0); }
  get uniqueClients() { return new Set(this._orders.map(o => o.phone)).size; }
  get count() { return this._orders.length; }
  _load() {
    try {
      const stored = localStorage.getItem('mdj_orders');
      if (stored) this._orders = JSON.parse(stored);
    } catch {}
  }
  _save() {
    try { localStorage.setItem('mdj_orders', JSON.stringify(this._orders)); } catch {}
  }
}

// ===== INIT =====
const productManager = new ProductManager();
const orderHistory = new OrderHistory();

// ===== DOM =====
const adminLoginSection = document.getElementById('adminLoginSection');
const adminDashboard = document.getElementById('adminDashboard');
const adminPasswordInput = document.getElementById('adminPasswordInput');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLoginError = document.getElementById('adminLoginError');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const adminTabs = document.querySelectorAll('.admin-tab');
const adminTabContents = document.querySelectorAll('.admin-tab-content');
const adminProductsBody = document.getElementById('adminProductsBody');
const adminOrdersBody = document.getElementById('adminOrdersBody');
const adminOrdersEmpty = document.getElementById('adminOrdersEmpty');
const adminOrdersTableWrap = document.getElementById('adminOrdersTableWrap');
const adminAddProductBtn = document.getElementById('adminAddProductBtn');
const statProducts = document.getElementById('statProducts');
const statOrders = document.getElementById('statOrders');
const statRevenue = document.getElementById('statRevenue');
const statClients = document.getElementById('statClients');
const adminToast = document.getElementById('adminToast');

// Admin Form
const adminFormOverlay = document.getElementById('adminFormOverlay');
const adminFormModal = document.getElementById('adminFormModal');
const adminFormClose = document.getElementById('adminFormClose');
const adminFormCancel = document.getElementById('adminFormCancel');
const adminFormTitle = document.getElementById('adminFormTitle');
const adminFormProductId = document.getElementById('adminFormProductId');
const adminFormName = document.getElementById('adminFormName');
const adminFormCategory = document.getElementById('adminFormCategory');
const adminFormPrice = document.getElementById('adminFormPrice');
const adminFormEmoji = document.getElementById('adminFormEmoji');
const adminFormImageUrl = document.getElementById('adminFormImageUrl');
const adminFormDesc = document.getElementById('adminFormDesc');
const adminFormBadge = document.getElementById('adminFormBadge');
const adminFormStock = document.getElementById('adminFormStock');
const adminFormSave = document.getElementById('adminFormSave');
const adminFormError = document.getElementById('adminFormError');

// ===== UTILITIES =====
function formatPrice(amount) { return 'S/ ' + amount.toFixed(2); }
function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
function getCategoryName(categoryId) { const c = CATEGORIES.find(c => c.id === categoryId); return c ? c.name : categoryId; }
function getProductImage(product) { return product.imageUrl || null; }

function showAdminToast(message) {
  adminToast.textContent = message;
  adminToast.classList.add('show');
  clearTimeout(adminToast._timeout);
  adminToast._timeout = setTimeout(() => adminToast.classList.remove('show'), 2500);
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
    d.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

function getStatusLabel(status) {
  const labels = { pending: 'Pendiente', confirmed: 'Confirmado', shipping: 'En envío', delivered: 'Entregado', cancelled: 'Cancelado' };
  return labels[status] || status;
}

// ===== AUTH =====
const ADMIN_PASSWORD = 'admin123';
let isAdminLoggedIn = false;

function handleAdminLogin() {
  const pass = adminPasswordInput.value.trim();
  if (pass === ADMIN_PASSWORD) {
    isAdminLoggedIn = true;
    adminLoginSection.style.display = 'none';
    adminDashboard.style.display = '';
    switchAdminTab('products');
    renderAdminProducts();
    renderAdminOrders();
    renderAdminStats();
    showAdminToast('👋 Bienvenido al panel de administración');
  } else {
    adminLoginError.textContent = '❌ Contraseña incorrecta';
    adminPasswordInput.value = '';
    adminPasswordInput.focus();
  }
}

function handleAdminLogout() {
  isAdminLoggedIn = false;
  adminDashboard.style.display = 'none';
  adminLoginSection.style.display = '';
  adminPasswordInput.value = '';
  adminLoginError.textContent = '';
}

// ===== TABS =====
function switchAdminTab(tabId) {
  adminTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabId));
  adminTabContents.forEach(content => {
    content.classList.toggle('active', content.id === 'adminTab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  });
}

// ===== RENDER PRODUCTS TABLE =====
function renderAdminProducts() {
  const products = productManager.getAll();
  adminProductsBody.innerHTML = '';
  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Producto">
        <div class="product-cell">
          ${getProductImage(p)
            ? `<img class="product-cell-img" src="${p.imageUrl}?w=60&h=60&fit=crop" alt="${escapeHtml(p.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
               <div class="product-cell-emoji" style="display:none">${p.emoji || '📦'}</div>`
            : `<div class="product-cell-emoji">${p.emoji || '📦'}</div>`}
          <div>
            <div class="product-cell-name">${escapeHtml(p.name)}</div>
          </div>
        </div>
      </td>
      <td data-label="Categoría"><span class="admin-category-badge">${getCategoryName(p.category)}</span></td>
      <td data-label="Precio"><span class="admin-price">${formatPrice(p.price)}</span></td>
      <td data-label="Stock"><span class="admin-stock ${p.stock <= 0 ? 'out' : ''}">${p.stock !== undefined ? p.stock : '—'}</span></td>
      <td data-label="Destacado">${p.badge ? `<span class="admin-badge ${p.badge === 'Oferta' ? 'oferta' : 'nuevo'}">${p.badge}</span>` : '—'}</td>
      <td data-label="Acciones">
        <div class="admin-actions">
          <button class="admin-action edit" data-id="${p.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="admin-action del" data-id="${p.id}" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </td>
    `;
    adminProductsBody.appendChild(tr);
  });
  adminProductsBody.querySelectorAll('.edit').forEach(btn => {
    btn.addEventListener('click', () => openAdminForm(parseInt(btn.dataset.id)));
  });
  adminProductsBody.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', () => handleDeleteProduct(parseInt(btn.dataset.id)));
  });
}

// ===== RENDER ORDERS TABLE =====
function renderAdminOrders() {
  const orders = orderHistory.getAll();
  if (orders.length === 0) {
    adminOrdersEmpty.style.display = '';
    adminOrdersTableWrap.style.display = 'none';
    return;
  }
  adminOrdersEmpty.style.display = 'none';
  adminOrdersTableWrap.style.display = '';
  adminOrdersBody.innerHTML = '';
  orders.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="N° Pedido"><strong>${order.id}</strong></td>
      <td data-label="Cliente">${escapeHtml(order.name)}<br><small style="color:var(--text-tertiary)">${order.phone}</small></td>
      <td data-label="Total" class="admin-price">${formatPrice(order.total)}</td>
      <td data-label="Fecha"><small style="color:var(--text-tertiary)">${formatDate(order.createdAt)}</small></td>
      <td data-label="Estado">
        <select class="admin-status-select" data-id="${order.id}">
          <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>⏳ Pendiente</option>
          <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>✅ Confirmado</option>
          <option value="shipping" ${order.status === 'shipping' ? 'selected' : ''}>🚚 En envío</option>
          <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>📦 Entregado</option>
          <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>❌ Cancelado</option>
        </select>
      </td>
      <td data-label="Acciones">
        <button class="admin-action view" data-id="${order.id}" title="Ver detalle"><i class="fa-solid fa-eye"></i></button>
      </td>
    `;
    adminOrdersBody.appendChild(tr);
  });
  adminOrdersBody.querySelectorAll('.admin-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const id = sel.dataset.id;
      orderHistory.updateStatus(id, sel.value);
      showAdminToast(`✅ Pedido ${id} → ${getStatusLabel(sel.value)}`);
      renderAdminStats();
    });
  });
  adminOrdersBody.querySelectorAll('.view').forEach(btn => {
    btn.addEventListener('click', () => showOrderDetail(btn.dataset.id));
  });
}

function showOrderDetail(orderId) {
  const order = orderHistory.getById(orderId);
  if (!order) return;
  const itemsHtml = (order.items || []).map(i =>
    `  ${i.productEmoji || '📦'} ${i.productName} x${i.quantity} = ${formatPrice(i.price * i.quantity)}`
  ).join('\n');
  const msg = `📋 Pedido: ${order.id}\n📅 ${formatDate(order.createdAt)}\n👤 ${order.name}\n📞 ${order.phone}\n📍 ${order.address}\n💳 ${order.payment}\n📌 Estado: ${getStatusLabel(order.status)}${order.notes ? '\n📝 Notas: ' + order.notes : ''}\n\n🛒 Productos:\n${itemsHtml}\n\nSubtotal: ${formatPrice(order.subtotal)}\nEnvío: ${order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}\n💵 TOTAL: ${formatPrice(order.total)}`;
  alert(msg);
}

// ===== RENDER STATS =====
function renderAdminStats() {
  statProducts.textContent = productManager.count;
  statOrders.textContent = orderHistory.count;
  statRevenue.textContent = formatPrice(orderHistory.totalRevenue);
  statClients.textContent = orderHistory.uniqueClients;
}

// ===== PRODUCT FORM =====
function openAdminForm(productId) {
  adminFormError.textContent = '';
  adminFormProductId.value = '';
  adminFormCategory.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    adminFormCategory.appendChild(opt);
  });
  if (productId) {
    const p = productManager.getById(productId);
    if (!p) return;
    adminFormTitle.innerHTML = '<i class="fa-solid fa-pen"></i> Editar Producto';
    adminFormProductId.value = productId;
    adminFormName.value = p.name;
    adminFormCategory.value = p.category;
    adminFormPrice.value = p.price;
    adminFormEmoji.value = p.emoji || '';
    adminFormImageUrl.value = p.imageUrl || '';
    adminFormDesc.value = p.desc;
    adminFormBadge.value = p.badge || '';
    adminFormStock.value = p.stock !== undefined ? p.stock : 99;
  } else {
    adminFormTitle.innerHTML = '<i class="fa-solid fa-plus"></i> Nuevo Producto';
    adminFormName.value = '';
    adminFormCategory.value = CATEGORIES[0].id;
    adminFormPrice.value = '';
    adminFormEmoji.value = '';
    adminFormImageUrl.value = '';
    adminFormDesc.value = '';
    adminFormBadge.value = '';
    adminFormStock.value = '99';
  }
  adminFormOverlay.classList.remove('hidden');
  adminFormModal.classList.remove('hidden');
  setTimeout(() => adminFormName.focus(), 200);
}

function closeAdminForm() {
  adminFormOverlay.classList.add('hidden');
  adminFormModal.classList.add('hidden');
}

function handleSaveProduct() {
  const id = adminFormProductId.value ? parseInt(adminFormProductId.value) : null;
  const name = adminFormName.value.trim();
  const category = adminFormCategory.value;
  const price = adminFormPrice.value;
  const emoji = adminFormEmoji.value.trim();
  const imageUrl = adminFormImageUrl.value.trim();
  const desc = adminFormDesc.value.trim();
  const badge = adminFormBadge.value;
  const stock = adminFormStock.value;
  if (!name) { adminFormError.textContent = 'El nombre es obligatorio'; adminFormName.focus(); return; }
  if (!price || isNaN(price) || parseFloat(price) <= 0) { adminFormError.textContent = 'Precio inválido'; adminFormPrice.focus(); return; }
  if (stock === '' || isNaN(stock) || parseInt(stock) < 0) { adminFormError.textContent = 'Stock inválido'; adminFormStock.focus(); return; }
  const data = { name, category, price, emoji, imageUrl, desc, badge, stock };
  if (id) {
    productManager.update(id, data);
    showAdminToast('✅ Producto actualizado');
  } else {
    productManager.add(data);
    showAdminToast('✅ Producto agregado');
  }
  closeAdminForm();
  renderAdminProducts();
  renderAdminStats();
}

function handleDeleteProduct(id) {
  const p = productManager.getById(id);
  if (!p) return;
  if (confirm(`¿Eliminar "${p.name}" permanentemente?`)) {
    productManager.delete(id);
    showAdminToast(`🗑️ "${p.name}" eliminado`);
    renderAdminProducts();
    renderAdminStats();
  }
}

// ===== DARK MODE =====
function initDarkMode() {
  const toggle = document.getElementById('adminDarkToggle');
  const icon = toggle.querySelector('i');
  const saved = localStorage.getItem('mdj_dark_mode');
  // Apply saved preference, or fall back to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved !== null ? saved === 'true' : prefersDark;
  if (isDark) {
    document.body.classList.add('dark-mode');
    icon.className = 'fa-solid fa-sun';
  } else {
    document.body.classList.remove('dark-mode');
    icon.className = 'fa-solid fa-moon';
  }
  toggle.addEventListener('click', () => {
    const nowDark = document.body.classList.toggle('dark-mode');
    icon.className = nowDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    localStorage.setItem('mdj_dark_mode', nowDark);
  });
}

// ===== EVENT LISTENERS =====
function setupListeners() {
  adminLoginBtn.addEventListener('click', handleAdminLogin);
  adminPasswordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAdminLogin(); });
  adminLogoutBtn.addEventListener('click', handleAdminLogout);
  adminTabs.forEach(tab => tab.addEventListener('click', () => switchAdminTab(tab.dataset.tab)));
  adminAddProductBtn.addEventListener('click', () => openAdminForm(null));
  adminFormOverlay.addEventListener('click', closeAdminForm);
  adminFormClose.addEventListener('click', closeAdminForm);
  adminFormCancel.addEventListener('click', closeAdminForm);
  adminFormSave.addEventListener('click', handleSaveProduct);
  adminFormName.addEventListener('keydown', (e) => { if (e.key === 'Enter') adminFormCategory.focus(); });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setupListeners();
  initDarkMode();
  document.getElementById('adminPasswordInput').focus();
  console.log('🔐 Panel Admin — Mercado Don José');
  console.log(`📦 ${productManager.count} productos · ${orderHistory.count} pedidos`);
});
