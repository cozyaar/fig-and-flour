/* ===================================================
   FIG & FLOUR — JavaScript Application
   Award-Winning Premium Bakery Experience
   =================================================== */

'use strict';

/* ─── State ──────────────────────────────────────── */
const state = {
  cart: [],
  favorites: new Set(),
  selectedPayment: 'cash',
  couponApplied: false,
  giftWrap: false,
  darkMode: false,
  cakeConfig: { shape: 0, flavour: 0, cream: 0, topping: 0, weight: 1.0 },
  menuFilter: 'all',
  menuSearch: '',
  menuSort: 'default'
};

/* ─── Product Data ───────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: 'Signature Vanilla Drip Cake',
    category: 'cakes',
    img: 'product_cake.jpg',
    price: 1899, oldPrice: 2299,
    rating: 4.9, reviews: 312,
    time: '48hr notice', calories: 420,
    desc: 'Three layers of Madagascar vanilla sponge, Swiss meringue buttercream, fresh berry compote.',
    badges: ['bestseller'],
    stock: 'In Stock'
  },
  {
    id: 2, name: 'Paris-Brest Croissant',
    category: 'pastries',
    img: 'product_croissant.jpg',
    price: 299, oldPrice: null,
    rating: 4.8, reviews: 487,
    time: '15 min', calories: 280,
    desc: 'Laminated butter croissant with 81 flaky layers. Baked fresh every morning by 7 AM.',
    badges: ['special'],
    stock: 'Today Only'
  },
  {
    id: 3, name: 'French Macaron Box (12)',
    category: 'macarons',
    img: 'product_macarons.jpg',
    price: 749, oldPrice: null,
    rating: 4.9, reviews: 623,
    time: '2–4 hr', calories: 95,
    desc: 'Assorted box of 12 handcrafted Parisian macarons in seasonal flavours. The perfect gift.',
    badges: ['bestseller', 'new'],
    stock: 'In Stock'
  },
  {
    id: 4, name: 'New York Berry Cheesecake',
    category: 'cheesecakes',
    img: 'product_cheesecake.jpg',
    price: 649, oldPrice: 799,
    rating: 4.7, reviews: 218,
    time: '24hr notice', calories: 510,
    desc: 'Dense, creamy New York-style cheesecake with a wild berry compote and buttery Graham cracker base.',
    badges: [],
    stock: 'In Stock'
  },
  {
    id: 5, name: 'Artisan Latte — Signature',
    category: 'coffee',
    img: 'product_coffee.jpg',
    price: 299, oldPrice: null,
    rating: 4.8, reviews: 834,
    time: '5 min', calories: 120,
    desc: 'Single-origin Coorg estate espresso with hand-steamed farm-fresh milk and our signature Fig & Flour latte art.',
    badges: ['special'],
    stock: 'Available Now'
  },
  {
    id: 6, name: 'Mixed Berry Tart',
    category: 'tarts',
    img: 'product_tart.jpg',
    price: 549, oldPrice: null,
    rating: 4.9, reviews: 156,
    time: '4–6 hr', calories: 380,
    desc: 'Buttery shortcrust tart shell, vanilla crème pâtissière, glossy seasonal fruits and fig jam glaze.',
    badges: ['special'],
    stock: 'In Stock'
  },
  {
    id: 7, name: 'Gold Flake Brownie Stack',
    category: 'brownies',
    img: 'product_brownie.jpg',
    price: 399, oldPrice: 449,
    rating: 4.8, reviews: 291,
    time: '30 min', calories: 450,
    desc: 'Fudgy 70% dark chocolate brownies, sea salt crystals, edible gold flakes. A decadent indulgence.',
    badges: ['bestseller'],
    stock: 'In Stock'
  },
  {
    id: 8, name: 'Rose Petal Cupcake',
    category: 'cakes',
    img: 'product_cupcake.jpg',
    price: 249, oldPrice: null,
    rating: 4.7, reviews: 178,
    time: '20 min', calories: 310,
    desc: 'Light vanilla sponge topped with swirled rose water buttercream, edible petals and gold dust.',
    badges: ['new'],
    stock: 'In Stock'
  },
  {
    id: 9, name: 'Dark Chocolate Chip Cookie',
    category: 'cookies',
    img: 'product_cookie.jpg',
    price: 199, oldPrice: null,
    rating: 4.9, reviews: 512,
    time: '10 min', calories: 280,
    desc: 'Warm, gooey center. Crispy edges. 72% Valrhona chocolate chunks with Himalayan pink salt.',
    badges: ['bestseller'],
    stock: 'In Stock'
  },
  {
    id: 10, name: 'Strawberry Mango Macaron',
    category: 'macarons',
    img: 'product_macarons.jpg',
    price: 75, oldPrice: null,
    rating: 4.8, reviews: 342,
    time: '2 hr', calories: 88,
    desc: 'Sun-ripened Alphonso mango ganache meets fresh strawberry compote in a delicate almond shell.',
    badges: ['seasonal'],
    stock: 'Seasonal'
  },
  {
    id: 11, name: 'Pistachio Rose Cake',
    category: 'cakes',
    img: 'product_cake.jpg',
    price: 2199, oldPrice: 2599,
    rating: 4.9, reviews: 89,
    time: '48hr notice', calories: 395,
    desc: 'Persian pistachio sponge, rose water mascarpone cream, fresh lychees, edible rose petals.',
    badges: ['new', 'special'],
    stock: 'Pre-Order'
  },
  {
    id: 12, name: 'Cappuccino Cheesecake',
    category: 'cheesecakes',
    img: 'product_cheesecake.jpg',
    price: 699, oldPrice: null,
    rating: 4.7, reviews: 134,
    time: '24hr notice', calories: 490,
    desc: 'Rich coffee-infused cream cheese, Kahlúa-soaked biscuit base, chocolate-covered espresso beans.',
    badges: [],
    stock: 'In Stock'
  }
];

/* ─── Testimonials Data ──────────────────────────── */
const TESTIMONIALS = [
  { name: 'Aisha Kapoor', location: 'Bandra, Mumbai', rating: 5, text: 'The pistachio rose cake was so beautiful I almost couldn\'t cut it. Three-tier wedding cake — our guests are still talking about it two months later. Absolute perfection.' },
  { name: 'Rohan Mehta', location: 'Juhu, Mumbai', rating: 5, text: 'I\'ve been a regular at Fig & Flour for six years. Nothing else in Mumbai comes close. The croissants every Saturday morning are my weekly ritual.' },
  { name: 'Preethi Krishnan', location: 'Lower Parel', rating: 5, text: 'Ordered a custom birthday cake for my daughter\'s 7th birthday — a unicorn castle with real edible gold. The look on her face was worth every rupee. Magical!' },
  { name: 'Samira Sheikh', location: 'Worli, Mumbai', rating: 5, text: 'As a food critic, I\'ve visited patisseries across Paris, Tokyo and New York. Fig & Flour belongs in the same conversation. Their macarons are genuinely world-class.' },
  { name: 'Vikram Anand', location: 'Powai, Mumbai', rating: 5, text: 'The Gold Flake Brownies are criminally good. I\'ve tried stopping myself from ordering every week and I simply cannot. Five stars, zero regrets.' },
  { name: 'Meera Pillai', location: 'Chembur, Mumbai', rating: 4, text: 'Beautiful packaging, exceptional quality, incredibly helpful staff. They went out of their way to accommodate a last-minute custom order. So grateful!' },
  { name: 'Arjun Das', location: 'Andheri, Mumbai', rating: 5, text: 'Our corporate event with 200 guests, and Fig & Flour delivered 400 pastries on time, all perfectly presented. Not a single complaint — only compliments!' },
  { name: 'Nandini Rao', location: 'Colaba, Mumbai', rating: 5, text: 'The berry cheesecake is legitimately the best I\'ve ever had. Light, creamy, perfectly balanced — the berry compote is just incredible. Thank you, Fig & Flour!' }
];

/* ─── Utilities ──────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const formatINR = n => '₹' + n.toLocaleString('en-IN');

function lerp(start, end, t) { return start * (1 - t) + end * t; }

/* ─── Custom Cursor ──────────────────────────────── */
(function initCursor() {
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown', () => ring.classList.add('clicked'));
  document.addEventListener('mouseup', () => ring.classList.remove('clicked'));

  function animate() {
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a,button,[data-cursor]');
    if (el) ring.classList.add('hovered');
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest('a,button,[data-cursor]');
    if (el) ring.classList.remove('hovered');
  });
})();

/* ─── Loading Screen ─────────────────────────────── */
(function initLoader() {
  const loader = $('#loader');
  const logo = $('#loaderLogo');
  const tagline = $('#loaderTagline');
  const barContainer = $('#loaderBarContainer');
  const bar = $('#loaderBar');
  const crumbsContainer = $('#loaderCrumbs');

  // Generate crumbs
  const crumbColors = ['#C9A84C','#E8A0B4','#8FAF6E','#FAF7F2'];
  for (let i = 0; i < 20; i++) {
    const c = document.createElement('div');
    c.className = 'crumb';
    const size = Math.random() * 8 + 3;
    c.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      background:${crumbColors[Math.floor(Math.random()*crumbColors.length)]};
      animation:floatAround ${6+Math.random()*6}s ease-in-out ${Math.random()*3}s infinite;
    `;
    crumbsContainer.appendChild(c);
  }

  // Animate in
  setTimeout(() => {
    logo.style.transition = 'opacity 0.8s, transform 0.8s';
    logo.style.opacity = '1';
    logo.style.transform = 'translateY(0)';
  }, 100);

  setTimeout(() => {
    tagline.style.transition = 'opacity 0.6s';
    tagline.style.opacity = '1';
  }, 600);

  setTimeout(() => {
    barContainer.style.transition = 'opacity 0.4s';
    barContainer.style.opacity = '1';
  }, 900);

  // Progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      setTimeout(hideLoader, 400);
    } else {
      bar.style.width = progress + '%';
    }
  }, 80);

  function hideLoader() {
    loader.style.transition = 'opacity 0.7s, transform 0.7s';
    loader.style.opacity = '0';
    loader.style.transform = 'scale(1.05)';
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.remove('loading');
      initRevealAnimations();
      animateStats();
    }, 700);
  }
})();

/* ─── Scroll Progress ────────────────────────────── */
(function initScrollProgress() {
  const bar = $('#scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollTop / docHeight;
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
})();

/* ─── Navbar ─────────────────────────────────────── */
(function initNavbar() {
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  // Hamburger
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileClose = $('#mobileMenuClose');

  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  mobileClose.addEventListener('click', closeMobileMenu);

  window.closeMobileMenu = () => mobileMenu.classList.remove('open');
})();

/* ─── Dark Mode ──────────────────────────────────── */
(function initDarkMode() {
  const toggle = $('#darkToggle');
  toggle.addEventListener('click', () => {
    state.darkMode = !state.darkMode;
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    toggle.textContent = state.darkMode ? '☀️' : '🌙';
  });
})();

/* ─── Hero Parallax ──────────────────────────────── */
(function initHeroParallax() {
  const heroBg = $('#heroBg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
  }, { passive: true });
})();

/* ─── Countdown Timer ────────────────────────────── */
(function initCountdown() {
  const hEl = $('#countdown-h');
  const mEl = $('#countdown-m');
  const sEl = $('#countdown-s');
  if (!hEl) return;

  // Set end time to 6 PM today
  const now = new Date();
  const end = new Date(now);
  end.setHours(18, 0, 0, 0);
  if (now > end) end.setDate(end.getDate() + 1);

  function update() {
    const diff = end - new Date();
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();

/* ─── Animated Stats ─────────────────────────────── */
function animateStats() {
  $$('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      // Format large numbers
      let display;
      if (target >= 1000000) {
        display = (current / 1000000).toFixed(1) + 'M';
      } else if (target >= 1000) {
        display = (current / 1000).toFixed(0) + 'K';
      } else {
        display = current.toString();
      }

      el.textContent = display + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
}

/* ─── Reveal Animations ──────────────────────────── */
function initRevealAnimations() {
  const reveals = $$('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ─── Render Products ────────────────────────────── */
function renderProductCard(product, context = 'featured') {
  const isFav = state.favorites.has(product.id);
  const badgeHTML = product.badges.map(b => {
    const labels = { bestseller: '🔥 Bestseller', special: '⭐ Today\'s Special', new: '✨ New', seasonal: '🌸 Seasonal', sale: '💥 Sale' };
    const classes = { bestseller: 'badge-bestseller', special: 'badge-special', new: 'badge-new', seasonal: 'badge-special', sale: 'badge-sale' };
    return `<span class="badge ${classes[b] || 'badge-special'}">${labels[b] || b}</span>`;
  }).join('');

  const starsHTML = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  const priceHTML = product.oldPrice
    ? `${formatINR(product.price)}<span class="product-price-old">${formatINR(product.oldPrice)}</span>`
    : formatINR(product.price);

  return `
    <article class="product-card reveal" role="listitem" data-category="${product.category}" aria-label="${product.name}">
      <div class="product-img-wrap">
        <img src="${product.img}" alt="${product.name}" loading="lazy" />
        <div class="product-badges">${badgeHTML}</div>
        <button class="product-fav ${isFav ? 'active' : ''}" onclick="toggleFav(${product.id}, this)" aria-label="${isFav ? 'Remove from' : 'Add to'} favorites" aria-pressed="${isFav}">
          ${isFav ? '❤️' : '🤍'}
        </button>
        <div class="quick-add">
          <button class="btn-quick-add" onclick="addToCart(${product.id})">+ Add to Cart</button>
          <button class="btn-view" onclick="viewProduct(${product.id})" aria-label="View ${product.name} details">👁</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc-short">${product.desc.substring(0, 75)}…</p>
        <div class="product-meta">
          <div class="product-rating" aria-label="${product.rating} stars">
            <span>${starsHTML}</span>
            <span>(${product.reviews})</span>
          </div>
          <div class="product-time" aria-label="Preparation time: ${product.time}">⏱ ${product.time}</div>
          <div class="product-calories" aria-label="${product.calories} calories">${product.calories} kcal</div>
        </div>
        <div class="product-footer">
          <div class="product-price" aria-label="Price: ${formatINR(product.price)}">${priceHTML}</div>
          <button class="btn-add-cart" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to cart">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProducts() {
  const grid = $('#productsGrid');
  if (!grid) return;
  const featured = PRODUCTS.slice(0, 8);
  grid.innerHTML = featured.map(p => renderProductCard(p, 'featured')).join('');
  setTimeout(initRevealAnimations, 100);
}

function renderMenuGrid() {
  const grid = $('#menuGrid');
  if (!grid) return;

  let filtered = [...PRODUCTS];

  // Filter by category
  if (state.menuFilter !== 'all') {
    filtered = filtered.filter(p => p.category === state.menuFilter);
  }

  // Filter by search
  if (state.menuSearch) {
    const q = state.menuSearch.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (state.menuSort) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--chocolate-mid);font-family:var(--font-sans);">
      <div style="font-size:3rem;margin-bottom:1rem;">🔍</div>
      <p>No items found for "<strong>${state.menuSearch}</strong>"</p>
      <button onclick="clearSearch()" style="margin-top:1rem;padding:0.5rem 1.5rem;background:var(--gold);color:white;border-radius:var(--radius-full);font-family:var(--font-sans);font-size:0.85rem;cursor:none;">Clear Search</button>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => renderProductCard(p, 'menu')).join('');
  setTimeout(initRevealAnimations, 50);
}

window.clearSearch = function() {
  state.menuSearch = '';
  $('#menuSearch').value = '';
  renderMenuGrid();
};

/* ─── Product Filter Buttons ─────────────────────── */
function initFilters() {
  // Featured section filters
  $$('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      const cards = $$('.product-card', $('#productsGrid'));
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Menu section filters
  $$('[data-menu-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-menu-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.menuFilter = btn.dataset.menuFilter;
      renderMenuGrid();
    });
  });

  // Search
  const searchInput = $('#menuSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.menuSearch = e.target.value;
      renderMenuGrid();
    });
  }

  // Sort
  const sortSelect = $('#menuSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.menuSort = e.target.value;
      renderMenuGrid();
    });
  }
}

/* ─── Favorites ──────────────────────────────────── */
window.toggleFav = function(id, btn) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    btn.classList.remove('active');
    btn.textContent = '🤍';
    btn.setAttribute('aria-pressed', 'false');
  } else {
    state.favorites.add(id);
    btn.classList.add('active');
    btn.textContent = '❤️';
    btn.setAttribute('aria-pressed', 'true');
    // Heart burst animation
    btn.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.5)' },
      { transform: 'scale(1)' }
    ], { duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
  }
};

/* ─── Cart ───────────────────────────────────────── */
window.addToCart = function(id, qty = 1) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ ...product, qty });
  }

  updateCartUI();
  showAddToCartFeedback(id);
  openCart();
};

function showAddToCartFeedback(id) {
  // Animate the badge
  const badge = $('#cartBadge');
  badge.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.5)' },
    { transform: 'scale(1)' }
  ], { duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
}

window.openCart = function() {
  $('#cart-drawer').classList.add('open');
  $('#cart-overlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
};

window.closeCart = function() {
  $('#cart-drawer').classList.remove('open');
  $('#cart-overlay').classList.remove('visible');
  document.body.style.overflow = '';
};

// Cart toggle button
$('#cartToggleBtn').addEventListener('click', () => {
  const drawer = $('#cart-drawer');
  if (drawer.classList.contains('open')) closeCart();
  else openCart();
});

function updateCartUI() {
  const badge = $('#cartBadge');
  const totalQty = state.cart.reduce((s, i) => s + i.qty, 0);

  badge.textContent = totalQty;
  badge.classList.toggle('has-items', totalQty > 0);

  renderCartItems();
  updateCartTotals();
}

function renderCartItems() {
  const container = $('#cartItems');
  const emptyState = $('#cartEmpty');

  if (state.cart.length === 0) {
    emptyState.style.display = 'flex';
    // Remove item elements
    $$('.cart-item', container).forEach(el => el.remove());
    return;
  }

  emptyState.style.display = 'none';
  container.innerHTML = '';

  state.cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.dataset.id = item.id;
    el.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatINR(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
      </div>
      <button class="cart-remove" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name} from cart">🗑</button>
    `;
    container.appendChild(el);
  });
}

window.changeQty = function(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
};

window.removeFromCart = function(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  updateCartUI();
};

function updateCartTotals() {
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const giftWrap = $('#giftWrapCheck').checked ? 50 : 0;
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal > 999 ? 0 : 49;
  const discount = state.couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + gst + delivery + giftWrap - discount;

  $('#cartSubtotal').textContent = formatINR(subtotal);
  $('#cartGst').textContent = formatINR(gst);
  $('#cartDelivery').textContent = delivery === 0 ? 'FREE 🎁' : formatINR(delivery);

  const discountRow = $('#cartDiscount');
  if (discount > 0) {
    discountRow.style.display = 'flex';
    $('#cartDiscountVal').textContent = '−' + formatINR(discount);
  } else {
    discountRow.style.display = 'none';
  }

  $('#cartTotal').textContent = formatINR(total);
  $('#checkoutTotalDisplay').textContent = formatINR(total);

  // Delivery estimate
  const estimate = subtotal > 0 ? 'Estimated delivery: 45–60 min' : 'Add items to see delivery estimate';
  $('#deliveryEstimate').textContent = estimate;
}

// Gift wrap
$('#giftWrapCheck').addEventListener('change', updateCartTotals);

/* ─── Coupon ─────────────────────────────────────── */
window.applyCoupon = function() {
  const input = $('#couponInput');
  const code = input.value.trim().toUpperCase();
  const validCodes = ['SWEET10', 'FIGFLOUR', 'WELCOME', 'FIRSTORDER'];

  if (validCodes.includes(code)) {
    state.couponApplied = true;
    updateCartTotals();
    input.style.borderColor = 'var(--pistachio-dark)';
    input.value = code + ' ✓';
    input.disabled = true;
    showToast('🎉 Coupon applied! 10% discount added.');
  } else {
    input.style.borderColor = 'var(--rose-deep)';
    showToast('❌ Invalid coupon code. Try SWEET10');
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
  }
};

/* ─── Toast Notification ─────────────────────────── */
function showToast(message, duration = 3000) {
  const existing = $('#toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.style.cssText = `
    position:fixed; bottom:6rem; left:50%; transform:translateX(-50%) translateY(20px);
    background:var(--chocolate); color:var(--cream);
    padding:0.75rem 1.5rem; border-radius:var(--radius-full);
    font-family:var(--font-sans); font-size:0.875rem; font-weight:500;
    box-shadow:var(--shadow-lg); z-index:50000; opacity:0;
    transition:opacity 0.3s, transform 0.3s;
    max-width:90vw; text-align:center;
  `;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ─── Checkout Modal ─────────────────────────────── */
window.openCheckout = function() {
  if (state.cart.length === 0) {
    showToast('🛒 Your cart is empty! Add some treats first.');
    return;
  }
  closeCart();
  $('#checkout-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeCheckout = function() {
  $('#checkout-modal').classList.remove('open');
  document.body.style.overflow = '';
};

window.selectPayment = function(method, el) {
  state.selectedPayment = method;
  $$('.payment-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
};

window.placeOrder = function(e) {
  e.preventDefault();
  const name = $('#customerName').value.trim();
  const phone = $('#customerPhone').value.trim();
  const address = $('#customerAddress').value.trim();

  if (!name || !phone || !address) {
    showToast('⚠️ Please fill in all required fields.');
    return;
  }

  closeCheckout();
  showOrderConfirmation(name);
};

function showOrderConfirmation(name) {
  const orderNum = '#FF-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000);
  $('#orderNumberDisplay').textContent = orderNum;

  const deliveryMins = Math.floor(Math.random() * 20) + 40;
  $('#confirmDeliveryTime').textContent = `Estimated delivery: ${deliveryMins}–${deliveryMins + 15} minutes`;

  $('#order-confirmation').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Clear cart
  state.cart = [];
  state.couponApplied = false;
  updateCartUI();

  // Launch confetti!
  launchConfetti();
}

window.closeConfirmation = function() {
  $('#order-confirmation').classList.remove('open');
  document.body.style.overflow = '';
};

/* ─── Confetti ───────────────────────────────────── */
function launchConfetti() {
  const colors = ['#C9A84C', '#E8A0B4', '#8FAF6E', '#C4607A', '#FAF7F2', '#3D1F0D'];
  const shapes = ['circle', 'square'];

  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 10 + 5;

      piece.style.cssText = `
        left:${Math.random() * 100}vw;
        top:-20px;
        width:${size}px; height:${size}px;
        background:${color};
        border-radius:${shape === 'circle' ? '50%' : '2px'};
        animation-delay:${Math.random() * 2}s;
        animation-duration:${Math.random() * 2 + 2}s;
      `;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }, i * 30);
  }
}

/* ─── View Product (simple lightbox) ────────────── */
window.viewProduct = function(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;z-index:25000;display:flex;align-items:center;justify-content:center;
    padding:2rem;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);
  `;

  const starsHTML = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  modal.innerHTML = `
    <div style="background:white;border-radius:32px;max-width:700px;width:100%;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,0.3);display:grid;grid-template-columns:1fr 1fr;max-height:90vh;">
      <div style="overflow:hidden;">
        <img src="${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
      </div>
      <div style="padding:2.5rem;overflow-y:auto;">
        <button onclick="this.closest('[style]').remove()" style="float:right;background:var(--cream-dark);border-radius:50%;width:32px;height:32px;cursor:none;border:none;font-size:1rem;display:flex;align-items:center;justify-content:center;">✕</button>
        <div style="font-family:var(--font-sans);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:0.5rem;">${product.category.toUpperCase()}</div>
        <h2 style="font-family:var(--font-serif);font-size:1.6rem;color:var(--chocolate);margin-bottom:0.75rem;">${product.name}</h2>
        <div style="color:var(--gold);font-size:1rem;margin-bottom:0.5rem;">${starsHTML} <span style="color:var(--chocolate-mid);font-size:0.8rem;">(${product.reviews} reviews)</span></div>
        <p style="font-family:var(--font-sans);font-size:0.9rem;color:var(--chocolate-mid);line-height:1.7;margin-bottom:1.5rem;">${product.desc}</p>
        <div style="display:flex;gap:1.5rem;margin-bottom:1.5rem;font-family:var(--font-sans);font-size:0.8rem;color:var(--chocolate-mid);">
          <span>⏱ ${product.time}</span>
          <span>🔥 ${product.calories} kcal</span>
          <span style="color:${product.stock === 'In Stock' ? 'var(--pistachio-dark)' : 'var(--gold)'};">• ${product.stock}</span>
        </div>
        <div style="font-family:var(--font-display);font-size:2rem;color:var(--chocolate);margin-bottom:1.5rem;">${formatINR(product.price)}</div>
        <button onclick="addToCart(${product.id}); this.closest('[style]').remove();" style="width:100%;padding:0.9rem;background:linear-gradient(135deg,var(--gold),var(--gold-dark));color:white;border-radius:var(--radius-full);font-family:var(--font-sans);font-size:0.95rem;font-weight:700;cursor:none;border:none;transition:transform 0.2s;">
          Add to Cart — ${formatINR(product.price)}
        </button>
      </div>
    </div>
  `;

  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
};

/* ─── Testimonials ───────────────────────────────── */
function renderTestimonials() {
  const track = $('#testimonialsTrack');
  if (!track) return;

  // Duplicate for infinite scroll
  const all = [...TESTIMONIALS, ...TESTIMONIALS];
  track.innerHTML = all.map(t => `
    <article class="testimonial-card" aria-label="Review by ${t.name}">
      <div class="testimonial-quote" aria-hidden="true">"</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="author-avatar" aria-hidden="true">${t.name[0]}</div>
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-location">${t.location}</div>
          <div class="testimonial-stars" aria-label="${t.rating} out of 5 stars">${'★'.repeat(t.rating)}</div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ─── FAQ Accordion ──────────────────────────────── */
function initFAQ() {
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      $$('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ─── Cake Builder ───────────────────────────────── */
function initCakeBuilder() {
  const BASE_PRICE = 1299;

  function calculatePrice() {
    const shapePrice = parseInt($('#shapeOptions .selected')?.dataset.price || 0);
    const flavourPrice = parseInt($('#flavourOptions .selected')?.dataset.price || 0);
    const creamPrice = parseInt($('#creamOptions .selected')?.dataset.price || 0);
    const toppingPrice = parseInt($('#toppingOptions .selected')?.dataset.price || 0);
    const weight = parseFloat($('#weightSlider').value);

    const total = Math.round((BASE_PRICE + shapePrice + flavourPrice + creamPrice + toppingPrice) * weight);
    return total;
  }

  function updatePriceDisplay() {
    const price = calculatePrice();
    const display = $('#cakePriceDisplay');
    if (display) {
      display.textContent = formatINR(price);
      display.animate([
        { transform: 'scale(1.1)', color: 'var(--gold)' },
        { transform: 'scale(1)', color: 'var(--gold)' }
      ], { duration: 300, easing: 'ease-out' });
    }
  }

  // Option buttons
  $$('.builder-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const parent = btn.closest('.builder-options');
      $$('.builder-option', parent).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updatePriceDisplay();
    });
  });

  // Weight slider
  const slider = $('#weightSlider');
  if (slider) {
    slider.addEventListener('input', () => {
      $('#weightDisplay').textContent = parseFloat(slider.value).toFixed(1);
      updatePriceDisplay();
    });
  }

  // Order cake button
  const orderBtn = $('#orderCakeBtn');
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      const price = calculatePrice();
      const fakeProduct = {
        id: 999,
        name: 'Custom Cake',
        img: 'product_cake.jpg',
        price: price
      };
      // Add to cart
      const existing = state.cart.find(i => i.id === 999);
      if (existing) existing.price = price;
      else state.cart.push({ ...fakeProduct, qty: 1 });
      updateCartUI();
      showToast('🎂 Custom cake added! We\'ll contact you to confirm details.');
      openCart();
    });
  }

  updatePriceDisplay();
}

/* ─── Mouse Glow Effect ──────────────────────────── */
(function initMouseGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:400px; height:400px;
    border-radius:50%; pointer-events:none; z-index:1;
    background:radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    transform:translate(-50%,-50%); transition:left 0.5s ease, top 0.5s ease;
    will-change:transform;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function updateGlow() {
    glow.style.left = mx + 'px';
    glow.style.top = my + 'px';
    requestAnimationFrame(updateGlow);
  }
  updateGlow();
})();

/* ─── 3D Card Tilt ───────────────────────────────── */
function initCardTilt() {
  document.addEventListener('mousemove', (e) => {
    $$('.product-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.5) {
        card.style.transform = `translateY(-8px) scale(1.01) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

/* ─── Newsletter ─────────────────────────────────── */
window.handleNewsletterSubmit = function(e) {
  e.preventDefault();
  const email = $('#newsletterEmail').value;
  showToast(`🍰 Welcome to the Sweet Circle! ${email} subscribed.`);
  $('#newsletterForm').reset();
};

/* ─── Magnetic Buttons ───────────────────────────── */
function initMagneticButtons() {
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ─── Floating Element Mouse Parallax ────────────── */
(function initHeroFloaters() {
  const floaters = $$('.floater');
  document.addEventListener('mousemove', (e) => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 2;
    const my = (e.clientY / window.innerHeight - 0.5) * 2;
    floaters.forEach((f, i) => {
      const depth = (i + 1) * 8;
      f.style.transform = `translateX(${mx * depth}px) translateY(${my * depth}px)`;
    });
  });
})();

/* ─── Smooth Scroll ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = $(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Lazy Image Fade-in ─────────────────────────── */
(function initImageFade() {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        img.onload = () => { img.style.opacity = '1'; };
        if (img.complete) img.style.opacity = '1';
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  $$('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
})();

/* ─── Stats Observer ─────────────────────────────── */
(function initStatsObserver() {
  const statsBar = $('#stats-bar');
  if (!statsBar) return;

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      animateStats();
    }
  }, { threshold: 0.3 });

  observer.observe(statsBar);
})();

/* ─── Timeline Hover Glow ────────────────────────── */
(function initTimelineGlow() {
  $$('.timeline-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
      const icon = step.querySelector('.timeline-icon');
      icon.style.boxShadow = '0 0 30px rgba(201,168,76,0.5), var(--shadow-md)';
    });
    step.addEventListener('mouseleave', () => {
      const icon = step.querySelector('.timeline-icon');
      icon.style.boxShadow = '';
    });
  });
})();

/* ─── Gallery Hover ──────────────────────────────── */
function initGallery() {
  $$('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position:fixed;inset:0;z-index:25000;
        background:rgba(0,0,0,0.95);
        display:flex;align-items:center;justify-content:center;
        cursor:pointer;
      `;
      lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width:90vw;max-height:90vh;object-fit:contain;border-radius:12px;box-shadow:0 40px 100px rgba(0,0,0,0.5);" />`;
      lightbox.addEventListener('click', () => lightbox.remove());
      document.body.appendChild(lightbox);
    });
  });
}

/* ─── Text Reveal Animations ─────────────────────── */
function initTextReveal() {
  const headline = $('#heroHeadline');
  if (!headline) return;

  const lines = $$('.line', headline);
  lines.forEach((line, i) => {
    line.style.transform = 'translateY(120%)';
    line.style.opacity = '0';
    line.style.transition = `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.12}s, opacity 0.6s ease ${0.5 + i * 0.12}s`;
  });

  setTimeout(() => {
    lines.forEach(line => {
      line.style.transform = 'translateY(0)';
      line.style.opacity = '1';
    });
  }, 1800); // After loader
}

/* ─── Hero CTA Animation ─────────────────────────── */
function initHeroCta() {
  const cta = $('#heroCta');
  if (!cta) return;
  cta.style.opacity = '0';
  cta.style.transform = 'translateY(30px)';
  cta.style.transition = 'opacity 0.8s ease 2.2s, transform 0.8s ease 2.2s';

  setTimeout(() => {
    cta.style.opacity = '1';
    cta.style.transform = 'translateY(0)';
  }, 1900);
}

/* ─── Button Ripple Effect ───────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-primary, .btn-checkout');
  if (!btn) return;

  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position:absolute;width:${size}px;height:${size}px;
    left:${x}px;top:${y}px;
    background:rgba(255,255,255,0.25);border-radius:50%;
    transform:scale(0);animation:rippleAnim 0.6s ease-out;
    pointer-events:none;
  `;

  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = '@keyframes rippleAnim { to { transform:scale(2.5); opacity:0; } }';
    document.head.appendChild(style);
  }

  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

/* ─── Scroll-Based Hero Text ─────────────────────── */
(function initHeroTextParallax() {
  const content = $('.hero-content');
  if (!content) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      content.style.transform = `translateY(${scrollY * 0.25}px)`;
      content.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
    }
  }, { passive: true });
})();

/* ─── Initialize Everything ──────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderMenuGrid();
  renderTestimonials();
  initFilters();
  initFAQ();
  initCakeBuilder();
  initGallery();
  initTextReveal();
  initHeroCta();
  initMagneticButtons();
  initCardTilt();
  initRevealAnimations();

  // Initial cart update
  updateCartUI();
});

/* ─── Keyboard Navigation ────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCart();
    closeCheckout();
    closeConfirmation();
    closeMobileMenu();
  }
});

/* ─── Performance: Passive Scroll ────────────────── */
window.addEventListener('scroll', () => {}, { passive: true });

console.log('%cFig & Flour 🎂', 'font-family:serif;font-size:2rem;color:#C9A84C;font-weight:bold;');
console.log('%cEvery Dessert Tells A Story', 'font-family:serif;font-style:italic;color:#A0522D;');
console.log('%c— Built with love for the craft of baking.', 'color:#888;font-size:0.9rem;');
