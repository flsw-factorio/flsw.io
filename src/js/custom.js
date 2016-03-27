// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
});

$(function() {
    new WOW().init();
    $('.templatemo-nav').singlePageNav({
    	offset: 70
    });

    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    $('#register-form').submit(function(event) {
      event.preventDefault();
      var data = $(this).serializeArray();
      $.ajax({
        type : "POST",
        url: "/api/accounts",
        data: data,
        headers: {
          "Authorization": "Basic foobar"
        }
      })
      .done(function( data ) {
          $( '#register-form' ).empty();
        });
    });
});
