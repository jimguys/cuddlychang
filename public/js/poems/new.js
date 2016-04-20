$(function() {
  var poetSearch = $('.poet-search');
  var poetsList = $('.poet-list');
  var poets = poetsList.find('.poet').map(function() { return $(this).data('poet'); });

  poetSearch.typeahead({
    name: 'poets',
    valueKey: 'username',
    remote: {
      url: '/poets?q=%QUERY',
      filter: function(poets) {
        return poets.filter(function(p) {
          return poetsList.find('input[value=' + p.id + ']').length === 0;
        });
      }
    }
  }).on('typeahead:selected', function(element, poet) {
    poets.push(poet);
    renderPoets();
    $(this).typeahead('setQuery', '');
  });

  poetsList.on('click', '.poet', function() {
    var thisPoet = $(this).data('poet');
    poets = poets.filter(function(i, poet) { return i === 0 || poet.id !== thisPoet.id; });
    renderPoets();
  });

  function renderPoets() {
    var div = $(jade.render('server/views/partials/poets.jade', {
      poets: poets
    }));
    poetsList.html(div);
  }
});
