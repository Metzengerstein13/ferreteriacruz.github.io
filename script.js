// Datos de productos (simulados)
const productos = [
    {
        id: 1,
        categoria: "Cementicios",
        nombre: "Cemento Fuerte",
        descripcion: "Cemento fuerte Holcim, resistencia, duración y rendimiento",
        precio: "Oferta",
        imagen: "img/fuerte.png"  // <-- Ruta de tu imagen
    },
    {
        id: 2,
        categoria: "Cementicios",
        nombre: "Cemento Maya",
        descripcion: "Cemento Maya, ideal para esas construcciones y reparaciones en tu hogar",
        precio: "Oferta",
        imagen: "img/maya.png"
    },
    {
        id: 3,
        categoria: "Pinturas",
        nombre: "Pintura Clásica Corona Esmalte",
        descripcion: "Pintura ideal para exterior e interior, pinta una sonrisa en los que amas",
        precio: "Oferta",
        imagen: "img/esmalte.png"
    },
    {
        id: 4,
        categoria: "Pinturas",
        nombre: "Pintura Clásica Corona Latex",
        descripcion: "Pintura ideal para interiores, pinta una sonrisa en los que amas",
        precio: "Oferta",
        imagen: "img/latex.png"
    },
    {
        id: 5,
        categoria: "Cementicios",
        nombre: "Pegatec",
        descripcion: "Adhesivo cerámico, para que te pares firme en este mundo",
        precio: "Promoción",
        imagen: "img/pegatec.png"
    },
    {
        id: 6,
        categoria: "Cementicios",
        nombre: "Sikaceram",
        descripcion: "Ideal para unir piso cerámico de toda clase",
        precio: "Oferta",
        imagen: "img/sikaceram.png"
    },
    {
        id: 7,
        categoria: "Láminas",
        nombre: "Lámina Metalum C-26",
        descripcion: "Lámina de calidad, fabricada en Costa Rica, con recaubrimiento AZ-150",
        precio: "Promoción",
        imagen: "img/laminametal.png"
    },
    {
        id: 8,
        categoria: "Mallas",
        nombre: "Malla Ciclón",
        descripcion: "Malla ciclón en todas las medidas, de acero inoxidable",
        precio: "Promoción",
        imagen: "img/malla.jpeg"
    },
    {
        id: 9,
        categoria: "Hierro",
        nombre: "Hierro de todo tipo y medida",
        descripcion: "Hierro de calidad, en todas las medidas y espesores",
        precio: "Promoción",
        imagen: "img/hierrocorr.jpg"
    },
    {
        id: 10,
        categoria: "Arena",
        nombre: "Arena de Río",
        descripcion: "Arena de río de calidad limpia y pura",
        precio: "Promoción",
        imagen: "img/arenafebrero.png"
    }
];

// Elementos del DOM
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const productGrid = document.querySelector('.product-grid');
const loadMoreBtn = document.getElementById('loadMore');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');
const navLinks = document.querySelectorAll('.nav-link');

// Variables de estado
let visibleProducts = 6;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos iniciales

    renderProducts();

    // Configurar menú móvil
    menuToggle.addEventListener('click', toggleMobileMenu);

    // Configurar botón "Ver más productos"
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    // Configurar formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Configurar animación de números en estadísticas
    if (statNumbers.length > 0) {
        animateStats();
    }

    // Configurar navegación suave
    setupSmoothScrolling();

    // Configurar animaciones al hacer scroll
    setupScrollAnimations();

    // Configurar año actual en el footer
    setCurrentYear();
});

// Función para alternar menú móvil
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Función para renderizar productos
function renderProducts() {
    productGrid.innerHTML = '';

    for (let i = 0; i < Math.min(visibleProducts, productos.length); i++) {
        const producto = productos[i];
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.style.animationDelay = `${i * 0.1}s`;

        productCard.innerHTML = `
        <div class="product-image">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        </div>
        <div class="product-content">
        <span class="product-category">${producto.categoria}</span>
        <h3 class="product-title">${producto.nombre}</h3>
        <p class="product-description">${producto.descripcion}</p>
        <div class="product-footer">
        <span class="product-price">${producto.precio}</span>
        <a href="#contacto" class="product-btn">Consultar</a>
        </div>
        </div>
        `;


        productGrid.appendChild(productCard);
    }

    // Actualizar estado del botón "Ver más"
    if (loadMoreBtn) {
        if (visibleProducts >= productos.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
}

// Función para cargar más productos
function loadMoreProducts() {
    visibleProducts += 3;
    renderProducts();
}

// Función para manejar el formulario de contacto
function handleContactForm(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const nombre = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;

    // Validación simple
    if (!nombre || !email) {
        alert('Por favor completa los campos requeridos');
        return;
    }

    // Simulación de envío
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Simular tiempo de envío
    setTimeout(() => {
        alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje. Te contactaremos pronto a ${email}`);
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Función para animar números en estadísticas
function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    const duration = 2000; // 2 segundos
                    const step = target / (duration / 16); // 60fps
                    let current = 0;

                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current);
                    }, 16);
                });

                // Dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observar la sección de estadísticas
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Función para configurar navegación suave
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Cerrar menú móvil si está abierto
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }

            // Actualizar enlace activo
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Desplazamiento suave
            const targetId = this.getAttribute('href');
            if (targetId === '#inicio') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80; // Ajuste para la barra de navegación fija
                    const targetPosition = targetElement.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Función para configurar animaciones al hacer scroll
function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.product-card, .brand, .service-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Función para establecer el año actual en el footer
function setCurrentYear() {
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
}

// Efecto de cambio de color en la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'white';
    }

    // Actualizar enlace activo según la sección visible
    updateActiveNavLink();
});

// Función para actualizar el enlace activo según la sección visible
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Efecto de hover en tarjetas de producto (agregado dinámicamente)
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('product-card') ||
        e.target.closest('.product-card')) {
        const card = e.target.classList.contains('product-card') ?
                    e.target : e.target.closest('.product-card');
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    }
}, true);

// Cargar más productos al hacer scroll hasta el final (opcional)
window.addEventListener('scroll', function() {
    if (loadMoreBtn && loadMoreBtn.style.display !== 'none') {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= pageHeight - 100) {
            loadMoreProducts();
        }
    }
});

// Inicializar tooltips (simulación)
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('product-btn') ||
        e.target.classList.contains('service-tag')) {
        e.target.title = e.target.classList.contains('product-btn') ?
                        'Consultar disponibilidad y precio' :
                        'Servicio incluido con tu compra';
    }
});
