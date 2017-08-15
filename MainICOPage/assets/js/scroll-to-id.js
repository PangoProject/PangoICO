//Scroll to ID and change active selector on scroll
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

menuItems.click(function(e){
        var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 1000);
    e.preventDefault();
});


$(window).scroll(function(){
    var fromTop = $(this).scrollTop()+topMenuHeight;
    var cur = scrollItems.map(function(){
        if ($(this).offset().top - 100 < fromTop)
            return this;
    });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        menuItems
            .parent().removeClass("active animated fadeIn")
            .end().filter("[href='#"+id+"']").parent().addClass("active animated fadeIn");
    }
});

// Check distance to top and display back-to-top.
$( window ).scroll( function() {
    if ( $( this ).scrollTop() > 800 ) {
        $( '.back-to-top' ).addClass( 'show-back-to-top' );
    } else {
        $( '.back-to-top' ).removeClass( 'show-back-to-top' );
    }
});

$("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
});