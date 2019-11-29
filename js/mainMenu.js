$(document).ready((_=>{
  if (localStorage.getItem('allcard')) {
    allListCards()
  }
}))

function allListCards(){
  localStorage.setItem('allcard','menyala!')
  $('.cards-container').empty();
  $('.input-wrapper').addClass('loading');
  $.ajax({
    method:"get",
    url:"http://localhost:3000/pokemon/allCards",
  })
  .done(response=>{
    for(var i = 1; i < response['cards'].length; i++) {
        var card = response['cards'][i];
        var cardElement = $(
          '<a class="card flipped">' +
            '<div class="side front" style="background-image:url(\'' + card['imageUrl'] + '\')"></div>' +
            '<div class="side back"></div>' +
          '</a>')
        $('.cards-container').append(cardElement);
        setTimeout((function(){
          $(this).removeClass('flipped');
        }).bind(cardElement), 100 * i);
      }
      $('.input-wrapper').removeClass('loading');
  })
  .fail(err=>{
    alert(err)
  })
  .always()
}

function searchPoke(e) {
  e.preventDefault();
  if ($('#nameSearch').val()) {
    
  }
  $('.cards-container').empty();
  $('.input-wrapper').addClass('loading');
  $.ajax({
    method:"post",
    url:"http://localhost:3000/pokemon/searchCards",
    data : { name : $('#nameSearch').val() }
  })
  .done(response=>{
    for(var i = 1; i < response['cards'].length; i++) {
        var card = response['cards'][i];
        var cardElement = $(
          '<a class="card flipped">' +
            '<div class="side front" style="background-image:url(\'' + card['imageUrl'] + '\')"></div>' +
            '<div class="side back"></div>' +
          '</a>')
        $('.cards-container').append(cardElement);
        setTimeout((function(){
          $(this).removeClass('flipped');
        }).bind(cardElement), 100 * i);
      }
      $('.input-wrapper').removeClass('loading');
  })
  .fail(err=>{
    alert(err)
  })
  .always(err=>{
    $('input[name="pokemon-name"]').val('');
    $('.input-wrapper').removeClass('loading');
  })
}