
function afterRendering() {

    console.log("JS file is loaded");

    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    /*
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    */
   //it's basically on click
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.onclick = (listener))
            } else {
                selectEl.onclick = (listener);
            }
        }
    }
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Animation on scroll
     */

    /**
     * Header fixed top on scroll
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        let headerOffset = selectHeader.offsetTop
        let nextElement = selectHeader.nextElementSibling
        const headerFixed = () => {
            if ((headerOffset - window.scrollY) < 0) {//<=0
                selectHeader.classList.add('fixed-top')
                nextElement.classList.add('scrolled-offset')
            } else {
                selectHeader.classList.remove('fixed-top')
                nextElement.classList.remove('scrolled-offset')
            }
        }
        //window.addEventListener('load', headerFixed)
        window.onload = headerFixed;
        //onscroll(document, headerFixed)
        document.onscroll = headerFixed;
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
        backtotop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)
    /**
     * Scrol with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)
    /**
     * Scroll with ofset on page load with hash links in the url
     */

    if (window.location.hash) {
        if (select(window.location.hash)) {
            scrollto(window.location.hash)
        }
    }





    // Get all navigation items
    const navItems = document.getElementsByClassName('nav-li');
    // Remove the "active" class from all navigation items
    for (let z = 0; z < navItems.length; z++) {
        navItems[z].children[0].classList.remove('active');
    }

    // Add the "active" class to the clicked navigation item
    var page = window.location.href.split("/")[3].split("?")[0];
    console.log("**********" + page + "*********")
    if (page == '' || page == '#') {
        document.getElementById("index").children[0].classList.add("active");
        /*$('#heroCarousel').carousel();
        $('#heroCarousel').carousel('next');*/
        document.getElementsByClassName('carousel-control-next')[0].click();
        /**
         * Initiate portfolio lightbox 
         */
        const portfolioLightbox = GLightbox({
            selector: '.portfolio-lightbox'
        });
        /**
         * Porfolio isotope and filter
         */
        if (document.readyState == 'complete') {
            let portfolioContainer = select('.portfolio-container');
            if (portfolioContainer) {
                let portfolioIsotope = new Isotope(portfolioContainer, {
                    itemSelector: '.portfolio-item',
                    layoutMode: 'fitRows'
                });

                let portfolioFilters = select('#portfolio-flters li', true);

                on('click', '#portfolio-flters li', function (e) {
                    console.log("clicked");
                    e.preventDefault();
                    portfolioFilters.forEach(function (el) {
                        el.classList.remove('filter-active');
                    });
                    this.classList.add('filter-active');

                    portfolioIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                    portfolioIsotope.on('arrangeComplete', function () {
                        AOS.refresh()
                    });
                }, true);

            }

        }
    }
    else {
        document.getElementById(page).children[0].classList.add("active");
    }

    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    })
    //Show the cart count after rendering
    showCount();
}
