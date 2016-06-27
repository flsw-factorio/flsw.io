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

  $('#' + servers[0].name + 'INFO').slideToggle();
  $('#' + servers[1].name + 'INFO').slideToggle();
  $('#' + servers[2].name + 'INFO').slideToggle();

  loadJSON(0);
  loadJSON(1);

  function toggleserver(server) {
    $("#" + servers[server].name + 'SHOW > i').toggleClass('fa fa-chevron-down');
    $("#" + servers[server].name + 'SHOW > i').toggleClass('fa fa-chevron-up');
    $('#' + servers[server].name + 'INFO').slideToggle();
  }

  function loadJSON(server) {
    var showData = $('#' + servers[server].name + 'TABLE');

    $.getJSON('modlist.json', function(data) {
      console.log(data);
      var items = data.items.map(function(mod) {
        if (mod.server == server) {
          return '<tr>' + '<th>' + mod.name + '</th>' + '<th>' + mod.version + '</th>' + '<th>' + '<a href="' + mod.url + ' target="_blank"><i class="fa fa-download"></i></a>' + '</th>' + '</tr>';
        }
      });
      showData.empty();
      if (items.length) {showData.append(items);}
    });

  }

  $('#SERVER1MAIN').unbind().click(function() {
    toggleserver(0);
  });
  $('#SERVER2MAIN').click(function() {
    toggleserver(1);
  });
  $('#SERVER3MAIN').click(function() {
    toggleserver(2);
  });
});
