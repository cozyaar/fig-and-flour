/* ===================================================
   FIG & FLOUR — Premium Full-Page Experience JS
   Winner-grade interactions. No generic layouts.
   =================================================== */

'use strict';

/* ─── State Management ────────────────────────────── */
const state = {
  cart: [],
  favorites: new Set(),
  selectedPayment: 'cash',
  couponApplied: false,
  giftWrap: false,
  darkMode: false,
  menuFilter: 'all',
  menuSearch: '',
  menuSort: 'default',
  currentTestimonial: 0
};

/* ─── Product Data ───────────────────────────────── */
const PRODUCTS = [
  { id: 1, name: 'Signature Vanilla Drip Cake', category: 'cakes', img: 'product_cake.jpg', price: 1899, oldPrice: 2299, rating: 5, reviews: 312, time: '48hr notice', calories: 420, desc: 'Three layers of Madagascar vanilla sponge, Swiss meringue buttercream, fresh berry compote.', badges: ['bestseller'] },
  { id: 2, name: 'Paris-Brest Croissant', category: 'pastries', img: 'product_croissant.jpg', price: 299, oldPrice: null, rating: 5, reviews: 487, time: '15 min', calories: 280, desc: 'Laminated butter croissant with 81 flaky layers. Baked fresh every morning by 7 AM.', badges: ['special'] },
  { id: 3, name: 'French Macaron Box (12)', category: 'macarons', img: 'product_macarons.jpg', price: 749, oldPrice: null, rating: 5, reviews: 623, time: '2–4 hr', calories: 95, desc: 'Assorted box of 12 handcrafted Parisian macarons in seasonal flavours. The perfect gift.', badges: ['bestseller', 'new'] },
  { id: 4, name: 'New York Berry Cheesecake', category: 'cheesecakes', img: 'product_cheesecake.jpg', price: 649, oldPrice: 799, rating: 4, reviews: 218, time: '24hr notice', calories: 510, desc: 'Dense, creamy New York-style cheesecake with wild berry compote and buttery Graham cracker base.', badges: [] },
  { id: 5, name: 'Artisan Signature Latte', category: 'coffee', img: 'product_coffee.jpg', price: 299, oldPrice: null, rating: 5, reviews: 834, time: '5 min', calories: 120, desc: 'Single-origin Coorg estate espresso with hand-steamed farm-fresh milk and signature latte art.', badges: ['special'] },
  { id: 6, name: 'Mixed Berry Tart', category: 'tarts', img: 'product_tart.jpg', price: 549, oldPrice: null, rating: 5, reviews: 156, time: '4–6 hr', calories: 380, desc: 'Buttery shortcrust tart, vanilla crème pâtissière, glossy seasonal fruits and fig jam glaze.', badges: ['special'] },
  { id: 7, name: 'Gold Flake Brownie Stack', category: 'brownies', img: 'product_brownie.jpg', price: 399, oldPrice: 449, rating: 5, reviews: 291, time: '30 min', calories: 450, desc: 'Fudgy 70% dark chocolate brownies, sea salt crystals, edible gold flakes. Pure indulgence.', badges: ['bestseller'] },
  { id: 8, name: 'Rose Petal Cupcake', category: 'cakes', img: 'product_cupcake.jpg', price: 249, oldPrice: null, rating: 4, reviews: 178, time: '20 min', calories: 310, desc: 'Light vanilla sponge topped with swirled rose water buttercream, edible petals and gold dust.', badges: ['new'] },
  { id: 9, name: 'Dark Chocolate Chip Cookie', category: 'cookies', img: 'product_cookie.jpg', price: 199, oldPrice: null, rating: 5, reviews: 512, time: '10 min', calories: 280, desc: 'Warm gooey center. Crispy edges. 72% Valrhona chocolate chunks with Himalayan pink salt.', badges: ['bestseller'] }
];

const TESTIMONIALS = [
  { name: 'Aisha Kapoor', location: 'Bandra, Mumbai', rating: 5, text: "The pistachio rose cake was so beautiful I almost couldn't cut it. Three-tier wedding cake — our guests are still talking about it two months later. Absolute perfection." },
  { name: 'Rohan Mehta', location: 'Juhu, Mumbai', rating: 5, text: "I've been a regular at Fig & Flour for six years. Nothing else in Mumbai comes close. The croissants every Saturday morning are my weekly ritual." },
  { name: 'Preethi Krishnan', location: 'Lower Parel', rating: 5, text: "Ordered a custom birthday cake for my daughter's 7th birthday — a unicorn castle with real edible gold. The look on her face was worth every rupee. Magical!" },
  { name: 'Samira Sheikh', location: 'Worli, Mumbai', rating: 5, text: "As a food critic, I've visited patisseries across Paris, Tokyo and New York. Fig & Flour belongs in the same conversation. Their macarons are genuinely world-class." },
  { name: 'Vikram Anand', location: 'Powai, Mumbai', rating: 5, text: "The Gold Flake Brownies are criminally good. I've tried stopping myself from ordering every week and I simply cannot. Five stars, zero regrets." },
  { name: 'Meera Pillai', location: 'Chembur, Mumbai', rating: 4, text: "Beautiful packaging, exceptional quality, incredibly helpful staff. They went out of their way to accommodate a last-minute custom order. So grateful!" },
  { name: 'Arjun Das', location: 'Andheri, Mumbai', rating: 5, text: "Corporate event with 200 guests, and Fig & Flour delivered 400 pastries on time, perfectly presented. Not a single complaint — only compliments!" },
  { name: 'Nandini Rao', location: 'Colaba, Mumbai', rating: 5, text: "The berry cheesecake is legitimately the best I've ever had. Light, creamy, perfectly balanced. Thank you, Fig & Flour!" }
];

/* ─── DOM Selector Helpers ──────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const formatINR = n => '₹' + n.toLocaleString('en-IN');
const lerp = (a, b, t) => a * (1 - t) + b * t;

/* ─── Full Page Scroll Engine ────────────────────── */
class FullPageScroll {
  constructor() {
    this.pages = $$('.pg');
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.dots = $$('.pnav-dot');
    this.pageCounterCurr = $('#pgcCurrent');
    this.pageCounterTotal = $('#pgcTotal');
    this.nav = $('#page-nav');
    this.ctr = $('#page-counter');
    this.startY = 0;

    this.init();
  }

  init() {
    // Total pages count
    if (this.pageCounterTotal) {
      this.pageCounterTotal.textContent = String(this.pages.length).padStart(2, '0');
    }

    // Set initial classes
    this.pages.forEach((pg, i) => {
      if (i === 0) {
        pg.classList.add('is-active');
      } else {
        pg.classList.remove('is-active');
      }
    });

    // Listeners
    window.addEventListener('wheel', e => this.handleWheel(e), { passive: false });
    window.addEventListener('keydown', e => this.handleKeydown(e));
    window.addEventListener('touchstart', e => this.handleTouchStart(e), { passive: true });
    window.addEventListener('touchmove', e => this.handleTouchMove(e), { passive: false });

    // Navigation Dot clicks
    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        this.goTo(idx);
      });
    });

    this.updateUI();
    this.triggerEntryAnimations(0);
  }

  handleWheel(e) {
    // If active page is scrollable, check boundaries
    const activePage = this.pages[this.currentIndex];
    if (activePage.classList.contains('pg--scroll')) {
      const atTop = activePage.scrollTop <= 0;
      const atBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 2;

      if (e.deltaY > 0 && !atBottom) return; // scroll down inside container
      if (e.deltaY < 0 && !atTop) return;    // scroll up inside container
    }

    e.preventDefault();
    if (this.isTransitioning) return;

    if (e.deltaY > 30) {
      this.goTo(this.currentIndex + 1);
    } else if (e.deltaY < -30) {
      this.goTo(this.currentIndex - 1);
    }
  }

  handleKeydown(e) {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

    const activePage = this.pages[this.currentIndex];
    if (activePage.classList.contains('pg--scroll')) {
      const atTop = activePage.scrollTop <= 0;
      const atBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 2;

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && !atBottom) return;
      if ((e.key === 'ArrowUp' || e.key === 'PageUp') && !atTop) return;
    }

    if (this.isTransitioning) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      this.goTo(this.currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      this.goTo(this.currentIndex - 1);
    }
  }

  handleTouchStart(e) {
    this.startY = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    const activePage = this.pages[this.currentIndex];
    const currentY = e.touches[0].clientY;
    const diff = this.startY - currentY;

    if (activePage.classList.contains('pg--scroll')) {
      const atTop = activePage.scrollTop <= 0;
      const atBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 2;

      if (diff > 0 && !atBottom) return; // dragging up -> scrolls down
      if (diff < 0 && !atTop) return;    // dragging down -> scrolls up
    }

    if (Math.abs(diff) > 40) {
      if (e.cancelable) e.preventDefault();
      if (this.isTransitioning) return;

      if (diff > 0) {
        this.goTo(this.currentIndex + 1);
      } else {
        this.goTo(this.currentIndex - 1);
      }
    }
  }

  goTo(idx) {
    if (idx < 0 || idx >= this.pages.length) return;
    if (this.currentIndex === idx) return;

    this.isTransitioning = true;
    const prevIndex = this.currentIndex;
    this.currentIndex = idx;

    const prevPage = this.pages[prevIndex];
    const currPage = this.pages[idx];

    // Transition Setup
    this.pages.forEach((pg, i) => {
      pg.classList.remove('is-transitioning');
      if (i < idx) {
        pg.classList.add('is-above');
        pg.classList.remove('is-active');
      } else if (i > idx) {
        pg.classList.remove('is-above', 'is-active');
      }
    });

    // Forced reflow
    currPage.clientHeight;

    currPage.classList.add('is-transitioning');
    prevPage.classList.add('is-transitioning');

    currPage.classList.add('is-active');
    prevPage.classList.remove('is-active');

    // UI Updates
    this.updateUI();

    setTimeout(() => {
      this.isTransitioning = false;
      this.triggerEntryAnimations(idx);
    }, 950);
  }

  updateUI() {
    // Update Dots
    this.dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentIndex);
    });

    // Update Counter
    if (this.pageCounterCurr) {
      this.pageCounterCurr.textContent = String(this.currentIndex + 1).padStart(2, '0');
    }

    // Light Theme / Dark Theme adaptation for global indicators
    const currentThemeClass = this.pages[this.currentIndex].classList.contains('pg-cream');
    if (this.nav) this.nav.classList.toggle('nav-on-light', currentThemeClass);
    if (this.ctr) this.ctr.classList.toggle('ctr-on-light', currentThemeClass);

    // Dynamic Header Logo & Links tint adaptation
    const siteHeader = $('#siteHeader');
    if (siteHeader) {
      if (currentThemeClass) {
        siteHeader.style.setProperty('--nav-text-color', 'var(--chocolate)');
        siteHeader.style.setProperty('--nav-text-muted', 'rgba(107,58,36,0.6)');
      } else {
        siteHeader.style.setProperty('--nav-text-color', 'var(--cream)');
        siteHeader.style.setProperty('--nav-text-muted', 'var(--gold-muted)');
      }
    }
  }

  triggerEntryAnimations(idx) {
    const page = this.pages[idx];
    const animItems = $$('.pg-anim-item', page);
    animItems.forEach(item => item.classList.add('animated'));

    // If stats page, count stats
    if (idx === 1) {
      animateStats();
    }

    // Story image parallax activation
    if (idx === 4) {
      const img = $('#storyImg');
      if (img) img.style.transform = 'scale(1.05)';
    } else {
      const img = $('#storyImg');
      if (img) img.style.transform = 'scale(1.0)';
    }
  }
}

let fps;

/* ─── Custom Smooth Cursor ───────────────────────── */
(function initCursor() {
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let isMoving = false, timer;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    isMoving = true;
    clearTimeout(timer);
    timer = setTimeout(() => { isMoving = false; }, 150);
  });

  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(0.7)';
    dot.style.transform = 'translate(-50%,-50%) scale(1.6)';
  });
  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  // Hover detection
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, [role="tab"], .product-card, .gm-item, .bopt, .mcat');
    if (el) { ring.classList.add('hovered'); dot.style.opacity = '0'; }
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest('a, button, [role="tab"], .product-card, .gm-item, .bopt, .mcat');
    if (el) { ring.classList.remove('hovered'); dot.style.opacity = '1'; }
  });

  function animate() {
    rx = rx + (mx - rx) * 0.15;
    ry = ry + (my - ry) * 0.15;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ─── Loader Logic ───────────────────────────────── */
(function initLoader() {
  const loader = $('#loader');
  const logo = $('#loaderLogo');
  const tagline = $('#loaderTagline');
  const barContainer = $('#loaderBarContainer');
  const bar = $('#loaderBar');
  const crumbs = $('#loaderCrumbs');

  // Spark crumbs inside loader
  const crumbColors = ['#B8954A', '#C4758A', '#8FAF6E', '#FAF7F2'];
  for (let i = 0; i < 20; i++) {
    const c = document.createElement('div');
    c.className = 'crumb';
    const size = Math.random() * 6 + 2;
    c.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%; top:${Math.random() * 100}%;
      background:${crumbColors[Math.floor(Math.random() * crumbColors.length)]};
      animation: floatCrumb ${6 + Math.random() * 6}s ease-in-out ${Math.random() * 3}s infinite;
    `;
    crumbs.appendChild(c);
  }

  // Animation triggers
  setTimeout(() => {
    logo.style.transition = 'opacity 1s var(--ease-out), transform 1s var(--ease-out)';
    logo.style.opacity = '1';
    logo.style.transform = 'translateY(0)';
  }, 100);
  setTimeout(() => { tagline.style.transition = 'opacity 0.7s'; tagline.style.opacity = '1'; }, 700);
  setTimeout(() => { barContainer.style.transition = 'opacity 0.5s'; barContainer.style.opacity = '1'; }, 1000);

  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      bar.style.width = '100%';
      setTimeout(removeLoader, 400);
    } else {
      bar.style.width = progress + '%';
    }
  }, 90);

  function removeLoader() {
    loader.style.transition = 'clip-path 1.1s var(--ease-expo), opacity 0.5s';
    loader.style.clipPath = 'polygon(0 0, 100% 0, 100% 0%, 0 0%)';
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.remove('loading');

      // Initialize FullPageScroll
      fps = new FullPageScroll();

      // Trigger hero text animations
      const heroHead = $('#heroHeadline');
      if (heroHead) heroHead.classList.add('revealed');

      spawnDriftingParticles();
    }, 1100);
  }
})();

/* ─── Hero Countdown ─────────────────────────────── */
(function() {
  const cd = $('#hh-countdown');
  if (!cd) return;
  const target = new Date();
  target.setHours(18, 0, 0, 0);
  if (new Date() > target) target.setDate(target.getDate() + 1);

  function update() {
    const diff = target - new Date();
    if (diff <= 0) return;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    cd.textContent = `${h}:${m}:${s}`;
  }
  update();
  setInterval(update, 1000);
})();

/* ─── Ticker Strip Background ────────────────────── */
(function initTicker() {
  const ticker = $('#tickerInner');
  if (!ticker) return;
  const items = [
    'Handcrafted Daily', '🥐', 'Paris-Inspired', 'Est. 1998', '🎂', 'Mumbai\'s Finest',
    'Le Cordon Bleu', '☕', 'Zero Compromise', 'Every Dessert Tells A Story', '✦',
    'Handcrafted Daily', '🥐', 'Paris-Inspired', 'Est. 1998', '🎂', 'Mumbai\'s Finest',
    'Le Cordon Bleu', '☕', 'Zero Compromise', 'Every Dessert Tells A Story', '✦'
  ];
  ticker.innerHTML = items.map(item => `<span>${item}</span>`).join('');
})();

/* ─── Stats Count-Up Animation ───────────────────── */
function animateStats() {
  $$('#pg-1 [data-target]').forEach(el => {
    if (el.classList.contains('counted')) return;
    el.classList.add('counted');
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const duration = 2000;

    (function tick(now) {
      const pct = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 4); // OutQuart
      const val = Math.floor(ease * target);

      el.textContent = val + suffix;
      if (pct < 1) requestAnimationFrame(tick);
    })(start);
  });
}

/* ─── Product Card Generation ────────────────────── */
function makeProductCard(p, i) {
  const isFav = state.favorites.has(p.id);
  const badgeHTML = p.badges.map(b => `<span class="badge badge-${b}">${b}</span>`).join('');
  const priceHTML = p.oldPrice
    ? `${formatINR(p.price)}<span class="product-price-old">${formatINR(p.oldPrice)}</span>`
    : formatINR(p.price);

  return `
    <article class="product-card visible" role="listitem" data-category="${p.category}" aria-label="${p.name}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="product-badges">${badgeHTML}</div>
        <button class="product-fav${isFav ? ' active' : ''}" onclick="toggleFavorite(${p.id}, this)">
          ${isFav ? '❤️' : '♡'}
        </button>
        <div class="quick-add">
          <button class="btn-quick-add" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="btn-view" onclick="viewProductDetails(${p.id})">↗</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-meta">
          <div class="product-rating">★ ${p.rating} <span>(${p.reviews})</span></div>
          <div>⏱ ${p.time}</div>
          <div>🔥 ${p.calories} cal</div>
        </div>
        <div class="product-footer">
          <div class="product-price">${priceHTML}</div>
          <button class="btn-add-cart" onclick="addToCart(${p.id})">+</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  // Page 3 bestseller grid
  const bestsellersGrid = $('#productsGrid');
  if (bestsellersGrid) {
    bestsellersGrid.innerHTML = PRODUCTS.slice(0, 4).map((p, i) => makeProductCard(p, i)).join('');
  }

  // Page 6 menu grid
  renderMenuGrid();
}

function renderMenuGrid() {
  const menuGrid = $('#menuGrid');
  if (!menuGrid) return;

  let filtered = PRODUCTS;
  if (state.menuFilter !== 'all') {
    filtered = filtered.filter(p => p.category === state.menuFilter);
  }

  if (state.menuSearch) {
    const q = state.menuSearch.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  }

  if (state.menuSort === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (state.menuSort === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (state.menuSort === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  menuGrid.innerHTML = filtered.map((p, i) => makeProductCard(p, i)).join('');
}

/* Category filter buttons inside Page 3 / Page 6 */
(function initCategoryFilters() {
  // Page 3 custom slider filters can just scroll to menu
  const filterRow = $('#collectionFilterRow');
  if (filterRow) {
    const cats = ['all', 'cakes', 'pastries', 'macarons', 'coffee'];
    filterRow.innerHTML = cats.map(c => `
      <button class="filter-btn${c === 'all' ? ' active' : ''}" onclick="filterCollection('${c}', this)">
        ${c}
      </button>
    `).join('');
  }

  // Page 6 category filters
  $$('[data-mf]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-mf]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.menuFilter = btn.dataset.mf;
      renderMenuGrid();
    });
  });

  // Search/Sort listeners
  const searchInput = $('#menuSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      state.menuSearch = e.target.value;
      renderMenuGrid();
    });
  }

  const sortSelect = $('#menuSort');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      state.menuSort = e.target.value;
      renderMenuGrid();
    });
  }
})();

window.filterCollection = (cat, btn) => {
  $$('.filter-btn', $('#collectionFilterRow')).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cards = $$('.product-card', $('#productsGrid'));
  cards.forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
  });
};

window.toggleFavorite = (id, btn) => {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    btn.textContent = '♡';
    btn.classList.remove('active');
  } else {
    state.favorites.add(id);
    btn.textContent = '❤️';
    btn.classList.add('active');
  }
};

/* ─── Cart Management ────────────────────────────── */
window.addToCart = (id, qty = 1) => {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = state.cart.find(x => x.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ ...p, qty });
  }
  updateCart();
  openCart();
};

window.changeQty = (id, d) => {
  const item = state.cart.find(x => x.id === id);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(x => x.id !== id);
  }
  updateCart();
};

window.removeFromCart = (id) => {
  state.cart = state.cart.filter(x => x.id !== id);
  updateCart();
};

function updateCart() {
  const badge = $('#cartBadge');
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.classList.toggle('has-items', count > 0);

  const container = $('#cartItems');
  const empty = $('#cartEmpty');

  if (state.cart.length === 0) {
    empty.style.display = 'flex';
    $$('.cart-item', container).forEach(el => el.remove());
  } else {
    empty.style.display = 'none';
    $$('.cart-item', container).forEach(el => el.remove());

    state.cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" loading="lazy" /></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatINR(item.price)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button class="cart-remove" onclick="removeFromCart(${item.id})">✕</button>
      `;
      container.appendChild(el);
    });
  }

  // Calculate pricing
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const giftWrap = $('#giftWrapCheck').checked ? 50 : 0;
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal > 999 ? 0 : 49;
  const discount = state.couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + gst + delivery + giftWrap - discount;

  $('#cartSubtotal').textContent = formatINR(subtotal);
  $('#cartGst').textContent = formatINR(gst);
  $('#cartDelivery').textContent = delivery === 0 ? 'FREE' : formatINR(delivery);
  
  const discountRow = $('#cartDiscount');
  if (discount > 0) {
    discountRow.style.display = 'flex';
    $('#cartDiscountVal').textContent = '−' + formatINR(discount);
  } else {
    discountRow.style.display = 'none';
  }

  $('#cartTotal').textContent = formatINR(total);
  $('#checkoutTotalDisplay').textContent = formatINR(total);
  const ctd2 = $('#checkoutTotalDisplay2');
  if (ctd2) ctd2.textContent = formatINR(total);
}

$('#giftWrapCheck').addEventListener('change', updateCart);

window.applyCoupon = () => {
  const input = $('#couponInput');
  if (input.value.trim().toUpperCase() === 'SWEET10') {
    state.couponApplied = true;
    updateCart();
    showToast('🎉 SWEET10 coupon applied successfully!');
  } else {
    showToast('❌ Invalid coupon code');
  }
};

window.openCart = () => {
  $('#cart-drawer').classList.add('open');
  $('#cart-overlay').classList.add('visible');
};

window.closeCart = () => {
  $('#cart-drawer').classList.remove('open');
  $('#cart-overlay').classList.remove('visible');
};

/* ─── Lightbox Product View ─────────────────────── */
window.viewProductDetails = (id) => {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  
  const box = document.createElement('div');
  box.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(26,15,8,0.92); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center; padding: 2rem;
  `;
  box.innerHTML = `
    <div style="background: white; color: var(--charcoal); max-width: 680px; width:100%; display: grid; grid-template-columns: 1fr 1.2fr; border-radius: 0; position: relative;">
      <button onclick="this.closest('[style]').remove()" style="position: absolute; top: 1rem; right: 1rem; font-size: 1.2rem; color: #aaa;">✕</button>
      <div style="height: 100%;"><img src="${p.img}" alt="${p.name}" /></div>
      <div style="padding: 2.5rem;">
        <span style="font-family: var(--font-sans); font-size: 0.55rem; color: var(--gold); letter-spacing: 0.25em; text-transform: uppercase;">${p.category}</span>
        <h3 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 300; margin: 0.5rem 0 1rem;">${p.name}</h3>
        <p style="font-family: var(--font-body); font-size: 0.9rem; line-height: 1.6; color: #666; margin-bottom: 1.5rem;">${p.desc}</p>
        <div style="font-family: var(--font-sans); font-size: 0.6rem; color: #aaa; margin-bottom: 1.5rem; display: flex; gap: 1rem;">
          <span>⏱ ${p.time}</span>
          <span>🔥 ${p.calories} cal</span>
        </div>
        <div style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 300; margin-bottom: 1.5rem;">${formatINR(p.price)}</div>
        <button onclick="addToCart(${p.id}); this.closest('[style]').remove();" style="width: 100%; padding: 0.8rem; background: var(--chocolate); color: white; font-family: var(--font-sans); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.2em;">Add to Cart</button>
      </div>
    </div>
  `;
  box.addEventListener('click', e => {
    if (e.target === box) box.remove();
  });
  document.body.appendChild(box);
};

/* ─── Checkout Flow ──────────────────────────────── */
window.openCheckout = () => {
  if (state.cart.length === 0) {
    showToast('🛒 Your cart is empty');
    return;
  }
  closeCart();
  $('#checkout-modal').classList.add('open');
};

window.closeCheckout = () => {
  $('#checkout-modal').classList.remove('open');
};

window.selectPayment = (method, el) => {
  state.selectedPayment = method;
  $$('.payment-method').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
};

window.placeOrder = (e) => {
  e.preventDefault();
  closeCheckout();
  
  const num = '#FF-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000);
  $('#orderNumberDisplay').textContent = num;
  
  const mins = Math.floor(Math.random() * 15 + 45);
  $('#confirmDeliveryTime').textContent = `Estimated delivery time: ${mins} minutes`;

  $('#order-confirmation').classList.add('open');
  state.cart = [];
  updateCart();
  triggerConfetti();
};

window.closeConfirmation = () => {
  $('#order-confirmation').classList.remove('open');
  if (fps) fps.goTo(0);
};

/* Confetti Burst */
function triggerConfetti() {
  const colors = ['#B8954A', '#FAF7F2', '#E8DDD0', '#6B3A24'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;
    const duration = Math.random() * 2 + 1.5;
    
    c.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px; height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      --dur: ${duration}s;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), duration * 1000);
  }
}

/* ─── Cake Builder ───────────────────────────────── */
function initCakeBuilder() {
  const BASE_PRICE = 1299;
  
  const getOptPrice = (selector) => {
    const active = $(`${selector} .selected`);
    return active ? parseInt(active.dataset.price || 0) : 0;
  };

  const updateBuilderPrice = () => {
    const shape = getOptPrice('#shapeOptions');
    const flavour = getOptPrice('#flavourOptions');
    const cream = getOptPrice('#creamOptions');
    const topping = getOptPrice('#toppingOptions');
    const weight = parseFloat($('#weightSlider').value);

    const price = Math.round((BASE_PRICE + shape + flavour + cream + topping) * weight);
    $('#cakePriceDisplay').textContent = formatINR(price);
  };

  $$('.bopt').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.builder-opts');
      $$('.bopt', parent).forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
      updateBuilderPrice();
    });
  });

  const weightSlider = $('#weightSlider');
  if (weightSlider) {
    weightSlider.addEventListener('input', () => {
      const v = parseFloat(weightSlider.value).toFixed(1);
      $('#weightLabel').textContent = `${v} kg`;
      updateBuilderPrice();
    });
  }

  const orderCakeBtn = $('#orderCakeBtn');
  if (orderCakeBtn) {
    orderCakeBtn.addEventListener('click', () => {
      const finalPrice = Math.round(
        (BASE_PRICE + getOptPrice('#shapeOptions') + getOptPrice('#flavourOptions') + getOptPrice('#creamOptions') + getOptPrice('#toppingOptions')) * parseFloat(weightSlider.value)
      );

      const item = {
        id: 999,
        name: 'Custom Celebration Cake',
        img: 'product_cake.jpg',
        price: finalPrice,
        qty: 1
      };

      state.cart.push(item);
      updateCart();
      openCart();
      showToast('🎂 Custom Cake added to your basket');
    });
  }

  updateBuilderPrice();
}

/* ─── Testimonials Carousel ──────────────────────── */
function renderTestimonials() {
  const showcase = $('#testiShowcase');
  const prevBtn = $('#testiBtnPrev');
  const nextBtn = $('#testiBtnNext');
  const indexDisp = $('#testiIdx');
  const dotsContainer = $('#testiDots');
  
  if (!showcase) return;

  function show(idx) {
    state.currentTestimonial = idx;
    const t = TESTIMONIALS[idx];
    
    showcase.innerHTML = `
      <div class="testi-quote-mark">“</div>
      <blockquote class="testi-text">${t.text}</blockquote>
      <div class="testi-author-row">
        <div class="testi-avatar">${t.name[0]}</div>
        <div class="testi-author-info">
          <div class="name">${t.name}</div>
          <div class="loc">${t.location}</div>
          <div class="testi-stars">${'★'.repeat(t.rating)}</div>
        </div>
      </div>
    `;

    indexDisp.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(TESTIMONIALS.length).padStart(2, '0')}`;

    // Update Dots
    dotsContainer.innerHTML = TESTIMONIALS.map((_, i) => `
      <button class="testi-dot${i === idx ? ' active' : ''}" onclick="setTestimonial(${i})"></button>
    `).join('');
  }

  window.setTestimonial = (i) => show(i);

  prevBtn.addEventListener('click', () => {
    let nextIdx = state.currentTestimonial - 1;
    if (nextIdx < 0) nextIdx = TESTIMONIALS.length - 1;
    show(nextIdx);
  });

  nextBtn.addEventListener('click', () => {
    let nextIdx = state.currentTestimonial + 1;
    if (nextIdx >= TESTIMONIALS.length) nextIdx = 0;
    show(nextIdx);
  });

  show(0);
}

/* ─── FAQ Accordions ─────────────────────────────── */
function initFAQ() {
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      $$('.faq-item').forEach(x => x.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ─── Toast Alerts ───────────────────────────────── */
function showToast(msg) {
  let toast = $('#toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ─── Drifting Flour Background Particles ─────────── */
function spawnDriftingParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.15;
  `;
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: Math.random() * 0.3 + 0.2,
    r: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(250, 247, 242, ${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.y > h) { p.y = -10; p.x = Math.random() * w; }
      if (p.x > w) p.x = 0;
      if (p.x < 0) p.x = w;
    });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ─── Mobile Menu ────────────────────────────────── */
(function initMobileMenu() {
  const burger = $('#hamburger');
  const menu = $('#mobile-menu');
  const close = $('#mobileMenuClose');

  if (burger && menu) {
    burger.addEventListener('click', () => menu.classList.add('open'));
  }
  if (close && menu) {
    close.addEventListener('click', () => menu.classList.remove('open'));
  }
  window.closeMobileMenu = () => {
    if (menu) menu.classList.remove('open');
  };
})();

/* ─── Newsletter ─────────────────────────────────── */
window.handleNewsletter = (e) => {
  e.preventDefault();
  showToast('🍰 Welcome to the Circle! Expect sweet emails.');
  e.target.reset();
};

/* ─── Mouse Parallax on Float Elements ───────────── */
(function initMouseParallax() {
  const container = $('#pg-0');
  if (!container) return;

  container.addEventListener('mousemove', e => {
    const floaters = $$('.floater');
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    floaters.forEach((f, i) => {
      const depth = (i + 1) * 8;
      f.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  });
})();

/* ─── Magnetic Springs on Buttons ────────────────── */
(function initMagneticButtons() {
  $$('.hero-btn-primary, .btn-checkout, .btn-reserve').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ─── Init on Load ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initFAQ();
  initCakeBuilder();
  renderTestimonials();
});
