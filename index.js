document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar funciones
    initNavigation();
    // Aquí podrías inicializar otras partes: initHero(), initForm(), etc.
});

/**
 * Control del Menú Navegación (Móvil)
 */
function initNavigation() {
    const menu = document.getElementById('menu');
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.menu-item');

    // Abrir
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquea el scroll al estar abierto
        });
    }

    // Cerrar
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Libera el scroll
        });
    }

    // Cerrar al clickear cualquier link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

/**
 * Gestión del Formulario de Contacto (Netlify AJAX)
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-us-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const formData = new FormData(contactForm);

        // Envío mediante Fetch optimizado para Netlify
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => {
            alert("¡Mensaje enviado con éxito! Me pondré en contacto pronto.");
            contactForm.reset(); // Limpia los campos del formulario
        })
        .catch((error) => {
            alert("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.");
            console.error("Error en el envío:", error);
        });
    });
}