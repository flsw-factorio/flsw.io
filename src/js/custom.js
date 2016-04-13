// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
    $("#import_nav").load("load/nav.html");
    $("#import_servers").load("load/servers.html");
    $("#import_modals").load("load/modal.html");
    $("#import_register").load("load/register.html");
    $("#import_footer").load("load/footer.html");
});

var global_user = null;

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
        xhrFields: { withCredentials: true },
        headers: { "Authorization": 'Basic ' + authfield }
      }).done(function( data ) {
	      $('#login').modal('hide');
	      global_user = data;
	      global_user.auth = authfield;
	      $('#user_ip').html("69.69.69.69");
      });
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
    $('#whitelist').click(function() {
      console.log("Whitelisting " + $('#user_ip').text())
    });
    $.get("http://ipinfo.io", function(response) {
        $('#user_ip').text(response.ip);
    }, "jsonp");
});
