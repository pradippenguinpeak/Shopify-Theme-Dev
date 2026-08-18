// Shop By Products — category tabs + product grid (Figma 76-1482)
(function () {
  'use strict';

  var PRODUCTS = {
    dresses: [
      {
        name: 'Black Button-Front A-Line Mini Skirt',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
        badge: 'best',
        badgeText: 'BEST PRICE',
        price: '1,799.00',
        originalPrice: '2,599.00',
        swatches: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=60&q=60',
          'https://images.unsplash.com/photo-1509635279423-031e5d7f3c8e?w=60&q=60',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=60&q=60',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=60&q=60',
        ],
      },
      {
        name: 'Black Button-Front A-Line Mini Skirt',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        badge: 'sale',
        badgeText: '15% OFF',
        price: '1,799.00',
        originalPrice: '2,599.00',
        swatches: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=60&q=60',
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=60&q=60',
          'https://images.unsplash.com/photo-1509635279423-031e5d7f3c8e?w=60&q=60',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=60&q=60',
        ],
      },
      {
        name: 'Black Button-Front A-Line Mini Skirt',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=80',
        price: '1,799.00',
        originalPrice: '2,599.00',
        swatches: [
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=60',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=60&q=60',
          'https://images.unsplash.com/photo-1509635279423-031e5d7f3c8e?w=60&q=60',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=60&q=60',
        ],
      },
      {
        name: 'Black Button-Front A-Line Mini Skirt',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80',
        badge: 'sale',
        badgeText: '15% OFF',
        price: '1,799.00',
        originalPrice: '2,599.00',
        swatches: [
          'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=60&q=60',
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=60&q=60',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=60&q=60',
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=60&q=60',
        ],
      },
    ],
    top: [
      {
        name: 'Classic Linen Blazer',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
        badge: 'best',
        badgeText: 'BEST PRICE',
        price: '2,499.00',
        swatches: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=60&q=60',
          'https://images.unsplash.com/photo-1509635279423-031e5d7f3c8e?w=60&q=60',
        ],
      },
      {
        name: 'Ribbed Knit Crop Top',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80',
        price: '899.00',
        swatches: [
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=60&q=60',
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=60&q=60',
        ],
      },
      {
        name: 'Oversized Cotton Shirt',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
        badge: 'sale',
        badgeText: '15% OFF',
        price: '1,599.00',
        originalPrice: '1,799.00',
        swatches: [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=60&q=60',
        ],
      },
      {
        name: 'Silk Blouse With Bow Tie',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80',
        price: '2,199.00',
        swatches: [
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=60&q=60',
        ],
      },
    ],
    bottom: [
      {
        name: 'High-Waist Wide Leg Trousers',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
        badge: 'sale',
        badgeText: '15% OFF',
        price: '1,899.00',
        originalPrice: '2,099.00',
        swatches: [
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=60&q=60',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=60&q=60',
        ],
      },
      {
        name: 'Pleated Midi Skirt',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
        price: '1,499.00',
        swatches: [
          'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=60&q=60',
        ],
      },
      {
        name: 'Slim Fit Tailored Pants',
        image: 'https://images.unsplash.com/photo-1509635279423-031e5d7f3c8e?w=500&q=80',
        badge: 'best',
        badgeText: 'BEST PRICE',
        price: '2,299.00',
        swatches: [
          'https://images.unsplash.com/photo-1509635279423-031e5d7f3c8e?w=60&q=60',
        ],
      },
      {
        name: 'Denim A-Line Mini Skirt',
        image: 'https://images.unsplash.com/photo-1548036328-c9cf89f962b6?w=500&q=80',
        price: '1,699.00',
        originalPrice: '1,899.00',
        swatches: [
          'https://images.unsplash.com/photo-1548036328-c9cf89f962b6?w=60&q=60',
        ],
      },
    ],
    outwear: [
      {
        name: 'Wool Blend Long Coat',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17bb?w=500&q=80',
        badge: 'sale',
        badgeText: '15% Off',
        price: '4,999.00',
        originalPrice: '5,899.00',
        swatches: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17bb?w=60&q=60',
        ],
      },
      {
        name: 'Quilted Puffer Jacket',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
        price: '3,499.00',
        swatches: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=60&q=60',
        ],
      },
      {
        name: 'Trench Coat With Belt',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
        badge: 'best',
        badgeText: 'BEST PRICE',
        price: '5,499.00',
        swatches: [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=60&q=60',
        ],
      },
      {
        name: 'Faux Leather Moto Jacket',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
        price: '3,799.00',
        originalPrice: '4,299.00',
        swatches: [
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=60&q=60',
        ],
      },
    ],
    fashion: [
      {
        name: 'Structured Shoulder Bag',
        image: 'https://images.unsplash.com/photo-1548036328-c9cf89f962b6?w=500&q=80',
        price: '2,499.00',
        swatches: [
          'https://images.unsplash.com/photo-1548036328-c9cf89f962b6?w=60&q=60',
        ],
      },
      {
        name: 'Gold Hoop Earrings Set',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80',
        badge: 'sale',
        badgeText: '15% OFF',
        price: '899.00',
        originalPrice: '999.00',
        swatches: [
          'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=60&q=60',
        ],
      },
      {
        name: 'Silk Scarf Print Collection',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
        price: '1,299.00',
        swatches: [
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=60&q=60',
        ],
      },
      {
        name: 'Leather Ankle Boots',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80',
        badge: 'best',
        badgeText: 'BEST PRICE',
        price: '3,999.00',
        swatches: [
          'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=60&q=60',
        ],
      },
    ],
  };

  var cartIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
    '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>';

  var bestIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">' +
    '<path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>';

  function buildBadge(p) {
    if (p.badge === 'sale') {
      return '<span class="latest-card__badge latest-card__badge--sale">' + p.badgeText + '</span>';
    }
    if (p.badge === 'best') {
      return '<span class="latest-card__badge latest-card__badge--best">' + bestIcon + p.badgeText + '</span>';
    }
    return '';
  }

  function buildSwatches(swatches) {
    if (!swatches || !swatches.length) return '';
    var html = '<div class="latest-card__swatches">';
    swatches.forEach(function (src, i) {
      html +=
        '<button type="button" class="swatch-thumb' +
        (i === 0 ? ' active' : '') +
        '" aria-label="Color option ' +
        (i + 1) +
        '">' +
        '<img src="' +
        src +
        '" alt="">' +
        '</button>';
    });
    html += '</div>';
    return html;
  }

  function buildPrice(p) {
    if (p.originalPrice) {
      return (
        '<span class="price-current">Rs. ' +
        p.price +
        '</span>' +
        '<span class="price-original">Rs. ' +
        p.originalPrice +
        '</span>'
      );
    }
    return '<span class="price-current price-current--regular">Rs. ' + p.price + '</span>';
  }

  function productCardHtml(p) {
    return (
      '<div class="latest-card">' +
      '<div class="latest-card__image">' +
      '<img src="' +
      p.image +
      '" alt="' +
      p.name +
      '" loading="lazy">' +
      buildBadge(p) +
      '<button type="button" class="latest-card__cart-btn" aria-label="Add to cart">' +
      cartIcon +
      '</button>' +
      '</div>' +
      '<div class="latest-card__info">' +
      '<h3 class="latest-card__name">' +
      p.name +
      '</h3>' +
      '<p class="latest-card__price">' +
      buildPrice(p) +
      '</p>' +
      buildSwatches(p.swatches) +
      '</div>' +
      '</div>'
    );
  }

  function initSwatchClicks(container) {
    container.querySelectorAll('.latest-card__swatches').forEach(function (group) {
      group.querySelectorAll('.swatch-thumb').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          group.querySelectorAll('.swatch-thumb').forEach(function (t) {
            t.classList.remove('active');
          });
          thumb.classList.add('active');
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var section = document.querySelector('.shop-by-product-section');
    if (!section) return;

    var grid = section.querySelector('#shopByProductGrid');
    var sliderWrapper = section.querySelector('#shopByProductSliderWrapper');
    var navBtns = section.querySelectorAll('.shop-by-product__nav-btn');
    var productSwiper = null;

    function renderProducts(category) {
      var items = PRODUCTS[category] || PRODUCTS.dresses;
      var cardsHtml = items.map(productCardHtml).join('');

      if (grid) {
        grid.innerHTML = cardsHtml;
        initSwatchClicks(grid);
      }

      if (sliderWrapper) {
        sliderWrapper.innerHTML = items
          .map(function (p) {
            return '<div class="swiper-slide">' + productCardHtml(p) + '</div>';
          })
          .join('');
        initSwatchClicks(sliderWrapper);

        if (productSwiper) {
          productSwiper.destroy(true, true);
          productSwiper = null;
        }

        if (window.innerWidth <= 576 && typeof Swiper !== 'undefined') {
          productSwiper = new Swiper('.shop-by-product__slider .swiper', {
            slidesPerView: 1,
            spaceBetween: 16,
            navigation: {
              nextEl: '.shop-by-product__slider .swiper-button-next',
              prevEl: '.shop-by-product__slider .swiper-button-prev',
            },
          });
        }
      }
    }

    navBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.dataset.category;
        navBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        renderProducts(category);
      });
    });

    renderProducts('dresses');

    window.addEventListener('resize', function () {
      var active = section.querySelector('.shop-by-product__nav-btn.active');
      if (active) renderProducts(active.dataset.category);
    });
  });
})();
