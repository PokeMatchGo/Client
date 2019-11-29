$(document).ready(function(){
  $.ajax({
    method:'get',
    url: 'http://localhost:3000/pokemon/random'
  })
    .done(function(pokemon){
      const CP = Math.round((pokemon.base_attack+pokemon.base_defense+pokemon.base_stamina)/3)
      $('#card').append(`<img src='${pokemon.imageUrl}' height='300px' style="margin-top: 100px;">`)
    })
    .fail(function(err){
      console.log(err.responseText)
    })
    .always(function(){  
      $('#trainer').append(`<img src="../img/trainer.png" height='500px' style="margin-top: 100px;">`)
    })

  $.ajax({
    method:'get',
    url: 'http://localhost:3000/address/random'
  })
    .done(function(address){
      $('#map').append(`
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=${address.state}&t=&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
          </div>
          <style>
            .mapouter{position:relative;text-align:right;height:400px;width:600px;padding-top:100px;}
            .gmap_canvas {overflow:hidden;background:none!important;height:400px;width:600px;}
          </style>
        </div>`
      )

    })
    .fail(function(err){
      console.log(err.responseText)
    })

});