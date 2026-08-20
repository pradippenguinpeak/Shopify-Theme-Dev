document.addEventListener('DOMContentLoaded', function () {

  // Hero section is intentionally static; ticker animations are handled via CSS.
  const heroTickerColumns = document.querySelectorAll('.hero-ticker');
  heroTickerColumns.forEach(function (ticker) {
    const track = ticker.querySelector('.hero-ticker__track');
    const group = ticker.querySelector('.hero-ticker__group');

    if (track && group && group.children.length) {
      const clone = group.cloneNode(true);
      track.appendChild(clone);
    }
  });

  // Latest Arrivals Slider
  new Swiper('.latest-slider .swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 600,
    navigation: {
      nextEl: '.latest-slider .swiper-button-next',
      prevEl: '.latest-slider .swiper-button-prev',
    },
    scrollbar: {
      el: '.latest-slider .swiper-scrollbar',
      draggable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 12 },
      992: { slidesPerView: 3, spaceBetween: 12 },
      1200: { slidesPerView: 4, spaceBetween: 12 },
    },
  });

  // Variant swatch selection in latest cards
  document.querySelectorAll('.latest-card__swatches').forEach(function (group) {
    group.querySelectorAll('.swatch-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        group.querySelectorAll('.swatch-thumb').forEach(function (t) {
          t.classList.remove('active');
        });
        thumb.classList.add('active');
      });
    });
  });

  // Product Gallery — initialize per .product-gallery instance so multiple sections work
  (function initProductGalleries() {
    const galleries = Array.from(document.querySelectorAll('.product-gallery'));
    if (!galleries.length) return;

    galleries.forEach(function (gallery) {
      const thumbsEl = gallery.querySelector('.product-gallery__thumbs');
      const mainEl = gallery.querySelector('.product-gallery__main');
      if (!thumbsEl || !mainEl) return;

      const productThumbs = new Swiper(thumbsEl, {
        spaceBetween: 8,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        watchOverflow: false,
        navigation: {
          nextEl: gallery.querySelector('.product-thumb-next'),
          prevEl: gallery.querySelector('.product-thumb-prev'),
        },
        breakpoints: {
          0: { direction: 'horizontal', slidesPerView: 4 },
          768: { direction: 'vertical', slidesPerView: 4 },
        },
        observer: true,
        observeParents: true,
      });

      const productMain = new Swiper(mainEl, {
        spaceBetween: 0,
        navigation: {
          nextEl: gallery.querySelector('.product-gallery__main .swiper-button-next'),
          prevEl: gallery.querySelector('.product-gallery__main .swiper-button-prev'),
        },
        thumbs: { swiper: productThumbs },
        observer: true,
        observeParents: true,
        on: {
          init: function () {
            productThumbs.update();
            productThumbs.updateSlidesClasses();
          },
          slideChange: function () {
            syncProductThumb();
          },
        },
      });

      function syncProductThumb() {
        const activeIndex = productMain.realIndex;
        if (productThumbs && !productThumbs.destroyed && productThumbs.slides[activeIndex]) {
          productThumbs.slideTo(activeIndex, 300);
          productThumbs.updateSlidesClasses();
        }
      }

      // Sync colour swatches inside this gallery (if present)
      gallery.querySelectorAll('.product-colour-swatches .colour-swatch').forEach(function (swatch, index) {
        swatch.addEventListener('click', function () {
          gallery.querySelectorAll('.product-colour-swatches .colour-swatch').forEach(function (s) { s.classList.remove('active'); });
          swatch.classList.add('active');
          const colourLabel = gallery.querySelector('#selectedColour') || document.getElementById('selectedColour');
          if (colourLabel) colourLabel.textContent = swatch.dataset.colour;
          if (index < productMain.slides.length) productMain.slideTo(index);
        });
      });

      // Per-gallery resize sync
      let galleryResizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(galleryResizeTimer);
        galleryResizeTimer = setTimeout(function () {
          try {
            productThumbs.update();
            productThumbs.updateSlides();
            productThumbs.updateProgress();
            productThumbs.updateSlidesClasses();
            productMain.update();
            productMain.updateSlides();
            productMain.updateProgress();
            productMain.updateSlidesClasses();
            syncProductThumb();
          } catch (e) {
            // ignore errors if swiper destroyed
          }
        }, 150);
      });
    });
  })();

  // Product countdown timer
  const countdownEl = document.getElementById('productCountdown');
  if (countdownEl) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(endDate.getHours() + 10);
    endDate.setMinutes(endDate.getMinutes());
    endDate.setSeconds(59);

    const daysEl = countdownEl.querySelector('[data-days]');
    const hoursEl = countdownEl.querySelector('[data-hours]');
    const minsEl = countdownEl.querySelector('[data-minutes]');
    const secsEl = countdownEl.querySelector('[data-seconds]');

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minsEl) minsEl.textContent = pad(mins);
      if (secsEl) secsEl.textContent = pad(secs);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Product size selection
  document.querySelectorAll('.product-size-buttons .size-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.product-size-buttons').querySelectorAll('.size-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      const sizeLabel = document.getElementById('selectedSize');
      if (sizeLabel) sizeLabel.textContent = btn.dataset.size;
    });
  });

  // Product quantity controls
  const qtyInput = document.querySelector('.product-quantity .qty-input');
  const qtyMinus = document.querySelector('.product-quantity .qty-minus');
  const qtyPlus = document.querySelector('.product-quantity .qty-plus');

  if (qtyInput && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', function () {
      const val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', function () {
      const val = parseInt(qtyInput.value, 10) || 1;
      const max = parseInt(qtyInput.max, 10) || 99;
      if (val < max) qtyInput.value = val + 1;
    });
  }

  // Looks We Love — right-side product slider + static left copy
  const looksWeLoveEl = document.querySelector('.looks-we-love-slider');
  if (looksWeLoveEl) {
    const titleEl = document.getElementById('looksWeLoveTitle');
    const descEl = document.getElementById('looksWeLoveDesc');

    function updateLooksWeLoveContent(swiper) {
      const slide = swiper.slides[swiper.activeIndex];
      if (!slide) return;
      if (titleEl && slide.dataset.title) titleEl.textContent = slide.dataset.title;
      if (descEl && slide.dataset.desc) descEl.textContent = slide.dataset.desc;
    }

    const looksWeLoveSwiper = new Swiper(looksWeLoveEl, {
      slidesPerView: 1,
      speed: 700,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.looks-we-love-nav__btn--next',
        prevEl: '.looks-we-love-nav__btn--prev',
      },
      on: {
        init: function () {
          updateLooksWeLoveContent(this);
        },
        slideChange: function () {
          updateLooksWeLoveContent(this);
        },
      },
    });

    document.querySelectorAll('.looks-we-love-card').forEach(function (card) {
      const mainImage = card.querySelector('.looks-we-love-gallery__image');
      const thumbs = card.querySelectorAll('.looks-we-love-gallery__thumb');

      thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          thumbs.forEach(function (t) {
            t.classList.remove('active');
          });
          thumb.classList.add('active');
          if (mainImage && thumb.dataset.image) {
            mainImage.src = thumb.dataset.image;
            mainImage.alt = thumb.querySelector('img')?.alt || '';
          }
        });
      });
    });
  }

  // Shop By Category Slider
  new Swiper('.shop-category-slider .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 600,
    navigation: {
      nextEl: '.shop-category-slider .swiper-button-next',
      prevEl: '.shop-category-slider .swiper-button-prev',
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 12 },
      768: { slidesPerView: 3, spaceBetween: 12 },
      1200: { slidesPerView: 4, spaceBetween: 12 },
    },
  });

  // Cart Drawer — Today's Deal slider
  const cartDealsEl = document.querySelector('.cart-deals__swiper');
  if (cartDealsEl) {
    new Swiper(cartDealsEl, {
      slidesPerView: 1,
      spaceBetween: 12,
      speed: 1000,
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      navigation: {
        nextEl: '.cart-deals-next',
        prevEl: '.cart-deals-prev',
      },
      observer: true,
      observeParents: true,
    });
  }

  // Sticky Header Shadow
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    });
  }

  // Logo ticker — smooth JS-driven loop with scroll speed boost
  (function initLogoTicker() {
    const tickerSection = document.querySelector('.logo-ticker-section');
    if (!tickerSection) return;

    const tickers = Array.from(tickerSection.querySelectorAll('.logo-ticker'));
    if (!tickers.length) return;

    // State per ticker
    const tickerState = tickers.map(function (el) {
      // ensure content is long enough: if not duplicated, duplicate children for smooth loop
      const content = el.innerHTML;
      // If total width isn't at least twice container width, duplicate once
      // (we'll check widths after layout)
      return { el: el, offset: 0, speed: 60, boost: 1, boostTarget: 1 };
    });

    let lastTime = performance.now();

    // measure and, if needed, duplicate content to allow continuous loop
    function prepare() {
      tickerState.forEach(function (s) {
        const el = s.el;
        // if content width less than container, duplicate child nodes until large enough
        let totalWidth = el.scrollWidth;
        const parentWidth = el.parentElement ? el.parentElement.offsetWidth : window.innerWidth;
        if (totalWidth < parentWidth * 1.5) {
          // duplicate once
          el.innerHTML = el.innerHTML + el.innerHTML;
          totalWidth = el.scrollWidth;
        }
        s.loopWidth = totalWidth / 2; // assume duplicated content
      });
    }

    prepare();

    // RAF loop
    function tick(now) {
      const dt = (now - lastTime) / 1000; // seconds
      lastTime = now;

      tickerState.forEach(function (s) {
        // smooth boost towards target
        s.boost += (s.boostTarget - s.boost) * Math.min(1, dt * 6);
        const move = s.speed * s.boost * dt;
        s.offset -= move;
        if (s.loopWidth && s.offset <= -s.loopWidth) {
          s.offset += s.loopWidth;
        }
        s.el.style.transform = 'translateX(' + Math.round(s.offset) + 'px)';
      });

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(function (t) { lastTime = t; tick(t); });

    // scroll handler to set boostTarget
    let lastScrollY = window.scrollY;
    let scrolling = false;

    function onScroll() {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY;
      lastScrollY = currentY;
      const absDelta = Math.min(6, Math.abs(deltaY));
      // set boost target proportionally
      // stronger boost: smaller divisor -> larger boost for same scroll delta
      const boost = Math.min(10, 1 + Math.abs(deltaY) / 40);
      tickerState.forEach(function (s) { s.boostTarget = boost; });
      // after a short timeout, return target to 1
      clearTimeout(window.__logoTickerBoostTimeout);
      // keep the boost slightly longer so the fast movement is visible
      window.__logoTickerBoostTimeout = setTimeout(function () {
        tickerState.forEach(function (s) { s.boostTarget = 1; });
      }, 420);
    }

    window.addEventListener('scroll', function () {
      if (!scrolling) {
        window.requestAnimationFrame(function () { onScroll(); scrolling = false; });
        scrolling = true;
      }
    }, { passive: true });

    // Pause on hover
    tickers.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        tickerState.forEach(function (s) { if (s.el === el) s.boostTarget = 0; });
      });
      el.addEventListener('mouseleave', function () {
        tickerState.forEach(function (s) { if (s.el === el) s.boostTarget = 1; });
      });
    });
  })();

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');

  function openMenu() {
    mobileMenu?.classList.add('is-open');
    mobileOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu?.classList.remove('is-open');
    mobileOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileOverlay?.addEventListener('click', closeMenu);

  // Megamenu: support multiple dropdown parents (desktop hover, mobile click)
  (function initMegamenus() {
    const parents = Array.from(document.querySelectorAll('.megamenu-parent'));

    if (!parents.length) return;

    function closeAll() {
      parents.forEach(function (p) {
        const m = p.querySelector('.megamenu');
        if (m) m.setAttribute('aria-hidden', 'true');
        p.classList.remove('open');
      });
    }

    function openFor(p) {
      closeAll();
      const m = p.querySelector('.megamenu');
      if (m) m.setAttribute('aria-hidden', 'false');
      p.classList.add('open');
    }

    // Desktop hover
    parents.forEach(function (p) {
      const m = p.querySelector('.megamenu');

      p.addEventListener('mouseenter', function () {
        if (window.innerWidth >= 1199) openFor(p);
      });

      p.addEventListener('mouseleave', function () {
        if (window.innerWidth >= 1199) {
          const mm = p.querySelector('.megamenu');
          if (mm) mm.setAttribute('aria-hidden', 'true');
          p.classList.remove('open');
        }
      });

      // Mobile: toggle on click of the parent link
      const link = p.querySelector('a');
      if (link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth < 1199) {
            e.preventDefault();
            const isOpen = p.classList.toggle('open');
            if (p.querySelector('.megamenu')) p.querySelector('.megamenu').setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            // close others
            parents.forEach(function (other) {
              if (other !== p) {
                const om = other.querySelector('.megamenu');
                if (om) om.setAttribute('aria-hidden', 'true');
                other.classList.remove('open');
              }
            });
          }
        });
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      const clickedInside = parents.some(function (p) { return p.contains(e.target); });
      if (!clickedInside) closeAll();
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') closeAll();
    });
  })();

  // Mobile submenu toggle inside mobile menu
  document.querySelectorAll('.mobile-has-child').forEach(function (item) {
    const btn = item.querySelector('.mobile-sub-open');
    const submenu = item.querySelector('.mobile-submenu');
    btn?.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Cart drawer open/close
  (function initCartDrawer() {
    const cartBtns = Array.from(document.querySelectorAll('.action-btn[aria-label="Cart"]'));
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');

    if (!cartDrawer) return;

    function openCart() {
      cartDrawer.classList.add('is-open');
      cartDrawer.setAttribute('aria-hidden', 'false');
      cartOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      cartDrawer.classList.remove('is-open');
      cartDrawer.setAttribute('aria-hidden', 'true');
      cartOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    cartBtns.forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openCart(); }); });
    cartOverlay?.addEventListener('click', closeCart);
    cartClose?.addEventListener('click', closeCart);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });
  })();

  // Search drawer open/close + suggestions
  (function initSearchDrawer() {
    const searchBtns = Array.from(document.querySelectorAll('.action-btn[aria-label="Search"]'));
    const searchDrawer = document.getElementById('searchDrawer');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const suggestionsEl = document.getElementById('searchSuggestions');
    const resultsEl = document.getElementById('searchResults');

    if (!searchDrawer) return;

    function openSearch() {
      // close cart if open to avoid overlap
      const cartDrawer = document.getElementById('cartDrawer');
      const cartOverlay = document.getElementById('cartOverlay');
      if (cartDrawer && cartDrawer.classList.contains('is-open')) {
        cartDrawer.classList.remove('is-open');
        cartDrawer.setAttribute('aria-hidden', 'true');
      }
      if (cartOverlay && cartOverlay.classList.contains('is-open')) {
        cartOverlay.classList.remove('is-open');
      }

      searchDrawer.classList.add('is-open');
      searchDrawer.setAttribute('aria-hidden', 'false');
      searchOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // render default suggestions on open
      renderSuggestions('');
      setTimeout(() => searchInput?.focus(), 120);
    }

    function closeSearch() {
      searchDrawer.classList.remove('is-open');
      searchDrawer.setAttribute('aria-hidden', 'true');
      searchOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
      if (suggestionsEl) suggestionsEl.innerHTML = '';
      if (resultsEl) resultsEl.innerHTML = '';
    }

    searchBtns.forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openSearch(); }); });
    searchOverlay?.addEventListener('click', closeSearch);
    searchClose?.addEventListener('click', closeSearch);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });

    // build suggestions source from product titles on page
    const productTitles = Array.from(document.querySelectorAll('.latest-card__name')).map(function (el) { return el.textContent.trim(); });
    const tokenSet = new Set();
    productTitles.forEach(function (t) {
      t.split(/\s+/).forEach(function (w) { if (w && w.length > 2) tokenSet.add(w.toLowerCase()); });
    });
    const suggestionPool = Array.from(tokenSet).slice(0, 200);

    function renderSuggestions(query) {
      if (!suggestionsEl) return;
      suggestionsEl.innerHTML = '';
      const q = (query || '').toLowerCase();
      let matches;
      if (!q) {
        matches = suggestionPool.slice(0, 6);
      } else {
        matches = suggestionPool.filter(function (s) { return s.indexOf(q) === 0; }).slice(0, 6);
      }
      matches.forEach(function (m) {
        const li = document.createElement('li');
        li.textContent = m;
        li.addEventListener('click', function () {
          if (searchInput) searchInput.value = m; performSearch(m);
        });
        suggestionsEl.appendChild(li);
      });
    }

    function createResultCard(title, imgSrc, price, original) {
      const wrapper = document.createElement('div');
      wrapper.className = 'latest-card';
      wrapper.innerHTML = '<div class="latest-card__image"><img src="' + (imgSrc || 'assets/images/01.png') + '" alt="' + title + '"></div>' +
        '<div class="latest-card__info"><h3 class="latest-card__name">' + title + '</h3><p class="latest-card__price"><span class="price-current">' + (price || '') + '</span>' + (original ? '<span class="price-original">' + original + '</span>' : '') + '</p></div>';
      return wrapper;
    }

    function performSearch(query) {
      if (!resultsEl) return;
      resultsEl.innerHTML = '';
      if (!query) return;
      const q = query.toLowerCase();
      // find matching product titles
      const matches = productTitles.filter(function (t) { return t.toLowerCase().indexOf(q) !== -1; }).slice(0, 10);
      if (!matches.length) {
        resultsEl.innerHTML = '<p class="text-muted">No results</p>';
        return;
      }
      matches.forEach(function (t, i) {
        // try to find an image from the existing slide with same title
        const slideImg = Array.from(document.querySelectorAll('.latest-card')).find(function (c) { return c.querySelector('.latest-card__name')?.textContent.trim() === t; });
        const img = slideImg ? slideImg.querySelector('img')?.getAttribute('src') : null;
        const priceEl = slideImg ? slideImg.querySelector('.latest-card__price .price-current')?.textContent : '';
        const original = slideImg ? slideImg.querySelector('.latest-card__price .price-original')?.textContent : '';
        resultsEl.appendChild(createResultCard(t, img, priceEl, original));
      });
    }

    searchInput?.addEventListener('input', function (e) {
      const v = e.target.value.trim();
      renderSuggestions(v);
      if (v.length >= 2) {
        performSearch(v);
      } else {
        if (resultsEl) resultsEl.innerHTML = '';
      }
    });

    searchInput?.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(e.target.value.trim());
      }
    });
  })();

  // Delegated quantity handlers for any qty controls (cart items, product blocks)
  document.addEventListener('click', function (e) {
    const plusBtn = e.target.closest('.qty-plus');
    const minusBtn = e.target.closest('.qty-minus');

    if (!plusBtn && !minusBtn) return;

    // Find the nearest scope that contains the related input: cart-item or product-quantity
    const scope = (plusBtn || minusBtn).closest('.cart-item') || (plusBtn || minusBtn).closest('.product-quantity') || (plusBtn || minusBtn).parentElement;
    const input = scope ? scope.querySelector('.qty-input') : document.querySelector('.qty-input');
    if (!input) return;

    const min = parseInt(input.getAttribute('min'), 10) || 1;
    const max = parseInt(input.getAttribute('max'), 10) || 999;
    let val = parseInt(input.value, 10) || 0;

    if (plusBtn) {
      if (val < max) input.value = val + 1;
    } else if (minusBtn) {
      if (val > min) input.value = val - 1;
    }
  });

  // Ensure manual input respects min/max
  document.addEventListener('input', function (e) {
    if (!e.target || !e.target.classList) return;
    if (!e.target.classList.contains('qty-input')) return;
    const input = e.target;
    const min = parseInt(input.getAttribute('min'), 10) || 1;
    const max = parseInt(input.getAttribute('max'), 10) || 999;
    let val = parseInt(input.value, 10);
    if (isNaN(val)) return;
    if (val < min) input.value = min;
    if (val > max) input.value = max;
  });

  // Remove cart item when delete icon clicked
  document.addEventListener('click', function (e) {
    const rem = e.target.closest('.cart-item__remove');
    if (!rem) return;
    const item = rem.closest('.cart-item');
    if (item) item.remove();
  });

  // Quick product modal (common for all latest-card__cart-btn)
  (function initProductQuickModal() {
    const modalEl = document.getElementById('productModal');
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    const imageWrap = modalEl.querySelector('#productModalImageWrap');
    const infoWrap = modalEl.querySelector('#productModalInfo');
    const addBtn = modalEl.querySelector('#productModalAdd');

    // Simple behavior: open the modal when any latest-card__cart-btn is clicked.
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.latest-card__cart-btn');
      if (!btn) return;
      e.preventDefault();
      // leave modal content static — user can edit HTML in `home.html`
      modal.show();
    });

    addBtn?.addEventListener('click', function () {
      modal.hide();
      const flash = document.createElement('div');
      flash.textContent = 'Item added to cart';
      flash.style.cssText = 'position:fixed;right:20px;bottom:20px;background:#000;color:#fff;padding:10px 14px;border-radius:6px;z-index:2000;opacity:0;transition:opacity .2s';
      document.body.appendChild(flash);
      requestAnimationFrame(function () { flash.style.opacity = '1'; });
      setTimeout(function () { flash.style.opacity = '0'; setTimeout(function () { flash.remove(); }, 300); }, 1500);
    });
  })();

  // Color Swatch Selection
  document.querySelectorAll('.color-swatches .swatch').forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      swatch.closest('.color-swatches').querySelectorAll('.swatch').forEach(function (s) {
        s.classList.remove('active');
      });
      swatch.classList.add('active');
    });
  });

  // Size Button Selection
  document.querySelectorAll('.size-selector .size-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.size-selector').querySelectorAll('.size-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  // Scroll reveal animations
  const animateEls = document.querySelectorAll('[data-animate]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (animateEls.length && !prefersReducedMotion) {
    animateEls.forEach(function (el) {
      const delay = el.dataset.delay;
      if (delay) el.style.setProperty('--delay', delay);
    });

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px',
    });

    animateEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else if (animateEls.length) {
    animateEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Subtle parallax on banner backgrounds
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !prefersReducedMotion) {
    function updateParallax() {
      parallaxEls.forEach(function (el) {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.12;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const shift = (progress - 0.5) * 60 * speed;
          el.style.transform = 'translate3d(0, ' + shift + 'px, 0) scale(1.08)';
        }
      });
    }

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
  }

});
