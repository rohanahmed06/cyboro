$(function () {
    if (window.innerWidth <= 991) {
        let humburger = $('.header__humburger-wrap');
        $(".header__humburger, .header__humburger-close, .menu__nav-link").on('click', function () {
            if (!humburger.hasClass("active")) {
                humburger.addClass("active");
                setTimeout(function () {
                    $("html, body").css({
                        overflow: 'hidden',
                        height: '100%'
                    });
                }, 300);
            } else {
                humburger.removeClass("active");
                $("html, body").css({
                    overflow: 'auto',
                    height: 'auto'
                });
            }
        });
    }


    $('[data-animate=cube]').removeClass('active');
    $("[data-animate=cube-hover]").hover(function () {
        $(this).find('[data-animate=cube]').toggleClass('active');
    }, function () {
        $(this).find('[data-animate=cube]').toggleClass('active');
    });



    for (var i = 0; i < 5; i++) {
        $('[data-animate=runline] > div').clone().appendTo('[data-animate=runline]');
    }

    function lineReset() { $('[data-animate=runline]').animate({ marginLeft: '0px' }, { duration: 0 }); };

    function lineRun() { $('[data-animate=runline]').animate({ marginLeft: '-3000px' }, { duration: 60000, easing: "linear" }); };
    lineRun();
    setInterval(function () {
        lineReset();
        lineRun();
    }, 60000);


    var swiper = new Swiper("[data-swiper=reviews]", {
        direction: "vertical",
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper('[data-swiper=reviews2]', {
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '[data-swiper=reviews-next]',
            prevEl: '[data-swiper=reviews-prev]',
        },
        thumbs: {
            swiper: swiper,
        },
    });


});