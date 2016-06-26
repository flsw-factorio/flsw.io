$(document).ready(function() {

  var servers = [{
    name: 'SERVER1',
    active: false
  }, {
    name: 'SERVER2',
    active: false
  }, {
    name: 'SERVER3',
    active: false
  }];

  $('.moreinfo' + servers[0].name).hide();
  $('.moreinfo' + servers[1].name).hide();

  function toggleserver(server) {
    if (servers[server].active == true) {
      $("#show"+servers[server].name).html('MORE INFO');
      for (var i = 0; i < servers.length; i++) {
        if (i != server) {
          $('#' + servers[i].name).show();
        }
      }
      $('.moreinfo' + servers[server].name).hide();
      servers[server].active = false;
    } else {
      $("#show"+servers[server].name).html('LESS INFO');
      for (var i = 0; i < servers.length; i++) {
        if (i != server) {
          $('#' + servers[i].name).hide();
        }
      }
      $('.moreinfo' + servers[server].name).show();
      servers[server].active = true;
    }
  }

  $('#showSERVER1').click(function() {
    toggleserver(0);
    var liSERVER1 = $('#tableSERVER1');
    $.getJSON('modlist.json', function(data) {
      var content_SERVER1 = data.SERVER1.map(function(mod) {
        return '<tr>' + '<th>' + mod.name + '</th>' + '<th>' + mod.version + '</th>' + '<th>' + '<a href="' + mod.url + ' target="_blank"><i class="fa fa-download"></i></a>' + '</th>' + '</tr>';
      });
      liSERVER1.empty();
      if (content_SERVER1.length) {
        liSERVER1.append(content_SERVER1);
      }
    });
  });

  $('#showSERVER2').click(function() {
    toggleserver(1);
    var liSERVER2 = $('#tableSERVER2');
    $.getJSON('modlist.json', function(data) {
      var content_SERVER2 = data.SERVER2.map(function(mod) {
        return '<tr>' + '<th>' + mod.name + '</th>' + '<th>' + mod.version + '</th>' + '<th>' + '<a href="' + mod.url + ' target="_blank"><i class="fa fa-download"></i></a>' + '</th>' + '</tr>';
      });
      liSERVER2.empty();
      if (content_SERVER2.length) {
        liSERVER2.append(content_SERVER2);
      }
    });
  });

});
