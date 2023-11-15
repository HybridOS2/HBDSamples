function init_carousel()
{
    let elem = document.createElement("script");
    elem.setAttribute("src", "hvml://localhost/_renderer/_builtin/-/assets/bootstrap-5.3.1-dist/js/bootstrap.min.js");
    elem.setAttribute("type", "text/javascript");
    elem.addEventListener("load", () => {
        const carousel = new bootstrap.Carousel('#id_carousel_slide');
        carousel.cycle();
    });
    document.head.appendChild(elem);
}
