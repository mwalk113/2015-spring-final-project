

jQuery(document).ready(function ($) {


    /* Define some vars */

    var win = $(window),
        body = $('body'),
        header = $('header'),
        headerHeight = header.outerHeight(true),
        headerNav = $('nav'),
        content = $('main'),
        pxWrapper = $('#intro-wrap'),
        pxContainer = $('#intro'),
        pxImg = $('.intro-item'),
        pxImgCaption = pxContainer.find('.caption'),
        testimonial = $('.testimonial-slider'),
        cCarousel = $('.custom-carousel'),
        loaderIntro = '<div class="landing landing-slider"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
        loader = '<div class="landing landing-els"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
        loaderLightbox = '<div class="landing landing-els lightbox"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>',
        darkover = '<div class="darkover"></div>',
        moreBtnIcon = '<div class="more"><a href="#main"><i class="icon icon-arrow-down"></i></a></div>';


   
   

    /* Overlay content absolute centering */

    function centerOverlay() {

        var PortfolioOverlay = $('.overlay-content'),
            BlogOverlay = $('.blog-overlay');

        if (PortfolioOverlay.length) {

            PortfolioOverlay.each(function () {

                var $this = $(this),
                    itemPortfolioHeight = $this.closest('.item').height(),
                    PortfolioOverlayHeight = $this.height(),
                    PortfolioIcon = $this.children('.post-type');
                PortfolioIconHeight = PortfolioIcon.children('i').height();

                if ((PortfolioOverlayHeight + 30) > itemPortfolioHeight) {

                    $this.children('p').css({
                        'visibility': 'hidden'
                    });
                    $this.children('h2').css({
                        'visibility': 'hidden'
                    });

                    $this.css({
                        marginTop: (itemPortfolioHeight - PortfolioIconHeight) / 2
                    });

                } else {

                    $this.children('p').css({
                        'visibility': 'visible'
                    });
                    $this.children('h2').css({
                        'visibility': 'visible'
                    });
                    $this.css({
                        marginTop: (itemPortfolioHeight - PortfolioOverlayHeight) / 2
                    });

                }

            });

        }

        if (BlogOverlay.length) {

            BlogOverlay.each(function () {

                var $this = $(this),
                    itemBlogHeight = $this.prev('img').height(),
                    BlogOverlayIcon = $this.children('i'),
                    BlogOverlayIconHeight = BlogOverlayIcon.height();

                BlogOverlayIcon.css({
                    top: (itemBlogHeight - BlogOverlayIconHeight) / 2
                });

            });

        }

    }

    centerOverlay();
    $(window).on('load', centerOverlay);
    $(window).on('resize', centerOverlay);


    /* fix Blog Excerpt Heights */

    var blogExcerpt = $('.item.column.three .blog-excerpt');

    function fixBlogH() {

        var gridW = parseInt($('.grid-items').width()),
            sizerBigW = (gridW / 100) * 48,
            sizerBigH = sizerBigW * 0.75,
            sizerSmallW = (gridW / 100) * 22.05,
            sizerSmallH = sizerSmallW * 0.75,
            difference = sizerBigH - sizerSmallH + 0.5;

        // console.log(difference);

        if (!body.hasClass('mobile')) {

            blogExcerpt.css({
                'height': difference
            });

        } else {

            blogExcerpt.css({
                'height': 'auto'
            });

        }

    }

    if (blogExcerpt.length) {

        fixBlogH();
        $(window).on('resize', fixBlogH);

    }


    /* Masonry */

    var grid = $('.grid-items');

    function masonry() {

        grid.each(function () {

            var $this = $(this),
                filterOptions = $this.prev('.filter-options'),
                sizer = $this.find('.shuffle-sizer');

            $this.append(loader);

            $this.waitForImages({

                finished: function () {

                    $this.children('.landing-els').remove();

                    $this.shuffle({
                        itemSelector: '.item',
                        sizer: sizer,
                        speed: 500,
                        easing: 'ease-out',
                    });

                    if (filterOptions.length) {

                        var btns = filterOptions.children();
                        btns.on('click', function () {
                            var $this = $(this),
                                parentGrid = filterOptions.next(grid),
                                isActive = $this.hasClass('active'),
                                group = isActive ? 'all' : $this.data('group');

                            // Hide current label, show current label in title
                            if (!isActive) {
                                $('.filter-options .active').removeClass('active');
                            }

                            $this.toggleClass('active');

                            // Filter elements
                            parentGrid.shuffle('shuffle', group);
                        });

                        btns = null;

                    }

                    $this.removeClass('preload');
                    centerOverlay();

                },
                waitForAll: true
            });

        });

    }

    if (grid.length) {

        masonry();

    }


    

    /* Chart numbers absolute centering */

    var chart = $('.chart'),
        chartNr = $('.chart-content'),
        chartParent = chart.parent();

    function centerChartsNr() {

        chartNr.css({
            top: (chart.height() - chartNr.outerHeight()) / 2
        });

    }

    if (chart.length) {

        centerChartsNr();
        $(window).resize(centerChartsNr);

        chartParent.each(function () {

            $(this).onScreen({
                doIn: function () {
                    $(this).find('.chart').easyPieChart({
                        scaleColor: false,
                        lineWidth: 12,
                        size: 178,
                        trackColor: false,
                        lineCap: 'square',
                        animate: 2000,
                        onStep: function (from, to, percent) {
                            $(this.el).find('.percent').text(Math.round(percent));
                        }
                    });
                },
            });

            $(this).find('.chart').wrapAll('<div class="centertxt" />');

        });

    }


    


    /* onScreen Animations */

    var onScreenAnims = $('.animation');

    if (onScreenAnims.length) {

        onScreenAnims.onScreen({
            toggleClass: false,
            doIn: function () {
                $(this).addClass('onscreen')
            }
        });

    }


   

    /* Initialize Gallery Sliders */

    var galleryslidercontainer = $('.gallery.slider');

    function gallerySlider() {

        galleryslidercontainer.each(function () {

            var $this = $(this),
                galleryslider = $this.children('figure'),
                autoplay = $this.data('autoplay'),
                autoheight = $this.data('autoheight');

            galleryslider.owlCarousel({
                singleItem: true,
                autoHeight: autoheight || false,
                autoPlay: autoplay || false,
                transitionStyle: "fade",
                stopOnHover: true,
                responsiveBaseWidth: ".slider",
                responsiveRefreshRate: 0,
                addClassActive: true,
                navigation: true,
                navigationText: [
                    "<i class='icon  icon-arrow-up'></i>",
                    "<i class='icon icon-arrow-down'></i>"
                ],
                pagination: false,
                rewindSpeed: 2000,
            });

            $this.fadeIn('slow');

        });

    }

    if (galleryslidercontainer.length) {

        gallerySlider();

    }


    /* Create unique data-lightbox attributes http://stackoverflow.com/questions/11044876/how-to-auto-generate-id-for-child-div-in-jquery */

    var lightboxContainer = $('.lightbox');

    if (lightboxContainer.length) {

        var $this = lightboxContainer;

        for (var i = 0; i < $this.length; i++) {

            $($this[i]).find('.item a').attr("data-lightbox", "gallery-" + i);

        }

        lightboxContainer.each(function () {

            var $this = $(this);

            var activityIndicatorOn = function () {
                $(loaderLightbox).appendTo('body');
            },
                activityIndicatorOff = function () {
                    $('.landing-els').remove();
                },
                overlayOn = function () {
                    $('<div id="imagelightbox-overlay"></div>').appendTo('body');
                },
                overlayOff = function () {
                    $('#imagelightbox-overlay').remove();
                },
                closeButtonOn = function (instance) {
                    $('<a href="#" id="imagelightbox-close"><i class="icon icon-close"></i></a>').appendTo('body').on('click', function () {
                        $(this).remove();
                        instance.quitImageLightbox();
                        return false;
                    });
                },
                closeButtonOff = function () {
                    $('#imagelightbox-close').remove();
                },
                captionOn = function () {
                    var description = $('a[href="' + $('#imagelightbox').attr('src') + '"]').find('h2').html();
                    if (description.length > 0)
                        $('<div id="imagelightbox-caption"><h3>' + description + '</h3></div>').appendTo('body');
                },
                captionOff = function () {
                    $('#imagelightbox-caption').remove();
                };


            var instance = $this.find('.item a[data-lightbox^="gallery-"]').imageLightbox({
                onStart: function () {
                    overlayOn();
                    closeButtonOn(instance);
                },
                onEnd: function () {
                    overlayOff();
                    captionOff();
                    closeButtonOff();
                    activityIndicatorOff();
                },
                onLoadStart: function () {
                    captionOff();
                    activityIndicatorOn();
                },
                onLoadEnd: function () {
                    captionOn();
                    activityIndicatorOff();
                }
            });

        });

    }


    


    /* Add some "last" classes */

    headerNav.find('.menu-item').last('li').addClass('last');
    $('#top-footer').find('.column').last('.column').addClass('last');
    $('.blog.list-style').find('article').last('article').addClass('last');
    $('.search.list-style').find('article').last('article').addClass('last');


    /* Clear columns */

    var lastColumn = $('.column.last');

    if (lastColumn.length) {

        lastColumn.after('<div class="clear"></div>');

    }


    /* Initialize FluidVids.js */

    Fluidvids.init({
        selector: 'iframe',
        players: ['www.youtube.com', 'player.vimeo.com']
    });



});