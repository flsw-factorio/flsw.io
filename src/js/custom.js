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

    $('#login-form').submit(function(event) {
      event.preventDefault();
      event.preventDefault();
      var $inputs = $('#login-form :input');
      var values = {};
      $inputs.each(function() {
              values[this.name] = $(this).val();
      });

      var authfield = btoa(values['username']+":"+values['password']);
      var data = $(this).serializeArray();

      $.ajax({
        type : "GET",
        url: "/api/accounts/" + values['username'],
        data: data,
        xhrFields: { withCredentials: true },
        headers: { "Authorization": 'Basic ' + authfield }
      }).done(function( data ) {$('#login').modal('hide');}); 
    });
    $('#register-form').submit(function(event) {
      event.preventDefault();
      var $inputs = $('#register-form :input');
      var values = {};
      $inputs.each(function() {
	      values[this.name] = $(this).val();
      });

      var authfield = btoa(values['username']+":"+values['password']);
      var data = $(this).serializeArray();

      $.ajax({
        type : "POST",
        url: "/api/accounts",
        data: data,
        xhrFields: { withCredentials: true },
	headers: { "Authorization": 'Basic ' + authfield }
      })
      .done(function( data ) {
          $( '#register-form' ).html("Great! Now you can login and submit your IP to the whitelist!");
        });
    });
});
