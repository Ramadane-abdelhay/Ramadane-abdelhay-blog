(function($, fnFrontend) {
    "use strict";

    var FrenifyMow = {

        init: function() {

            var widgets = {
                'frel-posts.default': FrenifyMow.posts,
                'frel-search.default': FrenifyMow.searchMarquee,
                'frel-categories.default': FrenifyMow.categories,
                'frel-title.default': FrenifyMow.categoryMarquee,
            };

            $.each(widgets, function(widget, callback) {
                fnFrontend.hooks.addAction('frontend/element_ready/' + widget, callback);
            });
        },

        imgToSVG: function() {
            $('img.fn__svg').each(function() {
                var img = $(this);
                var imgClass = img.attr('class');
                var imgURL = img.attr('src');

                $.get(imgURL, function(data) {
                    var svg = $(data).find('svg');
                    if (typeof imgClass !== 'undefined') {
                        svg = svg.attr('class', imgClass + ' replaced-svg');
                    }
                    img.replaceWith(svg);

                }, 'xml');
            });
        },

        posts: function() {
            FrenifyMow.posts_epsilon();
            FrenifyMow.posts_fslider();
            FrenifyMow.posts_cslider();
            FrenifyMow.posts_carousel();
            FrenifyMow.posts_yota();
            FrenifyMow.imgToSVG();
        },

        posts_yota: function() {
            $('.fn__widget_posts_yota .col_secondary .item').on('mouseenter', function() {
                var element = $(this);
                var parent = element.closest('.fn__widget_posts_yota');
                parent.find('.col_primary .item.active').removeClass('active');
                element.siblings('.active').removeClass('active');
                parent.find('.col_primary .item:nth-child(' + (element.index() + 1) + ')').addClass('active');
                element.addClass('active');
            });
            $('.fn__widget_posts_yota .col_secondary .nav-buttons .next-button').off().on('click', function() {
                var element = $(this);
                var parent = element.closest('.fn__widget_posts_yota');
                var secondaryItems = parent.find('.col_secondary .item');
                var primaryItems = parent.find('.col_primary .item');
                var index = parent.find('.col_secondary .item.active').index();
                var nextIndex = (index + 1) % secondaryItems.length;
                secondaryItems.removeClass('active');
                primaryItems.removeClass('active');
                secondaryItems.eq(nextIndex).addClass('active');
                primaryItems.eq(nextIndex).addClass('active');


                if (parent.attr('data-layout') === 'yota_1') {
                    var scrollContainer = parent.find('.col_secondary .col_in');
                    var scrollTo = secondaryItems.eq(nextIndex).position().top + scrollContainer.scrollTop() - 50;
                    var scroll = parent.find('.col_secondary .col_in');

                    scroll.stop().animate({
                        scrollTop: scrollTo
                    }, 'slow');
                } else {
                    var translateX = -secondaryItems.eq(nextIndex).position().left;
                    parent.find('.col_inn').css({
                        transform: 'translateX(' + translateX + 'px)'
                    });
                }

                return false;
            });
            $('.fn__widget_posts_yota .col_secondary .nav-buttons .prev-button').off().on('click', function() {
                var element = $(this);
                var parent = element.closest('.fn__widget_posts_yota');
                var secondaryItems = parent.find('.col_secondary .item');
                var primaryItems = parent.find('.col_primary .item');
                var index = parent.find('.col_secondary .item.active').index();
                var nextIndex = (index + secondaryItems.length - 1) % secondaryItems.length;
                secondaryItems.removeClass('active');
                primaryItems.removeClass('active');
                secondaryItems.eq(nextIndex).addClass('active');
                primaryItems.eq(nextIndex).addClass('active');


                if (parent.attr('data-layout') === 'yota_1') {
                    var scrollContainer = parent.find('.col_secondary .col_in');
                    var scrollTo = secondaryItems.eq(nextIndex).position().top + scrollContainer.scrollTop() - 50;
                    var scroll = parent.find('.col_secondary .col_in');

                    scroll.stop().animate({
                        scrollTop: scrollTo
                    }, 'slow');
                } else {
                    var translateX = -secondaryItems.eq(nextIndex).position().left;
                    parent.find('.col_inn').css({
                        transform: 'translateX(' + translateX + 'px)'
                    });
                }

                return false;
            });
        },

        categories: function() {
            FrenifyMow.categoryMarquee();
            FrenifyMow.categoryCarousel();
        },

        categoryCarousel: function() {
            $('.fn_cs_cats_carousel .swiper').each(function() {
                const swiper = new Swiper($(this)[0], {
                    loop: false,
                    speed: 500,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: $(this).closest('.fn_cs_cats_carousel').find('.swiper-button-next')[0],
                        prevEl: $(this).closest('.fn_cs_cats_carousel').find('.swiper-button-prev')[0],
                    },
                    slidesPerView: 'auto',
                    autoplay: false,
                });
            });
        },

        categoryMarquee: function() {
            $(".fn__cs_title_smarquee .marquee").each(function() {
                var e = $(this);
                if (!e.hasClass('ready')) {
                    e.addClass('ready').marquee({
                        duplicated: true,
                        speed: 50,
                        delayBeforeStart: 0,
                        direction: 'left',
                        pauseOnHover: false,
                        startVisible: true
                    });
                }
                FrenifyMow.imgToSVG();
            });

            $(".fn_cs_cats_big_marquee .marquee").each(function() {
                var e = $(this);
                if (!e.hasClass('ready')) {
                    e.addClass('ready').marquee({
                        duplicated: true,
                        speed: 50,
                        delayBeforeStart: 0,
                        direction: 'left',
                        pauseOnHover: false,
                        startVisible: true
                    });
                }
            });

            $(".fn_cs_cats_small_marquee .marquee").each(function() {
                var e = $(this);
                if (!e.hasClass('ready')) {
                    e.addClass('ready').marquee({
                        duplicated: true,
                        speed: 30,
                        delayBeforeStart: 0,
                        direction: 'left',
                        pauseOnHover: true,
                        startVisible: true
                    });
                }
            });
        },

        searchMarquee: function() {
            $(".fn_cs_searchbox .marquee").each(function() {
                var e = $(this);
                if (!e.hasClass('ready')) {
                    e.addClass('ready').marquee({
                        duplicated: true,
                        speed: 50,
                        delayBeforeStart: 0,
                        direction: 'left',
                        pauseOnHover: false,
                        startVisible: true
                    });
                }
            });
        },

        posts_carousel: function() {
            $('.fn__widget_posts_gcarousel .swiper').each(function() {
                const swiper = new Swiper($(this)[0], {
                    loop: true,
                    speed: 500,
                    spaceBetween: 30,
                    navigation: {
                        nextEl: $(this).closest('.fn__circle_slider').find('.swiper-button-next')[0],
                        prevEl: $(this).closest('.fn__circle_slider').find('.swiper-button-prev')[0],
                    },
                    slidesPerView: 4,
                    autoplay: {
                        delay: 7000,
                        disableOnInteraction: false,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        769: {
                            slidesPerView: 2,
                        },
                        1041: {
                            slidesPerView: 3,
                        },
                        1201: {
                            slidesPerView: 4,
                        },
                    }
                });
            });
            $('.fn__widget_posts_fcarousel .swiper').each(function() {
                const swiper = new Swiper($(this)[0], {
                    loop: false,
                    speed: 500,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: $(this).closest('.fn__circle_slider').find('.swiper-button-next')[0],
                        prevEl: $(this).closest('.fn__circle_slider').find('.swiper-button-prev')[0],
                    },
                    slidesPerView: 1,
                    autoplay: {
                        delay: 700000,
                        disableOnInteraction: false,
                    },
                });
            });
        },

        posts_fslider: function() {
            $('.fn__widget_posts_fslider .swiper').each(function() {
                const swiper = new Swiper($(this)[0], {
                    loop: false,
                    speed: 500,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: $(this).closest('.fn__circle_slider').find('.swiper-button-next')[0],
                        prevEl: $(this).closest('.fn__circle_slider').find('.swiper-button-prev')[0],
                    },
                    slidesPerView: 1,
                    autoplay: {
                        delay: 700000,
                        disableOnInteraction: false,
                    },
                });
            });
        },

        posts_cslider: function() {
            $('.fn__widget_posts_cslider .swiper').each(function() {
                const swiper = new Swiper($(this)[0], {
                    loop: true,
                    speed: 500,
                    spaceBetween: 50,
                    navigation: {
                        nextEl: $(this).closest('.fn__circle_slider').find('.swiper-button-next')[0],
                        prevEl: $(this).closest('.fn__circle_slider').find('.swiper-button-prev')[0],
                    },
                    slidesPerView: 1,
                    autoplay: {
                        delay: 7000,
                        disableOnInteraction: false,
                    },
                });
            });
        },

        posts_epsilon: function() {
            $('.fn__widget_posts_epsilon .swiper').each(function() {
                var swiper = $(this),
                    parent = swiper.closest('.fn__circle_slider'),
                    item = parent.find('.epsilon_item'),
                    timeoutId,
                    progressbar = parent.find('.progress-bar'),
                    progressContainer = parent.find('.fn-block-progress-circle');

                new Swiper(swiper[0], {
                    effect: 'fade',
                    direction: 'horizontal',
                    loop: true,
                    speed: 500,
                    spaceBetween: 0,
                    slidesPerView: 1,
                    autoplay: {
                        delay: 7000,
                        disableOnInteraction: false,
                    },
                    on: {
                        init: function() {
                            if (item.length > 1) {
                                progressContainer.addClass('active');
                            }
                        },
                        slideChange: function() {
                            if (item.length > 1) {
                                var circumference = 2 * Math.PI * 15;
                                progressbar.css({
                                    'transition-duration': '0s',
                                    'stroke-dashoffset': circumference
                                });
                                clearTimeout(timeoutId);
                                timeoutId = setTimeout(function() {
                                    progressbar.css({
                                        'transition-duration': '7s',
                                        'stroke-dashoffset': 0
                                    });
                                }, 10);
                            }

                        },
                    }
                });

            });
        },

    };

    $(window).on('elementor/frontend/init', FrenifyMow.init);


})(jQuery, window.elementorFrontend);