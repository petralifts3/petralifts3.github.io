/**
* Template Name: BizLand
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * References Section Logic
   */
  (function initReferences() {
    const gridEl = document.getElementById('references-grid');
    if (!gridEl) return; // section not on this page

    const searchInput = document.getElementById('references-search');
    const categoriesEl = document.getElementById('references-categories');
    const paginationEl = document.getElementById('references-pagination');
    const emptyEl = document.getElementById('references-empty');

    const PAGE_SIZE = 9;

    let allProjects = [];
    let activeCategory = 'All';
    let searchTerm = '';
    let currentPage = 1;

    // Lazy observer
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const realSrc = img.getAttribute('data-src');
          if (realSrc) {
            img.src = realSrc;
            img.removeAttribute('data-src');
          }
          intersectionObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    function resolveImagePath(projectId, path) {
      if (!path) return '';
      if (/^(assets\/|https?:)/i.test(path)) return path;
      return `assets/img/projects/${projectId}/${path}`;
    }

    // Normalize v1 (flat array) and v2 (nested categories with details)
    function normalize(payload) {
      // v2 detection: object with categories array
      if (payload && !Array.isArray(payload) && Array.isArray(payload.categories)) {
        const items = [];
        payload.categories.forEach(cat => {
          (cat.projects || []).forEach(p => {
            const title = (p.details && p.details.title) || p.name || '';
            const description = (p.details && p.details.description) || '';
            const tags = (p.details && Array.isArray(p.details.tags)) ? p.details.tags : [];
            const location = (p.details && p.details.location) || '';
            const date = (p.details && p.details.date) || '';
            const steps = (p.details && Array.isArray(p.details.steps)) ? p.details.steps : [];
            const links = (p.details && p.details.links) || {};
            items.push({
              id: p.id,
              title,
              displayName: p.name || title,
              categoryId: cat.id || 'uncategorized',
              category: cat.name || 'Uncategorized',
              description,
              mainImage: p.thumbnail || '',
              otherImages: Array.isArray(p.gallery) ? p.gallery.slice() : [],
              alt: p.cover_alt || title,
              meta: { tags, location, date, steps, links }
            });
          });
        });
        return items.filter(p => p.title && p.mainImage);
      }

      // v1 fallback
      const projects = Array.isArray(payload) ? payload : [];
      return projects.map((p, idx) => {
        const id = p.id ?? (idx + 1);
        return {
          id,
          title: p.title,
          displayName: p.title,
          categoryId: p.category || 'Uncategorized',
          category: p.category || 'Uncategorized',
          description: p.description || '',
          mainImage: resolveImagePath(id, p.mainImage),
          otherImages: Array.isArray(p.otherImages) ? p.otherImages.map(img => resolveImagePath(id, img)) : [],
          alt: p.title,
          meta: { tags: [], location: '', date: '', steps: [], links: {} }
        };
      }).filter(p => p.title && p.mainImage);
    }

    function computeCategories(projects) {
      const set = new Set(projects.map(p => p.category || 'Uncategorized'));
      return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
    }

    function renderCategories() {

      const categories = computeCategories(allProjects);
      debugger;
      categoriesEl.innerHTML = '';
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `btn btn-sm me-2 mb-2 ${cat === activeCategory ? 'btn-primary' : 'btn-outline-primary'}`;
        btn.textContent = cat;
        btn.setAttribute('aria-pressed', String(cat === activeCategory));
        btn.addEventListener('click', () => {
          activeCategory = cat;
          currentPage = 1;
          renderCategories();
          render();
        });
        categoriesEl.appendChild(btn);
      });
    }

    function passesFilters(project) {
      if (activeCategory !== 'All' && project.category !== activeCategory) return false;
      if (!searchTerm) return true;
      const hay = `${project.title}\n${project.displayName || ''}\n${project.description}\n${project.category}\n${(project.meta && project.meta.location) || ''}\n${(project.meta && Array.isArray(project.meta.tags) ? project.meta.tags.join(' ') : '')}\n${(project.meta && Array.isArray(project.meta.steps) ? project.meta.steps.join(' ') : '')}`.toLowerCase();
      return hay.includes(searchTerm);
    }

    function getFiltered() {
      return allProjects.filter(passesFilters);
    }

    function paginate(items) {
      const total = items.length;
      const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (currentPage > pageCount) currentPage = pageCount;
      const start = (currentPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      return { pageItems: items.slice(start, end), pageCount, total };
    }

    function renderPagination(pageCount) {
      paginationEl.innerHTML = '';
      const createPageItem = (label, page, disabled, active) => {
        const li = document.createElement('li');
        li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#references';
        a.textContent = label;
        if (!disabled) {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = page;
            render();
          });
        }
        li.appendChild(a);
        paginationEl.appendChild(li);
      };

      createPageItem('Prev', Math.max(1, currentPage - 1), currentPage === 1, false);
      for (let p = 1; p <= pageCount; p++) createPageItem(String(p), p, false, p === currentPage);
      createPageItem('Next', Math.min(pageCount, currentPage + 1), currentPage === pageCount, false);
    }

    function createCard(project) {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6';

      const card = document.createElement('div');
      card.className = 'card h-100 references-card';
      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');

      const img = document.createElement('img');
      img.className = 'card-img-top';
      img.alt = project.alt || project.title;
      img.loading = 'lazy';
      img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='; // tiny placeholder
      img.setAttribute('data-src', project.mainImage);
      intersectionObserver.observe(img);

      const body = document.createElement('div');
      body.className = 'card-body';
      const h5 = document.createElement('h5');
      h5.className = 'card-title mb-1';
      h5.textContent = project.displayName || project.title;
      const small = document.createElement('div');
      small.className = 'text-muted small mb-2';
      small.textContent = project.category;
      const p = document.createElement('p');
      p.className = 'card-text';
      p.textContent = project.description || '';

      body.appendChild(h5);
      if (project.category) body.appendChild(small);
      if (project.description) body.appendChild(p);

      card.appendChild(img);
      card.appendChild(body);

      const openDetails = () => {
        const modalEl = document.getElementById('referencesModal');
        if (!modalEl) {
          // fallback: lightbox only
          const gallery = [project.mainImage, ...(project.otherImages || [])];
          const items = gallery.map(src => ({ href: src, type: 'image', title: project.title }));
          const instance = GLightbox({ elements: items });
          instance.open();
          return;
        }
        // Populate modal
        document.getElementById('refModalTitle').textContent = project.title;
        const coverImg = document.getElementById('refModalCover');
        coverImg.alt = project.alt || project.title;
        coverImg.src = project.mainImage;
        document.getElementById('refModalCategory').textContent = project.category || '';

        const metaEl = document.getElementById('refModalMeta');
        const chunks = [];
        if (project.meta?.date) chunks.push(`Date: ${project.meta.date}`);
        if (project.meta?.location) chunks.push(`Location: ${project.meta.location}`);
        metaEl.textContent = chunks.join(' | ');

        document.getElementById('refModalDesc').textContent = project.description || '';

        const tagsEl = document.getElementById('refModalTags');
        tagsEl.innerHTML = '';
        if (project.meta?.tags?.length) {
          const frag = document.createDocumentFragment();
          project.meta.tags.forEach(t => {
            const span = document.createElement('span');
            span.className = 'badge bg-secondary me-1';
            span.textContent = t;
            frag.appendChild(span);
          });
          tagsEl.appendChild(frag);
        }

        const stepsEl = document.getElementById('refModalSteps');
        stepsEl.innerHTML = '';
        if (project.meta?.steps?.length) {
          const ul = document.createElement('ul');
          ul.className = 'mb-2';
          project.meta.steps.forEach(s => {
            const li = document.createElement('li');
            li.textContent = s;
            ul.appendChild(li);
          });
          stepsEl.appendChild(ul);
        }

        const linksEl = document.getElementById('refModalLinks');
        linksEl.innerHTML = '';
        if (project.meta?.links) {
          const entries = Object.entries(project.meta.links).filter(([k, v]) => v);
          if (entries.length) {
            const div = document.createElement('div');
            entries.forEach(([k, v]) => {
              const a = document.createElement('a');
              a.href = v;
              a.target = '_blank';
              a.rel = 'noopener';
              a.className = 'me-2';
              a.textContent = k;
              div.appendChild(a);
            });
            linksEl.appendChild(div);
          }
        }

        const galleryEl = document.getElementById('refModalGallery');
        galleryEl.innerHTML = '';
        const allImgs = [project.mainImage, ...(project.otherImages || [])];

        // Build thumbnails and attach required lightbox data attributes
        allImgs.forEach((src, idx) => {
          const a = document.createElement('a');
          a.href = src;
          a.className = 'glightbox';
          a.setAttribute('data-gallery', 'references-modal');
          a.setAttribute('data-type', 'image');
          a.setAttribute('data-title', project.title);
          a.setAttribute('data-width', '600');
          a.setAttribute('data-height', '400');
          const timg = document.createElement('img');
          timg.src = src;
          timg.alt = project.title + ' ' + (idx + 1);
          timg.width = 96;
          timg.height = 64;
          timg.loading = 'lazy';
          a.appendChild(timg);
          galleryEl.appendChild(a);
          // Preload to avoid blank first render
          const preload = new Image();
          preload.src = src;
        });

        const modal = new bootstrap.Modal(modalEl);
        modal.show();

        // Initialize GLightbox for the modal gallery after it's shown
        const initLightbox = () => {
          if (window.__refModalLightbox && typeof window.__refModalLightbox.destroy === 'function') {
            window.__refModalLightbox.destroy();
          }
          window.__refModalLightbox = GLightbox({
            selector: '#refModalGallery .glightbox',
            touchNavigation: true,
            closeOnOutsideClick: true,
            openEffect: 'zoom',
            preload: true,
            plyr: { css: false, js: false }
          });
        };
        const onShown = () => {
          initLightbox();
          modalEl.removeEventListener('shown.bs.modal', onShown);
        };
        modalEl.addEventListener('shown.bs.modal', onShown);
      };
      card.addEventListener('click', openDetails);
      card.addEventListener('keypress', (e) => { if (e.key === 'Enter') openDetails(); });

      col.appendChild(card);
      return col;
    }

    function render() {
      const filtered = getFiltered();
      const { pageItems, pageCount } = paginate(filtered);

      emptyEl.classList.toggle('d-none', filtered.length > 0);
      gridEl.innerHTML = '';
      pageItems.forEach(pr => gridEl.appendChild(createCard(pr)));
      renderPagination(pageCount);
    }

    // Search events with debounce
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      const value = String(e.target.value || '').toLowerCase();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchTerm = value;
        currentPage = 1;
        render();
      }, 150);
    });

    // Load data
    fetch('assets/data/references_1.elevators-split-full.json')
      .then(r => r.json())
      .then(data => {
        allProjects = normalize(data);
        renderCategories();
        render();
      })
      .catch(() => {
        emptyEl.classList.remove('d-none');
        emptyEl.textContent = 'Failed to load references.';
      });
  })();

})();