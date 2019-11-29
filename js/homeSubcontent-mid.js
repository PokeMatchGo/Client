var baseUrl = 'http://localhost:3000'

$(document).ready(function () {
  let userCards = []
  fetchUserCards()
})

function fetchUserCards() {
  $.ajax({
    method: 'get',
    url: baseUrl + '/user/cards',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(cards => {
      userCards = cards

      cards.forEach(card => {
        var cardElement = $(
          '<a class="card">' +
            `<div onclick="showCardStat(${card.pokemon_id})" class="side front" style="background-image:url(\'` + card['imageUrl'] + '\')"></div>' +
            '<div class="side back"></div>' +
          '</a>')
        
        $('.cards-container').append(cardElement)
      })
      console.log('cards when fetching cards', cards);
    })
    .fail(err => {
      console.log('error when fetching cards', err);
    })
}

function renderCard (imageUrl) {
  let rendering = `<img src=${imageUrl}>`
  return rendering
}

// base_attack: 223
// base_defense: 169
// base_stamina: 172
// imageUrl: "https://images.pokemontcg.io/pop4/5_hires.png"
// pokemon_id: 254
// pokemon_name: "Sceptile"

function showCardStat (pokemon_id) {
  $('#card-info').empty()
  userCards.forEach(card => {
    if (card.pokemon_id === pokemon_id) {
      $('#card-info').append(`
        <h3>${card.pokemon_name}</h3>
        <p>Attack : ${card.base_attack}</p>
        <p>Defense: ${card.base_defense}</p>
        <p>Stamina: ${card.base_stamina}</p>
      `)
    }
  })
}