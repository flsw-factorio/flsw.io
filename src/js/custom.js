// preloader
$(window).load(function() {
  $('.preloader').fadeOut(1000); // set duration in brackets
  $("#import_nav").load("load/nav.html");
  $("#import_servers").load("load/servers.html");
  $("#import_modal_login").load("load/modal/login.html");
  $("#import_modal_myaccount").load("load/modal/myaccount.html");
  $("#import_modal_pvp").load("load/modal/pvp.html");
  $("#import_modal_pve").load("load/modal/pve.html");
  $("#import_register").load("load/register.html");
  $("#import_footer").load("load/footer.html");
  $("#import_donate_button").load("load/donate_button.html");
});

var global_user = null;

$(function() {
  new WOW().init();
  $('.templatemo-nav').singlePageNav({
    offset: 70
  });

  /* Hide mobile menu after clicking on a link
  -----------------------------------------------*/
  $('.navbar-collapse a').click(function() {
    $(".navbar-collapse").collapse('hide');
  });

  $('#login-form').submit(function(event) {
    event.preventDefault();
    var $inputs = $('#login-form :input');
    var values = {};
    $inputs.each(function() {
      values[this.name] = $(this).val();
    });

    var authfield = btoa(values['username'] + ":" + values['password']);
    var data = $(this).serializeArray();

    $.ajax({
      type: "GET",
      url: "/api/accounts/" + values['username'],
      xhrFields: {
        withCredentials: true
      },
      headers: {
        "Authorization": 'Basic ' + authfield
      }
    }).done(function(data) {
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

    var authfield = btoa(values['username'] + ":" + values['password']);
    var data = $(this).serializeArray();

    $.ajax({
        type: "POST",
        url: "/api/accounts",
        data: data,
        xhrFields: {
          withCredentials: true
        },
        headers: {
          "Authorization": 'Basic ' + authfield
        }
      })
      .done(function(data) {
        $('#register-form').html("Great! Now you can login and submit your IP to the whitelist!");
      });
  });

  $('#whitelist').click(function() {
    console.log("Whitelisting " + $('#user_ip').text())
  });

  $.get("http://ipinfo.io", function(response) {
    $('#user_ip').text(response.ip);
  }, "jsonp");

  $('#pvp-modal').unbind().click(function() {
    $("html, body").animate({scrollTop: 0}, 0);
    $('html, body').animate({scrollTop: $('#servers').position().top}, 1);
    var lipvp = $('#table-pvp');
    var pvp_modal = $('#pvp');
    $(pvp_modal).modal('show');
    $.getJSON('modlist.json', function(data) {
      var content_pvp = data.pvp_mods.map(function(mod) {
        return '<tr>' + '<th>' + mod.name + '</th>' + '<th>' + mod.version + '</th>' + '<th>' + '<a href="' + mod.url + ' target="_blank"><i class="fa fa-download"></i></a>' + '</th>' + '</tr>';
      });
      lipvp.empty();
      if (content_pvp.length) {lipvp.append(content_pvp);}
    });
  });

  $('#pve-modal').unbind().click(function() {
    $("html, body").animate({scrollTop: 0}, 0);
    $('html, body').animate({scrollTop: $('#servers').position().top}, 1);
    var lipve = $('#table-pve');
    var pve_modal = $('#pve');
    $(pve_modal).modal('show');
    $.getJSON('modlist.json', function(data) {
      var content_pve = data.pve_mods.map(function(mod) {return '<tr>' + '<th>' + mod.name + '</th>' + '<th>' + mod.version + '</th>' + '<th>' + '<a href="' + mod.url + ' target="_blank"><i class="fa fa-download"></i></a>' + '</th>' + '</tr>';});
      lipve.empty();
      if (content_pve.length) {lipve.append(content_pve);}
    });
  });
});
