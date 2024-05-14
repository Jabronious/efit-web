$(document).ready(() => {
  $('.replace-button').click(() => {
    $('.replace-button').hide().siblings().show();
    $('input[readonly]').removeAttr('readonly');
    $('input').val('');
  });

  $('.cancel-button').click(() => {
    $('.cancel-button').hide().siblings().hide();
    $('.replace-button').show();
    $('input').val('*****');
    $('input').prop('readonly', true);
  });

  $('.toggle-btn').click(function () {
    $('#instructions').slideToggle();
  });
});
