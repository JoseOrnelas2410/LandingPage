document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initContactForm();
});

/**
 * Control del Menú Navegación (Móvil)
 */
function initNavigation() {
    const menu = document.getElementById('menu');
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.getElementById('close-menu');
    const menuLinks = document.querySelectorAll('.menu-item');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = ''; // Regresa al estado del CSS
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            document.body.style.overflow = ''; // Consistencia al cerrar
        });
    });
}

/**
 * Gestión del Formulario de Contacto (Netlify AJAX)
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-us-form');
    
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        
        // IMPORTANTE: Netlify necesita el campo "form-name" para procesar el envío AJAX
        // "contacto-portfolio" debe coincidir con el atributo name de tu <form>
        const params = new URLSearchParams(formData);
        params.append("form-name", "contacto-portfolio");

        if(submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Enviando...";
        }

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
        })
        .then((response) => {
            if (response.ok) {
                alert("¡Mensaje enviado con éxito! Me pondré en contacto pronto.");
                contactForm.reset();
            } else {
                throw new Error("Error en la respuesta del servidor");
            }
        })
        .catch((error) => {
            alert("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.");
            console.error("Error en el envío:", error);
        })
        .finally(() => {
            if(submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "Contactanos";
            }
        });
    });
}