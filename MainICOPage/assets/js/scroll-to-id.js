//smooth scroll on click
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 1000);
    e.preventDefault();
});

//change the active section on scroll and click
$(window).scroll(function () {
    var fromTop = $(this).scrollTop() + topMenuHeight;
    var cur = scrollItems.map(function () {
        if ($(this).offset().top - 100 < fromTop)
            return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        menuItems
            .parent().removeClass("active animated fadeIn")
            .end().filter("[href='#" + id + "']").parent().addClass("active animated fadeIn");
    }
});

//scroll back to top of page on click
$("a[href='#top']").click(function () {
    $("html, body").animate({scrollTop: 0}, 1000);
    return false;
});

// Scroll to top button
$(document).ready(function () {
    $("#back-top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('#back-top').removeClass("animated fadeOutDownBig");
                $('#back-top').addClass("animated fadeInUpBig");
                $('#back-top').show();
            } else {
                $('#back-top').addClass("animated fadeOutDownBig");

            }
        });
    });
});

$(function() {
    $('.scroll-down').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top-100}, 800);
    });
});
