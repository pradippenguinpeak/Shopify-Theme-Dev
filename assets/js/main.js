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
      576: { slidesPerView: 2, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1200: { slidesPerView: 4, spaceBetween: 24 },
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

  // Product Gallery — thumbs + main swiper
const productThumbsEl = document.querySelector('.product-gallery__thumbs');
const productMainEl = document.querySelector('.product-gallery__main');

if (productThumbsEl && productMainEl) {

    const productThumbs = new Swiper(productThumbsEl, {
        spaceBetween: 8,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        watchOverflow: false,

        navigation: {
            nextEl: '.product-thumb-next',
            prevEl: '.product-thumb-prev',
        },

        breakpoints: {
            0: {
                direction: 'horizontal',
                slidesPerView: 4,
            },

            992: {
                direction: 'vertical',
                slidesPerView: 4,
            },
        },

        observer: true,
        observeParents: true,
    });


    const productMain = new Swiper(productMainEl, {
        spaceBetween: 0,

        navigation: {
            nextEl: '.product-gallery__main .swiper-button-next',
            prevEl: '.product-gallery__main .swiper-button-prev',
        },

        thumbs: {
            swiper: productThumbs,
        },

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

            resize: function () {
                setTimeout(function () {
                    productThumbs.update();
                    productThumbs.updateSlidesClasses();
                    syncProductThumb();
                }, 100);
            }
        }
    });


    // Keep thumbnail navigation synced with main slider
    function syncProductThumb() {

        const activeIndex = productMain.realIndex;

        if (
            productThumbs &&
            !productThumbs.destroyed &&
            productThumbs.slides[activeIndex]
        ) {
            productThumbs.slideTo(activeIndex, 300);
            productThumbs.updateSlidesClasses();
        }
    }


    // Sync colour swatches with gallery
    document
        .querySelectorAll('.product-colour-swatches .colour-swatch')
        .forEach(function (swatch, index) {

            swatch.addEventListener('click', function () {

                document
                    .querySelectorAll('.product-colour-swatches .colour-swatch')
                    .forEach(function (s) {
                        s.classList.remove('active');
                    });

                swatch.classList.add('active');

                const colourLabel = document.getElementById('selectedColour');

                if (colourLabel) {
                    colourLabel.textContent = swatch.dataset.colour;
                }

                if (index < productMain.slides.length) {
                    productMain.slideTo(index);
                }
            });
        });


    // Extra resize sync
    let galleryResizeTimer;

    window.addEventListener('resize', function () {

        clearTimeout(galleryResizeTimer);

        galleryResizeTimer = setTimeout(function () {

            productThumbs.update();
            productThumbs.updateSlides();
            productThumbs.updateProgress();
            productThumbs.updateSlidesClasses();

            productMain.update();
            productMain.updateSlides();
            productMain.updateProgress();
            productMain.updateSlidesClasses();

            syncProductThumb();

        }, 150);
    });
}

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
      576: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 24 },
      1200: { slidesPerView: 4, spaceBetween: 24 },
    },
  });

  // Sticky Header Shadow
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    });
  }

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
