$(function() {
  var locationSelect = $('select#location');
  var descriptionSelect = $('select#description');

  $('select').on('change', function(){
    postSearch(locationSelect.val(), descriptionSelect.val());
  });
});

function postSearch(location, description) {
  $.post({
    dataType: 'json',
    url: '/searches',
    data: {location: location, description: description},
    beforeSend: function() {
      $('p#results').html('');
      $('span#searching').show();
    },
    complete: function(){
      $('span#searching').hide();
    },
    success: function(res){
      formatResults(res);
    }
  });
};

function formatResults(res) {
  var jobs = res.length + ' matching result(s) found.';

  $.each(res, function( ix, job ) {
    jobs += '<hr/>';
    $.each( job, function( k, v ) {
        jobs += '<strong>' + k + ": " + '</strong>' + v + '<br>';
    });
    jobs += '<hr/>';
  });

  $('p#results').html(jobs);
};
