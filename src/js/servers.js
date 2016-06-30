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

function toggleServer(server) {
  if (servers[server].active == true) {
    servers[server].active = false;
    $("#" + servers[server].name + 'SHOW').addClass('fa-chevron-down');
    $("#" + servers[server].name + 'SHOW').removeClass('fa-chevron-up');
    $('#' + servers[server].name + 'INFO').slideToggle();
    closeNotActive(server);
  } else {
    servers[server].active = true;
    $("#" + servers[server].name + 'SHOW').addClass('fa-chevron-up');
    $("#" + servers[server].name + 'SHOW').removeClass('fa-chevron-down');
    $('#' + servers[server].name + 'INFO').slideToggle();
    closeNotActive(server);
  }
}

function closeNotActive(server) {
  for (i = 0; i < servers.length; i++) {
    if (servers[i].active == true && i != server) {
      servers[i].active = false;
      $("#" + servers[i].name + 'SHOW').addClass('fa-chevron-down');
      $("#" + servers[i].name + 'SHOW').removeClass('fa-chevron-up');
      $('#' + servers[i].name + 'INFO').slideToggle();
    }
  }
}

function loadJSON(server) {
  var showData = $('#' + servers[server].name + 'TABLE');

  $.getJSON('modlist.json', function(data) {
    var items = data.items.map(function(mod) {
      if (mod.server == server) {
        return '<tr>' + '<th>' + mod.name + '</th>' + '<th>' + mod.version + '</th>' + '<th>' + '<a href="' + mod.url + ' target="_blank"><i class="fa fa-download"></i></a>' + '</th>' + '</tr>';
      }
    });
    showData.empty();
    if (items.length) {
      showData.append(items);
    }
  });

}

$(function() {
  $('#' + servers[0].name + 'INFO').slideToggle();
  $('#' + servers[1].name + 'INFO').slideToggle();
  $('#' + servers[2].name + 'INFO').slideToggle();

  loadJSON(0);
  loadJSON(1);


  $('#SERVER1MAIN').click(function() {
    toggleServer(0);
  });
  $('#SERVER2MAIN').click(function() {
    toggleServer(1);
  });
  $('#SERVER3MAIN').click(function() {
    toggleServer(2);
  });
});
