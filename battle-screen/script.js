$(document).ready(function(){
  $.ajax({
    method:'get',
    url: 'http://localhost:3000/user/battle'
  }).done(function(data){
    let CP = Math.round((data.card.base_attack+data.card.base_defense+data.card.base_stamina)/3)
    $('#card').append(`<input type='hidden' value=${CP} id='CPenemy'> <img src='${data.card.imageUrl}' height='300px' style="margin-top: 100px;"> <br> <br> <br> <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-danger" style="width: 225px;">Battle</button>`)
    $('#map').append(`
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=${data.opponent.state}&t=&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
          </iframe>
        </div>
        <style>
          .mapouter{position:relative;text-align:right;height:400px;width:600px;padding-top:100px;}
          .gmap_canvas {overflow:hidden;background:none!important;height:400px;width:600px;}
        </style>
      </div>`
    )
  }).fail(function(err){
    console.log(err)
  }).always(function(){
    $('#trainer').append(`<img src="../img/trainer.png" height='500px' style="margin-top: 100px;">`)  
  })

});