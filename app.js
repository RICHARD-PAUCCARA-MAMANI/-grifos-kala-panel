// ===== IndexedDB Persistence =====
class IDBStore {
  constructor(dbName = 'freebuff-pins', storeName = 'photos') {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 2);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'email' });
        }
        if (!db.objectStoreNames.contains('boards')) {
          db.createObjectStore('boards', { keyPath: 'id' });
        }
      };
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(store) {
    const s = store || this.storeName;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(s, 'readonly');
      const objectStore = tx.objectStore(s);
      const request = objectStore.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async put(item, store) {
    const s = store || this.storeName;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(s, 'readwrite');
      const objectStore = tx.objectStore(s);
      const request = objectStore.put(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(id, store) {
    const s = store || this.storeName;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(s, 'readwrite');
      const objectStore = tx.objectStore(s);
      const request = objectStore.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async get(id, store) {
    const s = store || this.storeName;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(s, 'readonly');
      const objectStore = tx.objectStore(s);
      const request = objectStore.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async clear(store) {
    const s = store || this.storeName;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(s, 'readwrite');
      const objectStore = tx.objectStore(s);
      const request = objectStore.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// ===== Auth System =====
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this._idb = null;
    this._listeners = [];
  }

  async init() {
    this._idb = new IDBStore();
    await this._idb.open();
    // Check for saved session
    const saved = localStorage.getItem('pins_current_user');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch {
        localStorage.removeItem('pins_current_user');
      }
    }
    return this.currentUser;
  }

  onAuthChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.currentUser));
  }

  async signup(name, email, password) {
    if (!name || !email || !password) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }
    if (password.length < 6) {
      return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    }
    try {
      const existing = await this._idb.get(email, 'users');
      if (existing) {
        return { success: false, error: 'Este correo ya está registrado' };
      }
      const user = {
        email,
        name,
        password, // In a real app, hash this!
        avatar: null,
        bio: 'Amante de la fotografía 📸',
        createdAt: Date.now()
      };
      await this._idb.put(user, 'users');
      this.currentUser = { email, name, avatar: null, bio: user.bio };
      localStorage.setItem('pins_current_user', JSON.stringify(this.currentUser));
      this._notify();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error al registrar: ' + err.message };
    }
  }

  async login(email, password) {
    if (!email || !password) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }
    try {
      const user = await this._idb.get(email, 'users');
      if (!user) {
        return { success: false, error: 'Credenciales inválidas' };
      }
      if (user.password !== password) {
        return { success: false, error: 'Credenciales inválidas' };
      }
      this.currentUser = { email: user.email, name: user.name, avatar: user.avatar, bio: user.bio };
      localStorage.setItem('pins_current_user', JSON.stringify(this.currentUser));
      this._notify();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error al iniciar sesión: ' + err.message };
    }
  }

  async loginWithGoogle() {
    // Simulated Google login
    const demoUser = { email: 'google@demo.com', name: 'Usuario Google', avatar: null, bio: 'Amante de la fotografía 📸' };
    await this._idb.put({
      email: demoUser.email,
      name: demoUser.name,
      password: 'google_demo',
      avatar: null,
      bio: demoUser.bio,
      createdAt: Date.now()
    }, 'users');
    this.currentUser = demoUser;
    localStorage.setItem('pins_current_user', JSON.stringify(this.currentUser));
    this._notify();
    return { success: true };
  }

  async loginWithGithub() {
    // Simulated GitHub login
    const demoUser = { email: 'github@demo.com', name: 'Dev User', avatar: null, bio: 'Código y fotos 🚀' };
    await this._idb.put({
      email: demoUser.email,
      name: demoUser.name,
      password: 'github_demo',
      avatar: null,
      bio: demoUser.bio,
      createdAt: Date.now()
    }, 'users');
    this.currentUser = demoUser;
    localStorage.setItem('pins_current_user', JSON.stringify(this.currentUser));
    this._notify();
    return { success: true };
  }

  async updateProfile(name, avatar, bio) {
    if (!this.currentUser) return { success: false, error: 'No hay sesión activa' };
    const email = this.currentUser.email;
    try {
      const user = await this._idb.get(email, 'users');
      if (!user) return { success: false, error: 'Usuario no encontrado' };
      if (name) user.name = name.trim();
      if (bio !== undefined) user.bio = bio.trim();
      if (avatar !== undefined) user.avatar = avatar;
      await this._idb.put(user, 'users');
      this.currentUser = { email: user.email, name: user.name, avatar: user.avatar, bio: user.bio };
      localStorage.setItem('pins_current_user', JSON.stringify(this.currentUser));
      this._notify();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error al actualizar perfil: ' + err.message };
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('pins_current_user');
    this._notify();
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }
}

// ===== Photo Manager =====
class PhotoManager {
  constructor() {
    this.photos = [];
    this.idCounter = 0;
    this._idb = null;
    this._listeners = [];
    this._dataUrls = new Map(); // Map of id -> dataUrl for persistence
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.getAll()));
  }

  async init(idb) {
    this._idb = idb;
    try {
      const stored = await this._idb.getAll('photos');
      for (const item of stored) {
        let dataUrl = item.dataUrl;
        // If blob exists, convert to data URL
        if (item.blob && !dataUrl) {
          dataUrl = await this._blobToDataUrl(item.blob);
        }
        if (dataUrl) {
          this._dataUrls.set(item.id, dataUrl);
          this.photos.push({
            id: item.id,
            title: item.title,
            description: item.description,
            author: item.author,
            authorEmail: item.authorEmail,
            createdAt: item.createdAt,
            likes: item.likes || 0,
            saved: item.saved || 0,
            tags: item.tags || [],
            size: item.size,
            dataUrl: dataUrl
          });
          if (item.id >= this.idCounter) this.idCounter = item.id + 1;
        }
      }
      this.photos.sort((a, b) => b.createdAt - a.createdAt);
      console.log(`📸 Cargadas ${this.photos.length} fotos desde IndexedDB`);
    } catch (err) {
      console.warn('⚠️ Error cargando fotos:', err.message);
    }
    this._notify();
  }

  _blobToDataUrl(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  _dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bytes = atob(parts[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
  }

  async addPhotos(files, author, authorEmail) {
    const added = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      const id = this.idCounter++;
      const dataUrl = await this._fileToDataUrl(file);
      this._dataUrls.set(id, dataUrl);
      
      const photo = {
        id,
        title: this._cleanFileName(file.name),
        description: 'Compartido por ' + author,
        author,
        authorEmail,
        createdAt: Date.now(),
        likes: 0,
        saved: 0,
        tags: [],
        size: file.size,
        dataUrl
      };
      this.photos.unshift(photo);
      added.push(photo);

      // Persist to IndexedDB (store as dataUrl for simplicity)
      if (this._idb) {
        try {
          await this._idb.put({
            id: photo.id,
            dataUrl: dataUrl,
            title: photo.title,
            description: photo.description,
            author: photo.author,
            authorEmail: photo.authorEmail,
            createdAt: photo.createdAt,
            likes: photo.likes,
            saved: photo.saved,
            tags: photo.tags,
            size: photo.size
          }, 'photos');
        } catch (err) {
          console.warn('⚠️ Error guardando foto:', err.message);
        }
      }
    }
    this._notify();
    return added;
  }

  _fileToDataUrl(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  async deletePhoto(id) {
    const idx = this.photos.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.photos.splice(idx, 1);
    this._dataUrls.delete(id);
    if (this._idb) {
      try {
        await this._idb.delete(id, 'photos');
      } catch (err) {
        console.warn('⚠️ Error eliminando foto:', err.message);
      }
    }
    this._notify();
    return true;
  }

  async clearAll() {
    this.photos = [];
    this._dataUrls.clear();
    this.idCounter = 0;
    if (this._idb) {
      try {
        await this._idb.clear('photos');
      } catch (err) {
        console.warn('⚠️ Error limpiando fotos:', err.message);
      }
    }
    this._notify();
  }

  getPhoto(id) {
    return this.photos.find(p => p.id === id);
  }

  getPhotosByUser(email) {
    return this.photos.filter(p => p.authorEmail === email);
  }

  getAll() {
    return [...this.photos];
  }

  get count() {
    return this.photos.length;
  }

  get totalLikes() {
    return this.photos.reduce((acc, p) => acc + (p.likes || 0), 0);
  }

  get totalSaved() {
    return this.photos.reduce((acc, p) => acc + (p.saved || 0), 0);
  }

  toggleLike(id) {
    const photo = this.getPhoto(id);
    if (!photo) return false;
    photo.likes = (photo.likes || 0) + 1;
    this._persistUpdate(photo);
    this._notify();
    return true;
  }

  toggleSave(id) {
    const photo = this.getPhoto(id);
    if (!photo) return false;
    photo.saved = (photo.saved || 0) + 1;
    this._persistUpdate(photo);
    this._notify();
    return true;
  }

  _persistUpdate(photo) {
    if (!this._idb) return;
    this._idb.put({
      id: photo.id,
      dataUrl: photo.dataUrl,
      title: photo.title,
      description: photo.description,
      author: photo.author,
      authorEmail: photo.authorEmail,
      createdAt: photo.createdAt,
      likes: photo.likes,
      saved: photo.saved,
      tags: photo.tags,
      size: photo.size
    }, 'photos').catch(err => console.warn('⚠️ Error actualizando:', err.message));
  }

  _cleanFileName(name) {
    return name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim() || 'Foto sin nombre';
  }
}

// ===== Board Manager =====
class BoardManager {
  constructor() {
    this.boards = [];
    this.idCounter = 1;
    this._idb = null;
    this._listeners = [];
  }

  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.getAll()));
  }

  async init(idb) {
    this._idb = idb;
    try {
      const stored = await this._idb.getAll('boards');
      this.boards = stored || [];
      for (const b of this.boards) {
        if (b.id >= this.idCounter) this.idCounter = b.id + 1;
      }
      this.boards.sort((a, b) => b.createdAt - a.createdAt);
      console.log(`📋 Cargados ${this.boards.length} tableros desde IndexedDB`);
    } catch (err) {
      console.warn('⚠️ Error cargando tableros:', err.message);
    }
    this._notify();
  }

  async createBoard(name, description, coverColor, ownerEmail) {
    const board = {
      id: this.idCounter++,
      name: name.trim(),
      description: (description || '').trim(),
      coverColor: coverColor || '#E60023',
      ownerEmail,
      createdAt: Date.now(),
      photoIds: []
    };
    this.boards.unshift(board);
    if (this._idb) {
      await this._idb.put(board, 'boards').catch(err => console.warn('⚠️ Error guardando tablero:', err.message));
    }
    this._notify();
    return board;
  }

  async deleteBoard(id) {
    const idx = this.boards.findIndex(b => b.id === id);
    if (idx === -1) return false;
    this.boards.splice(idx, 1);
    if (this._idb) {
      await this._idb.delete(id, 'boards').catch(err => console.warn('⚠️ Error eliminando tablero:', err.message));
    }
    this._notify();
    return true;
  }

  async addPhotoToBoard(boardId, photoId) {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return false;
    if (!board.photoIds.includes(photoId)) {
      board.photoIds.push(photoId);
      if (this._idb) {
        await this._idb.put(board, 'boards').catch(err => console.warn('⚠️ Error actualizando tablero:', err.message));
      }
      this._notify();
    }
    return true;
  }

  async removePhotoFromBoard(boardId, photoId) {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return false;
    board.photoIds = board.photoIds.filter(id => id !== photoId);
    if (this._idb) {
      await this._idb.put(board, 'boards').catch(err => console.warn('⚠️ Error actualizando tablero:', err.message));
    }
    this._notify();
    return true;
  }

  getBoardsByUser(email) {
    return this.boards.filter(b => b.ownerEmail === email);
  }

  getBoard(id) {
    return this.boards.find(b => b.id === id);
  }

  getAll() {
    return [...this.boards];
  }

  getPhotosForBoard(boardId, allPhotos) {
    const board = this.getBoard(boardId);
    if (!board) return [];
    return board.photoIds
      .map(id => allPhotos.find(p => p.id === id))
      .filter(Boolean);
  }
}

// ===== Initialize =====
const idb = new IDBStore();
const auth = new AuthSystem();
const photos = new PhotoManager();
const boards = new BoardManager();

// ===== DOM References =====
// Auth
const authOverlay = document.getElementById('authOverlay');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirm = document.getElementById('signupConfirm');
const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');
const loginGoogleBtn = document.getElementById('loginGoogleBtn');
const loginGithubBtn = document.getElementById('loginGithubBtn');
const signupGoogleBtn = document.getElementById('signupGoogleBtn');
const signupGithubBtn = document.getElementById('signupGithubBtn');

// App
const app = document.getElementById('app');
const masonryGrid = document.getElementById('masonryGrid');
const emptyFeed = document.getElementById('emptyFeed');
const uploadArea = document.getElementById('uploadArea');
const uploadMainBtn = document.getElementById('uploadMainBtn');
const emptyUploadBtn = document.getElementById('emptyUploadBtn');
const fileInput = document.getElementById('fileInput');
const feedTitle = document.getElementById('feedTitle');
const feedSubtitle = document.getElementById('feedSubtitle');

// Stats
const statPhotos = document.getElementById('statPhotos');
const statSaved = document.getElementById('statSaved');
const statLikes = document.getElementById('statLikes');

// Nav
const navLinks = document.querySelectorAll('.topnav-link');
const profileMenuBtn = document.getElementById('profileMenuBtn');
const profileDropdown = document.getElementById('profileDropdown');
const navUserName = document.getElementById('navUserName');
const navAvatar = document.getElementById('navAvatar');
const dropdownName = document.getElementById('dropdownName');
const dropdownEmail = document.getElementById('dropdownEmail');
const dropdownAvatar = document.getElementById('dropdownAvatar');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');

// Pages
const pages = {
  home: document.getElementById('pageHome'),
  explore: document.getElementById('pageExplore'),
  boards: document.getElementById('pageBoards'),
  boardDetail: document.getElementById('pageBoardDetail'),
  profile: document.getElementById('pageProfile')
};

// Explore
const exploreGrid = document.getElementById('exploreGrid');
const exploreEmpty = document.getElementById('exploreEmpty');
const exploreFilter = document.getElementById('exploreFilter');
const exploreChips = document.querySelectorAll('.explore-chip');

// Boards
const boardsGrid = document.getElementById('boardsGrid');
const boardsEmpty = document.getElementById('boardsEmpty');
const createBoardBtn = document.getElementById('createBoardBtn');
const boardsEmptyBtn = document.getElementById('boardsEmptyBtn');

// Board Detail
const boardDetailTitle = document.getElementById('boardDetailTitle');
const boardDetailMeta = document.getElementById('boardDetailMeta');
const boardDetailDesc = document.getElementById('boardDetailDesc');
const boardDetailColor = document.getElementById('boardDetailColor');
const boardDetailGrid = document.getElementById('boardDetailGrid');
const boardDetailEmpty = document.getElementById('boardDetailEmpty');
const boardDetailBack = document.getElementById('boardDetailBack');
const boardDetailExport = document.getElementById('boardDetailExport');
const boardDetailDelete = document.getElementById('boardDetailDelete');

// Create Board Modal
const createBoardModal = document.getElementById('createBoardModal');
const createBoardClose = document.getElementById('createBoardClose');
const boardNameInput = document.getElementById('boardNameInput');
const boardDescInput = document.getElementById('boardDescInput');
const boardColorPicker = document.getElementById('boardColorPicker');
const createBoardSubmit = document.getElementById('createBoardSubmit');
const boardError = document.getElementById('boardError');

// Board Picker Modal
const boardPickerModal = document.getElementById('boardPickerModal');
const boardPickerClose = document.getElementById('boardPickerClose');
const boardPickerList = document.getElementById('boardPickerList');
const boardPickerNew = document.getElementById('boardPickerNew');

// Profile page
const profilePageName = document.getElementById('profilePageName');
const profilePageEmail = document.getElementById('profilePageEmail');
const profilePageAvatar = document.getElementById('profilePageAvatar');
const profilePageBio = document.getElementById('profilePageBio');
const profileEditBtn = document.getElementById('profileEditBtn');
const profileStatPhotos = document.getElementById('profileStatPhotos');
const profileStatSaved = document.getElementById('profileStatSaved');
const profileStatLikes_el = document.getElementById('profileStatLikes');
const profileGrid = document.getElementById('profileGrid');
const profileTabs = document.querySelectorAll('.profile-tab');

// Edit Profile Modal
const editProfileModal = document.getElementById('editProfileModal');
const editProfileClose = document.getElementById('editProfileClose');
const editAvatarPreview = document.getElementById('editAvatarPreview');
const editAvatarBtn = document.getElementById('editAvatarBtn');
const editAvatarInput = document.getElementById('editAvatarInput');
const editNameInput = document.getElementById('editNameInput');
const editBioInput = document.getElementById('editBioInput');
const editProfileSave = document.getElementById('editProfileSave');
const editProfileError = document.getElementById('editProfileError');

// Upload Modal
const uploadModal = document.getElementById('uploadModal');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalDropzone = document.getElementById('modalDropzone');
const modalSelectBtn = document.getElementById('modalSelectBtn');
const modalFileInput = document.getElementById('modalFileInput');
const modalPreview = document.getElementById('modalPreview');
const previewGrid = document.getElementById('previewGrid');
const previewCount = document.getElementById('previewCount');
const modalAddMore = document.getElementById('modalAddMore');
const modalUploadBtn = document.getElementById('modalUploadBtn');

// Pin Detail Modal
const pinModal = document.getElementById('pinModal');
const pinModalClose = document.getElementById('pinModalClose');
const pinDetailImg = document.getElementById('pinDetailImg');
const pinDetailTitle = document.getElementById('pinDetailTitle');
const pinDetailDesc = document.getElementById('pinDetailDesc');
const pinDetailAuthor = document.getElementById('pinDetailAuthor');
const pinDetailDate = document.getElementById('pinDetailDate');
const pinDetailTags = document.getElementById('pinDetailTags');
const pinSaveBtn = document.getElementById('pinSaveBtn');
const pinLikeBtn = document.getElementById('pinLikeBtn');
const pinDeleteBtn = document.getElementById('pinDeleteBtn');

// Toast
const toast = document.getElementById('toast');

// ===== Utility Functions =====
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

function formatDate(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `Hace ${days}d`;
  return new Date(timestamp).toLocaleDateString('es-ES');
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getRandomHeight() {
  // Return a random aspect ratio height (0.7 to 1.4 of width)
  const ratios = [1, 0.75, 0.8, 1.1, 1.25, 0.9, 1.15];
  return ratios[Math.floor(Math.random() * ratios.length)];
}

// ===== Auth UI =====
function showAuth() {
  authOverlay.classList.remove('hidden');
  app.classList.add('hidden');
}

function hideAuth() {
  authOverlay.classList.add('hidden');
  app.classList.remove('hidden');
}

function showLoginForm() {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginError.textContent = '';
  signupError.textContent = '';
}

function showSignupForm() {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  loginError.textContent = '';
  signupError.textContent = '';
}

// ===== Auth Event Listeners =====
showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  showSignupForm();
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  showLoginForm();
});

loginBtn.addEventListener('click', async () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value;
  loginError.textContent = 'Iniciando sesión...';
  loginError.style.color = 'var(--text-secondary)';
  const result = await auth.login(email, password);
  if (result.success) {
    loginError.textContent = '';
    hideAuth();
    onUserReady();
  } else {
    loginError.style.color = 'var(--red)';
    loginError.textContent = result.error;
  }
});

signupBtn.addEventListener('click', async () => {
  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;
  const confirm = signupConfirm.value;

  if (password !== confirm) {
    signupError.textContent = 'Las contraseñas no coinciden';
    return;
  }
  signupError.textContent = 'Registrando...';
  signupError.style.color = 'var(--text-secondary)';
  const result = await auth.signup(name, email, password);
  if (result.success) {
    signupError.textContent = '';
    hideAuth();
    onUserReady();
  } else {
    signupError.style.color = 'var(--red)';
    signupError.textContent = result.error;
  }
});

// Enter key support for auth
function handleAuthKeydown(e, btn) {
  if (e.key === 'Enter') btn.click();
}

loginPassword.addEventListener('keydown', (e) => handleAuthKeydown(e, loginBtn));
signupConfirm.addEventListener('keydown', (e) => handleAuthKeydown(e, signupBtn));

// Social auth buttons
loginGoogleBtn.addEventListener('click', async () => {
  const result = await auth.loginWithGoogle();
  if (result.success) {
    hideAuth();
    onUserReady();
    showToast('Iniciaste sesión con Google');
  }
});

loginGithubBtn.addEventListener('click', async () => {
  const result = await auth.loginWithGithub();
  if (result.success) {
    hideAuth();
    onUserReady();
    showToast('Iniciaste sesión con GitHub');
  }
});

signupGoogleBtn.addEventListener('click', async () => {
  const result = await auth.loginWithGoogle();
  if (result.success) {
    hideAuth();
    onUserReady();
    showToast('Te registraste con Google');
  }
});

signupGithubBtn.addEventListener('click', async () => {
  const result = await auth.loginWithGithub();
  if (result.success) {
    hideAuth();
    onUserReady();
    showToast('Te registraste con GitHub');
  }
});

// ===== App Initialization =====
async function init() {
  await idb.open();
  await auth.init();
  await photos.init(idb);
  await boards.init(idb);

  if (auth.isLoggedIn()) {
    hideAuth();
    onUserReady();
  } else {
    showAuth();
    showLoginForm();
  }

  // Listen for photo changes
  photos.onChange((allPhotos) => {
    renderGrid();
    updateStats();
    updateProfilePage();
    const activePage = document.querySelector('.page.active-page');
    if (activePage) {
      if (activePage.id === 'pageExplore') {
        renderExploreGrid(getActiveFilter());
      } else if (activePage.id === 'pageBoardDetail') {
        renderBoardDetail();
      }
    }
  });

  // Listen for board changes
  boards.onChange(() => {
    const activePage = document.querySelector('.page.active-page');
    if (activePage && activePage.id === 'pageBoards') {
      renderBoardsPage();
    }
  });
}

let _eventListenersAttached = false;

function onUserReady() {
  updateUserUI();
  renderGrid();
  updateStats();
  updateProfilePage();
  if (!_eventListenersAttached) {
    setupEventListeners();
    _eventListenersAttached = true;
  }
}

function updateUserUI() {
  const user = auth.currentUser;
  if (!user) return;
  navUserName.textContent = user.name;
  dropdownName.textContent = user.name;
  dropdownEmail.textContent = user.email;

  // Update avatars
  if (user.avatar) {
    navAvatar.innerHTML = `<img src="${user.avatar}" alt="${escapeHtml(user.name)}" />`;
    dropdownAvatar.innerHTML = `<img src="${user.avatar}" alt="${escapeHtml(user.name)}" />`;
  } else {
    navAvatar.innerHTML = '<i class="fa-regular fa-user"></i>';
    dropdownAvatar.innerHTML = '<i class="fa-regular fa-user"></i>';
  }
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
  // Profile dropdown
  profileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    profileDropdown.classList.remove('open');
  });

  // Logout
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.logout();
    photos.clearAll();
    showAuth();
    showLoginForm();
  });

  // Nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      showPage(page);
    });
  });

  // Upload buttons
  uploadMainBtn.addEventListener('click', () => openUploadModal());
  emptyUploadBtn.addEventListener('click', () => openUploadModal());
  uploadArea.addEventListener('click', (e) => {
    if (e.target === uploadArea || e.target.closest('.upload-hint')) {
      openUploadModal();
    }
  });

  // File input direct (from upload area)
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleDirectUpload(e.target.files);
    }
    fileInput.value = '';
  });

  // Upload modal
  modalClose.addEventListener('click', closeUploadModal);
  uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) closeUploadModal();
  });

  modalSelectBtn.addEventListener('click', () => modalFileInput.click());
  modalDropzone.addEventListener('click', () => modalFileInput.click());

  modalFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      showPreview(e.target.files);
    }
    modalFileInput.value = '';
  });

  modalAddMore.addEventListener('click', () => modalFileInput.click());
  modalUploadBtn.addEventListener('click', doUpload);

  // Drag & drop on modal dropzone
  modalDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    modalDropzone.classList.add('dragover');
  });

  modalDropzone.addEventListener('dragleave', () => {
    modalDropzone.classList.remove('dragover');
  });

  modalDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    modalDropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      showPreview(e.dataTransfer.files);
    }
  });

  // Search
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const term = searchInput.value.trim();
      const activePage = document.querySelector('.page.active-page');
      if (activePage && activePage.id === 'pageExplore') {
        renderExploreGrid(getActiveFilter(), term);
      } else {
        renderGrid(term);
      }
    }, 300);
  });

  // Edit Profile
  profileEditBtn.addEventListener('click', openEditProfileModal);

  editProfileClose.addEventListener('click', closeEditProfileModal);
  editProfileModal.addEventListener('click', (e) => {
    if (e.target === editProfileModal) closeEditProfileModal();
  });

  editAvatarBtn.addEventListener('click', () => editAvatarInput.click());
  editAvatarInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          _editAvatarDataUrl = ev.target.result;
          editAvatarPreview.innerHTML = `<img src="${_editAvatarDataUrl}" alt="Avatar" />`;
        };
        reader.readAsDataURL(file);
      }
    }
    editAvatarInput.value = '';
  });

  editProfileSave.addEventListener('click', handleSaveProfile);

  // Pin detail modal
  pinModalClose.addEventListener('click', closePinModal);
  pinModal.addEventListener('click', (e) => {
    if (e.target === pinModal) closePinModal();
  });

  // Pin detail actions
  pinSaveBtn.addEventListener('click', () => {
    if (pinModal._currentId !== undefined) {
      openBoardPicker(pinModal._currentId, () => {
        photos.toggleSave(pinModal._currentId);
      });
    }
  });

  pinLikeBtn.addEventListener('click', () => {
    if (pinModal._currentId !== undefined) {
      photos.toggleLike(pinModal._currentId);
      const heart = pinLikeBtn.querySelector('i');
      heart.className = 'fa-solid fa-heart';
      pinLikeBtn.style.color = 'var(--red)';
      showToast('¡Te gusta esta foto!');
    }
  });

  pinDeleteBtn.addEventListener('click', async () => {
    if (pinModal._currentId !== undefined) {
      const id = pinModal._currentId;
      closePinModal();
      await photos.deletePhoto(id);
      showToast('Foto eliminada');
    }
  });

  // Profile tabs
  profileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      profileTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateProfileGrid(tab.dataset.tab);
    });
  });

  // Dropdown items
  document.querySelectorAll('.dropdown-item[data-action]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      profileDropdown.classList.remove('open');
      const action = item.dataset.action;
      if (action === 'profile') {
        showPage('profile');
        navLinks.forEach(l => l.classList.remove('active'));
      }
    });
  });

  // Board create buttons
  createBoardBtn.addEventListener('click', () => openCreateBoardModal());
  boardsEmptyBtn.addEventListener('click', () => openCreateBoardModal());

  // Create board modal
  createBoardClose.addEventListener('click', closeCreateBoardModal);
  createBoardModal.addEventListener('click', (e) => {
    if (e.target === createBoardModal) closeCreateBoardModal();
  });
  createBoardSubmit.addEventListener('click', handleCreateBoard);

  // Color picker
  boardColorPicker.addEventListener('click', (e) => {
    const opt = e.target.closest('.board-color-opt');
    if (!opt) return;
    boardColorPicker.querySelectorAll('.board-color-opt').forEach(el => el.classList.remove('active'));
    opt.classList.add('active');
  });

  // Board name input enter key
  boardNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCreateBoard();
  });

  // Board picker modal
  boardPickerClose.addEventListener('click', closeBoardPicker);
  boardPickerModal.addEventListener('click', (e) => {
    if (e.target === boardPickerModal) closeBoardPicker();
  });
  boardPickerNew.addEventListener('click', () => {
    closeBoardPicker();
    openCreateBoardModal((newBoard) => {
      // After creating a board, save the current photo to it
      if (_pickerPhotoId !== null) {
        boards.addPhotoToBoard(newBoard.id, _pickerPhotoId);
        showToast('¡Guardado en ' + newBoard.name + '!');
        if (_pickerCallback) _pickerCallback(newBoard.id);
      }
      showPage('boards');
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector('[data-page="boards"]')?.classList.add('active');
    });
  });

  // Board detail export
  boardDetailExport.addEventListener('click', () => {
    const boardId = parseInt(boardDetailDelete.dataset.boardId);
    if (!isNaN(boardId)) {
      exportBoardAsJson(boardId);
    }
  });

  // Board detail back & delete
  boardDetailBack.addEventListener('click', () => {
    showPage('boards');
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('[data-page="boards"]')?.classList.add('active');
  });

  boardDetailDelete.addEventListener('click', async () => {
    const boardId = parseInt(boardDetailDelete.dataset.boardId);
    if (isNaN(boardId)) return;
    const board = boards.getBoard(boardId);
    if (!board) return;
    if (confirm(`¿Eliminar el tablero "${board.name}"?`)) {
      await boards.deleteBoard(boardId);
      showToast('Tablero eliminado');
      showPage('boards');
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector('[data-page="boards"]')?.classList.add('active');
    }
  });

  // Explore filter chips
  exploreChips.forEach(chip => {
    chip.addEventListener('click', () => {
      exploreChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderExploreGrid(chip.dataset.filter, searchInput.value.trim());
    });
  });

  // Keyboard: Escape to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeUploadModal();
      closePinModal();
      closeCreateBoardModal();
      closeBoardPicker();
      closeEditProfileModal();
    }
  });
}

// ===== Upload Modal =====
let pendingFiles = [];

function openUploadModal() {
  pendingFiles = [];
  modalDropzone.classList.remove('hidden');
  modalPreview.classList.add('hidden');
  uploadModal.classList.remove('hidden');
}

function closeUploadModal() {
  uploadModal.classList.add('hidden');
  pendingFiles = [];
}

function showPreview(files) {
  pendingFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
  if (pendingFiles.length === 0) {
    showToast('Por favor selecciona archivos de imagen');
    return;
  }
  modalDropzone.classList.add('hidden');
  modalPreview.classList.remove('hidden');
  renderPreview();
}

function renderPreview() {
  previewGrid.innerHTML = '';
  previewCount.textContent = `${pendingFiles.length} archivo${pendingFiles.length !== 1 ? 's' : ''} seleccionado${pendingFiles.length !== 1 ? 's' : ''}`;

  pendingFiles.forEach((file, idx) => {
    const url = URL.createObjectURL(file);
    const item = document.createElement('div');
    item.className = 'modal-preview-item';
    item.innerHTML = `
      <img src="${url}" alt="${escapeHtml(file.name)}" />
      <button class="preview-remove" data-idx="${idx}"><i class="fa-solid fa-xmark"></i></button>
      <div class="preview-filename">${escapeHtml(file.name)}</div>
    `;
    item.querySelector('.preview-remove').addEventListener('click', (e) => {
      e.stopPropagation();
      pendingFiles.splice(idx, 1);
      URL.revokeObjectURL(url);
      if (pendingFiles.length === 0) {
        modalDropzone.classList.remove('hidden');
        modalPreview.classList.add('hidden');
      } else {
        renderPreview();
      }
    });
    previewGrid.appendChild(item);
  });
}

async function doUpload() {
  if (pendingFiles.length === 0) {
    showToast('No hay archivos para subir');
    return;
  }
  modalUploadBtn.disabled = true;
  modalUploadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subiendo...';
  const user = auth.currentUser;
  const added = await photos.addPhotos(pendingFiles, user.name, user.email);
  closeUploadModal();
  showToast(`Se subieron ${added.length} foto${added.length !== 1 ? 's' : ''}`);
  modalUploadBtn.disabled = false;
  modalUploadBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Subir fotos';
}

async function handleDirectUpload(files) {
  const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
  if (imageFiles.length === 0) {
    showToast('Por favor selecciona archivos de imagen');
    return;
  }
  const user = auth.currentUser;
  const added = await photos.addPhotos(imageFiles, user.name, user.email);
  showToast(`Se subieron ${added.length} foto${added.length !== 1 ? 's' : ''}`);
}

// ===== Page Navigation =====
function showPage(pageName) {
  Object.values(pages).forEach(p => p.classList.remove('active-page'));
  if (pages[pageName]) {
    pages[pageName].classList.add('active-page');
    if (pageName === 'profile') updateProfilePage();
    if (pageName === 'explore') renderExploreGrid(getActiveFilter());
    if (pageName === 'boards') renderBoardsPage();
  }
}

// ===== Helper: get active explore filter =====
function getActiveFilter() {
  const activeChip = document.querySelector('.explore-chip.active');
  return activeChip ? activeChip.dataset.filter : 'all';
}

// ===== Render Explore Grid =====
function renderExploreGrid(filterType, searchTerm) {
  const allPhotos = photos.getAll();
  let filtered = [...allPhotos];

  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.author.toLowerCase().includes(term)
    );
  }

  // Apply category filter
  if (filterType === 'popular') {
    filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  } else if (filterType === 'recent') {
    filtered.sort((a, b) => b.createdAt - a.createdAt);
  }

  // Update empty state
  if (filtered.length === 0) {
    exploreEmpty.style.display = 'block';
    exploreGrid.style.display = 'none';
    return;
  }

  exploreEmpty.style.display = 'none';
  exploreGrid.style.display = 'block';
  exploreGrid.innerHTML = '';

  filtered.forEach((photo, i) => {
    const card = createPinCard(photo, i);
    exploreGrid.appendChild(card);
  });
}

// ===== Board Picker State =====
let _pickerPhotoId = null;
let _pickerCallback = null;

// ===== Render Boards Page =====
function renderBoardsPage() {
  const userBoards = boards.getBoardsByUser(auth.currentUser?.email);

  if (userBoards.length === 0) {
    boardsEmpty.style.display = 'block';
    boardsGrid.style.display = 'none';
    return;
  }

  boardsEmpty.style.display = 'none';
  boardsGrid.style.display = 'grid';
  boardsGrid.innerHTML = '';

  userBoards.forEach((board, i) => {
    const card = document.createElement('div');
    card.className = 'board-card';
    card.style.animationDelay = `${(i % 6) * 0.05}s`;
    card.dataset.boardId = board.id;

    // Get up to 4 photos for cover collage
    const boardPhotos = boards.getPhotosForBoard(board.id, photos.getAll());
    const coverPhotos = boardPhotos.slice(0, 4);

    let coverHtml = '';
    if (coverPhotos.length > 0) {
      if (coverPhotos.length === 1) {
        coverHtml = `<img class="board-card-cover-img" src="${coverPhotos[0].dataUrl}" alt="" />`;
      } else {
        coverHtml = `<div class="board-card-cover-grid">`;
        coverPhotos.forEach(p => {
          coverHtml += `<img class="board-card-cover-img" src="${p.dataUrl}" alt="" />`;
        });
        // Fill empty slots
        for (let j = coverPhotos.length; j < 4; j++) {
          coverHtml += `<div style="background:${board.coverColor};opacity:0.3"></div>`;
        }
        coverHtml += `</div>`;
      }
    }

    card.innerHTML = `
      <div class="board-card-cover" style="background:${coverPhotos.length === 0 ? board.coverColor : '#000'}">
        ${coverHtml || `<div class="board-card-cover-placeholder"><i class="fa-solid fa-clipboard-list"></i></div>`}
      </div>
      <div class="board-card-info">
        <div class="board-card-name">${escapeHtml(board.name)}</div>
        <div class="board-card-count">${board.photoIds.length} foto${board.photoIds.length !== 1 ? 's' : ''}</div>
      </div>
      <div class="board-card-actions">
        <button class="board-card-action-btn" data-action="export-board" data-board-id="${board.id}">
          <i class="fa-solid fa-file-export"></i> Exportar
        </button>
        <button class="board-card-action-btn danger" data-action="delete-board" data-board-id="${board.id}">
          <i class="fa-solid fa-trash-can"></i> Eliminar
        </button>
      </div>
    `;

    // Click on card to open board detail
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="delete-board"]')) return;
      openBoardDetail(board.id);
    });

    // Export board button
    card.querySelector('[data-action="export-board"]').addEventListener('click', (e) => {
      e.stopPropagation();
      exportBoardAsJson(board.id);
    });

    // Delete board button
    card.querySelector('[data-action="delete-board"]').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(`¿Eliminar el tablero "${board.name}"?`)) {
        await boards.deleteBoard(board.id);
        showToast('Tablero eliminado');
      }
    });

    boardsGrid.appendChild(card);
  });
}

// ===== Open Board Detail =====
function openBoardDetail(boardId) {
  const board = boards.getBoard(boardId);
  if (!board) return;
  boardDetailColor.style.background = board.coverColor;
  boardDetailTitle.textContent = board.name;
  boardDetailMeta.textContent = `${board.photoIds.length} foto${board.photoIds.length !== 1 ? 's' : ''}`;
  boardDetailDesc.textContent = board.description || '';
  boardDetailDesc.style.display = board.description ? '' : 'none';
  boardDetailDelete.dataset.boardId = board.id;

  showPage('boardDetail');
  renderBoardDetail();
}

// ===== Render Board Detail =====
let _currentBoardId = null;

function renderBoardDetail() {
  const activePage = document.querySelector('.page.active-page');
  if (!activePage || activePage.id !== 'pageBoardDetail') return;

  // Find the board from the boardDetailDelete button's data attribute
  const boardId = parseInt(boardDetailDelete.dataset.boardId);
  if (isNaN(boardId)) return;
  _currentBoardId = boardId;

  const board = boards.getBoard(boardId);
  if (!board) {
    showPage('boards');
    return;
  }

  const boardPhotos = boards.getPhotosForBoard(boardId, photos.getAll());

  if (boardPhotos.length === 0) {
    boardDetailEmpty.style.display = 'block';
    boardDetailGrid.style.display = 'none';
    return;
  }

  boardDetailEmpty.style.display = 'none';
  boardDetailGrid.style.display = 'block';
  boardDetailGrid.innerHTML = '';

  boardPhotos.forEach((photo, i) => {
    const card = createPinCard(photo, i, { hideSave: false, showBoardRemove: true, boardId: boardId });
    boardDetailGrid.appendChild(card);
  });
}

// ===== Render Board Picker =====
function renderBoardPicker(photoId, callback) {
  _pickerPhotoId = photoId;
  _pickerCallback = callback;

  const userBoards = boards.getBoardsByUser(auth.currentUser?.email);
  boardPickerList.innerHTML = '';

  if (userBoards.length === 0) {
    boardPickerList.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-secondary)">No tienes tableros. Crea uno nuevo.</div>';
  } else {
    userBoards.forEach(board => {
      const item = document.createElement('div');
      item.className = 'board-picker-item';
      item.dataset.boardId = board.id;
      item.innerHTML = `
        <div class="board-picker-color" style="background:${board.coverColor}">
          <i class="fa-solid fa-clipboard-list"></i>
        </div>
        <div class="board-picker-info">
          <div class="board-picker-name">${escapeHtml(board.name)}</div>
          <div class="board-picker-count">${board.photoIds.length} foto${board.photoIds.length !== 1 ? 's' : ''}</div>
        </div>
        <div class="board-picker-check"><i class="fa-solid fa-check"></i></div>
      `;

      item.addEventListener('click', () => {
        // Remove selected from all
        boardPickerList.querySelectorAll('.board-picker-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');

        // Save to this board
        const boardId = parseInt(item.dataset.boardId);
        boards.addPhotoToBoard(boardId, photoId);
        showToast('¡Guardado en ' + board.name + '!');

        if (_pickerCallback) _pickerCallback(boardId);
        closeBoardPicker();
      });

      boardPickerList.appendChild(item);
    });
  }

  boardPickerModal.classList.remove('hidden');
}

function openBoardPicker(photoId, callback) {
  renderBoardPicker(photoId, callback);
}

function closeBoardPicker() {
  boardPickerModal.classList.add('hidden');
  _pickerPhotoId = null;
  _pickerCallback = null;
}

// ===== Create Board Flow =====
let _createBoardCallback = null;

function openCreateBoardModal(callback) {
  _createBoardCallback = callback || null;
  boardNameInput.value = '';
  boardDescInput.value = '';
  boardError.textContent = '';
  // Reset color picker
  boardColorPicker.querySelectorAll('.board-color-opt').forEach(el => el.classList.remove('active'));
  boardColorPicker.querySelector('.board-color-opt').classList.add('active');
  createBoardModal.classList.remove('hidden');
  setTimeout(() => boardNameInput.focus(), 100);
}

function closeCreateBoardModal() {
  createBoardModal.classList.add('hidden');
  _createBoardCallback = null;
}

async function handleCreateBoard() {
  const name = boardNameInput.value.trim();
  if (!name) {
    boardError.textContent = 'El nombre del tablero es obligatorio';
    boardError.style.color = 'var(--red)';
    return;
  }
  const desc = boardDescInput.value.trim();
  const colorEl = boardColorPicker.querySelector('.board-color-opt.active');
  const color = colorEl ? colorEl.dataset.color : '#E60023';

  const user = auth.currentUser;
  if (!user) return;

  boardError.textContent = 'Creando...';
  boardError.style.color = 'var(--text-secondary)';
  createBoardSubmit.disabled = true;

  try {
    const board = await boards.createBoard(name, desc, color, user.email);
    closeCreateBoardModal();

    if (_createBoardCallback) {
      _createBoardCallback(board);
    } else {
      showToast('¡Tablero creado!');
      showPage('boards');
      // Update nav to show boards active
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector('[data-page="boards"]')?.classList.add('active');
    }
  } catch (err) {
    boardError.textContent = 'Error al crear tablero: ' + err.message;
    boardError.style.color = 'var(--red)';
  }

  createBoardSubmit.disabled = false;
  createBoardSubmit.innerHTML = '<i class="fa-solid fa-plus"></i> Crear tablero';
}

// ===== Render Grid =====
function renderGrid(searchTerm) {
  const allPhotos = photos.getAll();
  let filtered = allPhotos;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = allPhotos.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.author.toLowerCase().includes(term)
    );
  }

  const userPhotos = filtered.filter(p => p.authorEmail === auth.currentUser?.email);

  // Update feed title
  if (userPhotos.length === 0 && !searchTerm) {
    feedTitle.textContent = 'Tus fotos';
    feedSubtitle.textContent = 'Todas las fotos que has subido';
    emptyFeed.style.display = 'block';
    masonryGrid.style.display = 'none';
    updateStats();
    return;
  }

  emptyFeed.style.display = 'none';
  masonryGrid.style.display = 'block';

  masonryGrid.innerHTML = '';
  const displayPhotos = searchTerm ? filtered : userPhotos;

  if (displayPhotos.length === 0) {
    masonryGrid.innerHTML = '<div class="empty-feed" style="display:block;grid-column:1/-1"><h2>Sin resultados</h2><p>Intenta con otros términos de búsqueda</p></div>';
    return;
  }

  feedTitle.textContent = searchTerm ? `Resultados: "${searchTerm}"` : 'Tus fotos';
  feedSubtitle.textContent = `${displayPhotos.length} foto${displayPhotos.length !== 1 ? 's' : ''}`;

  displayPhotos.forEach((photo, i) => {
    const card = createPinCard(photo, i);
    masonryGrid.appendChild(card);
  });
}

function createPinCard(photo, index, opts = {}) {
  const card = document.createElement('div');
  card.className = 'pin-card';
  card.style.animationDelay = `${(index % 12) * 0.04}s`;
  card.dataset.id = photo.id;

  // Determine height for visual variety
  const aspectRatio = getRandomHeight();
  const isOwner = auth.currentUser && photo.authorEmail === auth.currentUser.email;
  const hideSave = opts.hideSave || false;
  const showBoardRemove = opts.showBoardRemove || false;
  const boardId = opts.boardId || null;

  card.innerHTML = `
    <div class="pin-card-image-wrapper" style="position:relative">
      <img class="pin-card-image" src="${photo.dataUrl}" alt="${escapeHtml(photo.title)}" loading="lazy" style="aspect-ratio: ${aspectRatio}" />
      <div class="pin-card-overlay">
        <div class="pin-card-top-actions">
          ${hideSave ? '' : '<button class="pin-card-save-btn" data-action="save"><i class="fa-regular fa-bookmark"></i> Guardar</button>'}
          ${showBoardRemove ? '<button class="pin-card-bottom-btn danger" data-action="board-remove" title="Quitar del tablero"><i class="fa-solid fa-xmark"></i></button>' : ''}
        </div>
        <div class="pin-card-bottom-actions">
          <button class="pin-card-bottom-btn" data-action="like" title="Me gusta"><i class="fa-regular fa-heart"></i></button>
          ${isOwner ? '<button class="pin-card-bottom-btn danger" data-action="delete" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>' : ''}
        </div>
      </div>
    </div>
    <div class="pin-card-info">
      <div class="pin-card-title">${escapeHtml(photo.title)}</div>
      <div class="pin-card-author">
        <i class="fa-regular fa-user"></i> ${escapeHtml(photo.author)}
      </div>
    </div>
  `;

  // Click to open detail
  card.addEventListener('click', (e) => {
    if (e.target.closest('.pin-card-save-btn') || e.target.closest('.pin-card-bottom-btn')) return;
    openPinDetail(photo.id);
  });

  // Save button → board picker
  const saveBtn = card.querySelector('[data-action="save"]');
  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openBoardPicker(photo.id, () => {
        photos.toggleSave(photo.id);
      });
    });
  }

  // Board remove button
  const boardRemoveBtn = card.querySelector('[data-action="board-remove"]');
  if (boardRemoveBtn && boardId) {
    boardRemoveBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await boards.removePhotoFromBoard(boardId, photo.id);
      showToast('Foto quitada del tablero');
      // Re-render board detail
      renderBoardDetail();
    });
  }

  // Like button
  card.querySelector('[data-action="like"]').addEventListener('click', (e) => {
    e.stopPropagation();
    photos.toggleLike(photo.id);
    const heart = e.currentTarget.querySelector('i');
    heart.className = 'fa-solid fa-heart';
    e.currentTarget.style.color = 'var(--red)';
    showToast('¡Te gusta esta foto!');
  });

  // Delete button (only if owner)
  const deleteBtn = card.querySelector('[data-action="delete"]');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm('¿Eliminar esta foto?')) {
        await photos.deletePhoto(photo.id);
        showToast('Foto eliminada');
      }
    });
  }

  return card;
}

// ===== Export Board as JSON =====
function exportBoardAsJson(boardId) {
  const board = boards.getBoard(boardId);
  if (!board) {
    showToast('Error: tablero no encontrado');
    return;
  }

  const boardPhotos = boards.getPhotosForBoard(boardId, photos.getAll());

  const exportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    board: {
      name: board.name,
      description: board.description,
      coverColor: board.coverColor,
      createdAt: board.createdAt
    },
    photos: boardPhotos.map(p => ({
      title: p.title,
      description: p.description,
      author: p.author,
      authorEmail: p.authorEmail,
      createdAt: p.createdAt,
      likes: p.likes || 0,
      saved: p.saved || 0,
      tags: p.tags || [],
      dataUrl: p.dataUrl
    }))
  };

  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${board.name.replace(/[^a-zA-Z0-9áéíóúñü\s-]/g, '').trim().replace(/\s+/g, '_')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Tablero "${board.name}" exportado como JSON`);
}

// ===== Stats =====
function updateStats() {
  const userPhotos = photos.getPhotosByUser(auth.currentUser?.email);
  statPhotos.textContent = userPhotos.length;
  statSaved.textContent = photos.totalSaved;
  statLikes.textContent = photos.totalLikes;
}

// ===== Pin Detail Modal =====
function openPinDetail(id) {
  const photo = photos.getPhoto(id);
  if (!photo) return;
  pinModal._currentId = id;

  pinDetailImg.src = photo.dataUrl;
  pinDetailImg.alt = photo.title;
  pinDetailTitle.textContent = photo.title;
  pinDetailDesc.textContent = photo.description;
  pinDetailAuthor.textContent = photo.author;
  pinDetailDate.textContent = formatDate(photo.createdAt);

  // Reset like button
  pinLikeBtn.querySelector('i').className = 'fa-regular fa-heart';
  pinLikeBtn.style.color = '';

  // Show/hide delete button based on ownership
  const isOwner = auth.currentUser && photo.authorEmail === auth.currentUser.email;
  pinDeleteBtn.style.display = isOwner ? '' : 'none';

  // Tags
  pinDetailTags.innerHTML = '';
  const tags = [photo.author, 'fotografía', 'inspiración'];
  tags.forEach(tag => {
    const el = document.createElement('span');
    el.className = 'pin-detail-tag';
    el.textContent = '#' + tag.replace(/\s+/g, '');
    pinDetailTags.appendChild(el);
  });

  pinModal.classList.remove('hidden');
}

function closePinModal() {
  pinModal.classList.add('hidden');
  pinModal._currentId = undefined;
}

// ===== Profile Page =====
function updateProfilePage() {
  const user = auth.currentUser;
  if (!user) return;
  profilePageName.textContent = user.name;
  profilePageEmail.textContent = user.email;
  profilePageBio.textContent = user.bio || '';
  const userPhotos = photos.getPhotosByUser(user.email);
  profileStatPhotos.textContent = userPhotos.length;
  profileStatLikes_el.textContent = photos.totalLikes;

  if (user.avatar) {
    profilePageAvatar.innerHTML = `<img src="${user.avatar}" alt="${escapeHtml(user.name)}" />`;
  } else {
    profilePageAvatar.innerHTML = '<i class="fa-regular fa-user"></i>';
  }

  updateProfileGrid('pins');
}

function updateProfileGrid(tab) {
  const user = auth.currentUser;
  if (!user) return;
  profileGrid.innerHTML = '';
  const userPhotos = photos.getPhotosByUser(user.email);

  if (userPhotos.length === 0) {
    profileGrid.innerHTML = '<div class="empty-feed" style="display:block;grid-column:1/-1"><h2>No hay fotos</h2><p>Sube tu primera foto para verla aquí</p></div>';
    return;
  }

  userPhotos.forEach((photo, i) => {
    const card = createPinCard(photo, i);
    profileGrid.appendChild(card);
  });
}

// ===== Edit Profile =====
let _editAvatarDataUrl = null;

function openEditProfileModal() {
  const user = auth.currentUser;
  if (!user) return;
  _editAvatarDataUrl = null;
  editNameInput.value = user.name || '';
  editBioInput.value = user.bio || '';
  editProfileError.textContent = '';

  if (user.avatar) {
    editAvatarPreview.innerHTML = `<img src="${user.avatar}" alt="${escapeHtml(user.name)}" />`;
  } else {
    editAvatarPreview.innerHTML = '<i class="fa-regular fa-user"></i>';
  }

  editProfileModal.classList.remove('hidden');
  setTimeout(() => editNameInput.focus(), 100);
}

function closeEditProfileModal() {
  editProfileModal.classList.add('hidden');
  _editAvatarDataUrl = null;
}

async function handleSaveProfile() {
  const name = editNameInput.value.trim();
  if (!name) {
    editProfileError.textContent = 'El nombre es obligatorio';
    editProfileError.style.color = 'var(--red)';
    return;
  }
  const bio = editBioInput.value.trim();
  const avatar = _editAvatarDataUrl || auth.currentUser?.avatar || null;

  editProfileError.textContent = 'Guardando...';
  editProfileError.style.color = 'var(--text-secondary)';
  editProfileSave.disabled = true;

  try {
    const result = await auth.updateProfile(name, avatar, bio);
    if (result.success) {
      closeEditProfileModal();
      updateUserUI();
      updateProfilePage();
      showToast('Perfil actualizado correctamente');
    } else {
      editProfileError.textContent = result.error;
      editProfileError.style.color = 'var(--red)';
    }
  } catch (err) {
    editProfileError.textContent = 'Error al guardar: ' + err.message;
    editProfileError.style.color = 'var(--red)';
  }

  editProfileSave.disabled = false;
}

// ===== Global Drag & Drop =====
let dragCounter = 0;

document.addEventListener('dragenter', (e) => {
  e.preventDefault();
  dragCounter++;
  if (dragCounter === 1 && auth.isLoggedIn()) {
    // Highlight body as drop target
    document.body.style.outline = '4px dashed var(--red)';
    document.body.style.outlineOffset = '-4px';
  }
});

document.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter === 0) {
    document.body.style.outline = '';
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  e.preventDefault();
  dragCounter = 0;
  document.body.style.outline = '';
  if (auth.isLoggedIn() && e.dataTransfer.files.length > 0) {
    handleDirectUpload(e.dataTransfer.files);
  }
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
  if (e.target === document.body || e.target.tagName === 'BODY') {
    if (e.key === 'u' && auth.isLoggedIn()) {
      e.preventDefault();
      openUploadModal();
    }
  }
});

// ===== Start =====
init().then(() => {
  console.log('📌 Pinterest Clone — Ready');
}).catch(err => {
  console.error('❌ Error initializing:', err);
});
