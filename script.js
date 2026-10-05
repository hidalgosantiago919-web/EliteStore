/*========================================
        VARIABLES PRINCIPALES
=========================================*/

const header = document.querySelector(".header");
const scrollTopBtn = document.querySelector(".scroll-top");
const heroTitle = document.getElementById("changing-text");


/*========================================
        HEADER SCROLL
=========================================*/

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/*========================================
        BOTÓN VOLVER ARRIBA
=========================================*/

window.addEventListener("scroll", () => {

    if (!scrollTopBtn) return;

    if (window.scrollY > 400) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});


if (scrollTopBtn) {

    scrollTopBtn.addEventListener("click", (event) => {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*========================================
        HERO - TEXTO DINÁMICO
=========================================*/

const words = [

    "Juegos Digitales",
    "Grandes Ofertas",
    "Mejores Precios",
    "Entrega Inmediata",
    "Experiencia Gamer",
    "Juegos Originales"

];

let textIndex = 0;


function changeHeroText() {

    if (!heroTitle) return;

    heroTitle.style.opacity = "0";

    heroTitle.style.transform =
        "translateY(15px)";


    setTimeout(() => {

        textIndex++;

        if (textIndex >= words.length) {

            textIndex = 0;

        }

        heroTitle.textContent =
            words[textIndex];

        heroTitle.style.opacity = "1";

        heroTitle.style.transform =
            "translateY(0)";

    }, 400);

}


setInterval(changeHeroText, 5000);


/*========================================
        HERO - IMÁGENES
=========================================*/

const heroSlides =
    document.querySelectorAll(".hero-slide");

let heroSlideIndex = 0;


function changeHeroSlide() {

    if (!heroSlides.length) return;

    heroSlides.forEach(slide => {

        slide.classList.remove("active");

    });


    heroSlideIndex++;

    if (
        heroSlideIndex >=
        heroSlides.length
    ) {

        heroSlideIndex = 0;

    }


    heroSlides[
        heroSlideIndex
    ].classList.add("active");

}


setInterval(changeHeroSlide, 5000);


/*========================================
        CONTADOR
=========================================*/

const counterSection =
    document.querySelector(".counter");


if (counterSection) {

    const counterObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const counters =
                        document.querySelectorAll(".number");


                    counters.forEach(counter => {

                        const target =
                            Number(
                                counter.getAttribute(
                                    "data-target"
                                )
                            );


                        let count = 0;

                        const speed =
                            target / 100;


                        function updateCounter() {

                            if (count < target) {

                                count += speed;

                                counter.innerText =
                                    Math.ceil(count);

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.innerText =
                                    target.toLocaleString() + "+";

                            }

                        }


                        updateCounter();

                    });


                    counterObserver.disconnect();

                });

            },

            {
                threshold: 0.3
            }

        );


    counterObserver.observe(
        counterSection
    );

}


/*========================================
                FAQ
=========================================*/

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        () => {

            const currentItem =
                question.parentElement;


            faqQuestions.forEach(otherQuestion => {

                if (
                    otherQuestion !== question
                ) {

                    otherQuestion
                        .parentElement
                        .classList
                        .remove("active");

                }

            });


            currentItem.classList.toggle(
                "active"
            );

        }
    );

});


/*========================================
        ANIMACIONES AL HACER SCROLL
=========================================*/

const animatedItems =
    document.querySelectorAll(

        ".game-card, " +
        ".category-card, " +
        ".why-card, " +
        ".offer-card, " +
        ".counter-card, " +
        ".review-card, " +
        ".faq-item, " +
        ".contact-info, " +
        ".contact-form"

    );


animatedItems.forEach(item => {

    item.classList.add("hidden");

});


const animationObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;


                const delay =
                    entry.target.dataset.delay || 0;


                setTimeout(() => {

                    entry.target.classList.add(
                        "show-section"
                    );

                }, Number(delay));


                animationObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.15
        }

    );


animatedItems.forEach((item, index) => {

    item.dataset.delay =
        index * 100;


    animationObserver.observe(
        item
    );

});


/*========================================
        MODAL DE COMPRA
=========================================*/

/*
    IMPORTANTE:

    El modal YA EXISTE en index.html.

    Por eso NO vamos a crear otro modal
    desde JavaScript.
*/

const purchaseModal =
    document.getElementById(
        "purchaseModal"
    );


const purchaseOverlay =
    document.getElementById(
        "purchaseOverlay"
    );


const closePurchase =
    document.getElementById(
        "closePurchase"
    );


const purchaseForm =
    document.getElementById(
        "purchaseForm"
    );


const purchaseGame =
    document.getElementById(
        "purchaseGame"
    );


const purchasePlatform =
    document.getElementById(
        "purchasePlatform"
    );


const purchasePrice =
    document.getElementById(
        "purchasePrice"
    );


/*========================================
        DATOS DE LOS JUEGOS
=========================================*/

const gameData = {

    "Grand Theft Auto VI": {

        platform: "PlayStation 5",

        price: "$199.900"

    },


    "EA Sports FC 26": {

        platform: "PlayStation 5",

        price: "$169.900"

    },


    "Marvel's Spider-Man 2": {

        platform: "PlayStation 5",

        price: "$189.900"

    },


    "Forza Horizon 5": {

        platform: "Xbox",

        price: "$149.900"

    },


    "Minecraft": {

        platform: "PC",

        price: "$119.900"

    },


    "Call of Duty: Black Ops 7": {

        platform: "Xbox",

        price: "$209.900"

    }

};


/*========================================
        ABRIR MODAL
=========================================*/

function openPurchaseModal(gameName) {

    if (!purchaseModal) return;


    /*
        Seleccionar automáticamente
        el juego.
    */

    if (purchaseGame) {

        purchaseGame.value =
            gameName || "";

    }


    /*
        Buscar información del juego.
    */

    const data =
        gameData[gameName];


    if (data) {

        /*
            Seleccionar plataforma.
        */

        if (purchasePlatform) {

            purchasePlatform.value =
                data.platform;

        }


        /*
            Mostrar precio.
        */

        if (purchasePrice) {

            purchasePrice.textContent =
                data.price;

        }

    } else {

        if (purchasePlatform) {

            purchasePlatform.value = "";

        }


        if (purchasePrice) {

            purchasePrice.textContent =
                "Selecciona un juego";

        }

    }


    /*
        Mostrar modal.
    */

    purchaseModal.classList.add(
        "show"
    );


    purchaseModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
        Evitar que el fondo
        de la página se mueva.
    */

    document.body.classList.add(
        "modal-open"
    );

}


/*========================================
        CERRAR MODAL
=========================================*/

function closePurchaseModal() {

    if (!purchaseModal) return;


    purchaseModal.classList.remove(
        "show"
    );


    purchaseModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/*========================================
        CERRAR CON LA X
=========================================*/

if (closePurchase) {

    closePurchase.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            closePurchaseModal();

        }
    );

}


/*========================================
        CERRAR HACIENDO CLICK AFUERA
=========================================*/

/*
    Esta es la función principal
    que querías.

    Si haces clic sobre el fondo
    oscuro, fuera de la caja,
    el modal se cierra.
*/

if (purchaseOverlay) {

    purchaseOverlay.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            closePurchaseModal();

        }
    );

}


/*========================================
        SEGURIDAD EXTRA:

        CLICK DIRECTAMENTE EN EL MODAL
=========================================*/

if (purchaseModal) {

    purchaseModal.addEventListener(
        "click",
        (event) => {

            /*
                Si el clic fue directamente
                sobre el contenedor exterior,
                también cerramos.

                Si fue dentro de purchase-box,
                NO hacemos nada.
            */

            if (
                event.target ===
                purchaseModal
            ) {

                closePurchaseModal();

            }

        }
    );

}


/*========================================
        CERRAR CON ESC
=========================================*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            purchaseModal &&
            purchaseModal.classList.contains("show")
        ) {

            closePurchaseModal();

        }

    }
);


/*========================================
        ACTUALIZAR PRECIO
=========================================*/

if (purchaseGame) {

    purchaseGame.addEventListener(
        "change",
        () => {

            const selectedGame =
                purchaseGame.value;


            const data =
                gameData[selectedGame];


            if (!data) {

                if (purchasePrice) {

                    purchasePrice.textContent =
                        "Selecciona un juego";

                }

                return;

            }


            if (purchasePrice) {

                purchasePrice.textContent =
                    data.price;

            }


            if (purchasePlatform) {

                purchasePlatform.value =
                    data.platform;

            }

        }
    );

}


/*========================================
        BOTONES COMPRAR AHORA
=========================================*/

const buyButtons =
    document.querySelectorAll(
        ".buy-game-btn, " +
        ".buy-now-btn, " +
        ".offer-btn, " +
        ".game-btn"
    );


buyButtons.forEach(button => {

    button.addEventListener(
        "click",
        (event) => {

            /*
                Evitar que los enlaces
                cambien de posición.
            */

            event.preventDefault();


            /*
                Buscar primero el juego
                mediante data-game.
            */

            let gameName =
                button.dataset.game || "";


            /*
                Si no existe data-game,
                buscar el título de la tarjeta.
            */

            if (!gameName) {

                const card =
                    button.closest(
                        ".game-card, .offer-card"
                    );


                if (card) {

                    const title =
                        card.querySelector("h3");


                    if (title) {

                        gameName =
                            title.textContent.trim();

                    }

                }

            }


            /*
                Si es un botón general
                de "Comprar Ahora"
                del header o hero,
                no tiene juego específico.
            */

            if (!gameName) {

                gameName =
                    "";

            }


            openPurchaseModal(
                gameName
            );

        }
    );

});


/*========================================
        BOTONES DE CATEGORÍAS
=========================================*/

const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        (event) => {

            /*
                Estos botones SÍ deben
                llevar a juegos.html.

                Por eso no abrimos el modal.
            */

            /*
                No hacemos preventDefault.
                El enlace funciona normalmente.
            */

        }
    );

});


/*========================================
        BOTÓN VER CATÁLOGO
=========================================*/

/*
    Este botón debe llevar a juegos.html.

    No interferimos con su enlace.
*/


/*========================================
        FORMULARIO DE COMPRA
=========================================*/

if (purchaseForm) {

    purchaseForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const selectedGame =
                purchaseGame
                    ? purchaseGame.value
                    : "";


            const nameInput =
                document.getElementById(
                    "purchaseName"
                );


            const emailInput =
                document.getElementById(
                    "purchaseEmail"
                );


            const phoneInput =
                document.getElementById(
                    "purchasePhone"
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            /*
                Validación básica.
            */

            if (
                !selectedGame ||
                !name ||
                !email ||
                !phone
            ) {

                showToast(
                    "Datos incompletos",
                    "Completa todos los campos obligatorios."
                );

                return;

            }


            /*
                Mostrar información
                en consola para la demo.
            */

            console.log(
                "================================"
            );

            console.log(
                "SOLICITUD DE COMPRA"
            );

            console.log(
                "Juego:",
                selectedGame
            );

            console.log(
                "Plataforma:",
                purchasePlatform
                    ? purchasePlatform.value
                    : ""
            );

            console.log(
                "Nombre:",
                name
            );

            console.log(
                "Correo:",
                email
            );

            console.log(
                "Teléfono:",
                phone
            );

            console.log(
                "================================"
            );


            /*
                Mostrar mensaje.
            */

            showToast(
                "¡Compra de prueba registrada!",
                `La solicitud de ${selectedGame} fue registrada correctamente.`
            );


            /*
                Limpiar formulario
                después de la demostración.
            */

            setTimeout(() => {

                purchaseForm.reset();


                if (purchasePrice) {

                    purchasePrice.textContent =
                        "Selecciona un juego";

                }


                closePurchaseModal();

            }, 1200);

        }
    );

}


/*========================================
        FORMULARIO DE CONTACTO
=========================================*/

const contactForm =
    document.querySelector(
        "#contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                );


            const email =
                document.getElementById(
                    "contactEmail"
                );


            const subject =
                document.getElementById(
                    "contactSubject"
                );


            const message =
                document.getElementById(
                    "contactMessage"
                );


            console.log(
                "================================"
            );

            console.log(
                "MENSAJE DE CONTACTO"
            );

            console.log(
                "Nombre:",
                name ? name.value : ""
            );

            console.log(
                "Correo:",
                email ? email.value : ""
            );

            console.log(
                "Asunto:",
                subject ? subject.value : ""
            );

            console.log(
                "Mensaje:",
                message ? message.value : ""
            );

            console.log(
                "================================"
            );


            showToast(
                "Mensaje preparado",
                "Tu mensaje fue registrado correctamente."
            );


            contactForm.reset();

        }
    );

}


/*========================================
        TOAST / NOTIFICACIÓN
=========================================*/

function showToast(
    title,
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    const toastTitle =
        toast.querySelector(
            ".toast-content h4"
        );


    const toastMessage =
        toast.querySelector(
            ".toast-content p"
        );


    if (toastTitle) {

        toastTitle.textContent =
            title;

    }


    if (toastMessage) {

        toastMessage.textContent =
            message;

    }


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3500);

}


/*========================================
        MENÚ RESPONSIVE
=========================================*/

const menuBtn =
    document.querySelector(
        ".menu-btn"
    );


const navbar =
    document.querySelector(
        ".navbar"
    );


if (
    menuBtn &&
    navbar
) {

    menuBtn.addEventListener(
        "click",
        () => {

            navbar.classList.toggle(
                "active"
            );

            menuBtn.classList.toggle(
                "active"
            );

        }
    );


    /*
        Cerrar menú al pulsar
        cualquier enlace.
    */

    navbar
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navbar.classList.remove(
                        "active"
                    );

                    menuBtn.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/*========================================
        LOADER
=========================================*/

window.addEventListener(
    "load",
    () => {

        const loader =
            document.querySelector(
                ".loader"
            );


        if (!loader) return;


        setTimeout(() => {

            loader.classList.add(
                "hidden"
            );

        }, 500);

    }
);


/*========================================
        FINAL
=========================================*/

console.log(
    "🎮 Elite Store cargado correctamente."
);
