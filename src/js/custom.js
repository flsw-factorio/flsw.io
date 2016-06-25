// preloader
$(window).load(function() {
  $('.preloader').fadeOut(1000); // set duration in brackets
  $('.include').each(function() {
    var path = $(this).attr('id');
    $(this).load(path);
  });
});

var global_user = null;
var global_ip = null;

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
    console.log("Whitelisting " + $('#user_ip').text());
    console.log(global_user);

    var data = { username: global_user.username, ip: $('#user_ip').text() };
    $.ajax({
        type: "POST",
        url: "/api/whitelist",
        data: data,
        xhrFields: {
          withCredentials: true
        },
        headers: {
          "Authorization": 'Basic ' + global_user.auth
        }
      })
      .done(function(data) {
        //$('#register-form').html("Great! Now you can login and submit your IP to the whitelist!");
      });
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
