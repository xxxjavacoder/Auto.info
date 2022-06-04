$(document).ready(function() {
    $('.intro__slider').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img type="button" src="icons/chevron_right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    dots: true,
                    adaptiveHeight: true
                }
            }
        ]
    });
});
