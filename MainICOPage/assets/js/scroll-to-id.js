$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            console.log(target);
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top-100
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex','-1');
                        $target.focus();
                    };
                });
            }
        }
    });

$("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
});

// Check distance to top and display back-to-top.
$( window ).scroll( function() {
    if ( $( this ).scrollTop() > 800 ) {
        $( '.back-to-top' ).addClass( 'show-back-to-top' );
    } else {
        $( '.back-to-top' ).removeClass( 'show-back-to-top' );
    }
});

