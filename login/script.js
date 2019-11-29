  var flag = 0;

$( ".email" ).keyup(function() {
  var letterCount = $(this).val().length;
  var count = letterCount/2.5;
  var countEyes = letterCount;
  
  if(letterCount >= 1 && letterCount < 34){
    $(".pupil, .pupil2").css("transform","translate("+count+"px, 7px)");
    $(".mouth").css("height",countEyes+"px");
  }
});

 setInterval(function(){
   if($(".login-password").is(":focus") == false && flag == 0){
     $(".eye").hide();
     setTimeout(function(){ 
       $(".eye").show(); 
     }, 200);}
    if($(".register-password").is(":focus") == false && flag == 0){
      $(".eye").hide();
      setTimeout(function(){ 
        $(".eye").show(); 
      }, 200);}
 }, 2500);

$( ".login-password" ).focus(function() {
  resetEyes();
  if(flag == 0){
    $(".eye").hide();
  }
  if(flag == 1){
    $(".eye-right").show();
  }
});

$( ".email" ).focus(function() {
  $(".eye").show();
});

$(".show").on("click", function(){
  if(flag == 1){
    $(".eye-left").show();
  }
});

function show(who) {
  if(flag == 0){
    flag = 1;
  }else{
    flag = 0;
    $(".eye").hide();
  }
  if(who != 'register'){
    var x = document.getElementById("login-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }else{
    var x = document.getElementById("register-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}

function validate(){
  var email = $(".email").val();
  var regex = /^\S+@\S+$/;
  var rest = regex.test(email);
  $(".eye").show(); 
  return rest;
}

$(".button").on("click", function(){
  onclick()
});

$("#login-form").on("submit", function(){
  let email = $('#login-email').val()
  let password = $('#login-password').val()
  login({ email, password })
})

$('#register-form').on('submit', function(){
  let email = $('#register-email').val()
  let password = $('#register-password').val()
  let name = $('#login-email').val()

})

function register(user){
  $.ajax({
    url:"http://localhost:3000/user/register",
    method:"post",
    data:user
  }).done(user=>{

  }).fail(err=>{
    alert(err)
  })
}

function login(user){
  $.ajax({
    url:"http://localhost:3000/user/login",
    method:"post",
    data: user
  }).done(user=>{

  }).fail(err=>{
    alert(err)
  })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  // onclick('google')
  $.ajax({
    url:"http://localhost:3000/user/googleSignIn",
    method:"post",
    headers:{
      googleidtoken:id_token
    }
  }).done(user=>{

  }).fail(err=>{
    alert(err)
  })
}

function onclick(src){
  resetEyes()
  if(validate() || src == 'google'){
    $(".mouth").css("height","38px");
    $(".button").fadeOut("fast");
    $("input").fadeOut("fast");
    $("p").fadeOut("fast");
    $("span").fadeOut("fast");
    $(".pokemon").fadeOut("fast");
    $(".leafs").fadeOut("fast");
    
    $(".red").fadeIn();
    $(".circle").fadeIn();
    $(".squareC2").fadeIn();
    $(".container").css("width","150px");
    $(".container").css("height","150px");
    $(".container").css("transform-origin","-25px");
    $(".container").css("animation","catch 3s ease 1s forwards");
    $(".squareC2").css("animation","catch2 3s ease 1s forwards");
    $(".done").css("animation","done .5s ease 3s forwards");
  }else{
    $(".pokemon").addClass("mad");
    $(".pokemon, .f").css("background-color","#d9aa78");
    $(".email").css("border-color","#e74c3c");
    
    setTimeout(function(){ 
    $(".pokemon").removeClass("mad");
    $(".pokemon, .f").css("background-color","#78d9ad");
    $(".email").css("border-color","#b8e994");
     }, 300);
  }
}

function resetEyes(){
  $(".pupil").css("transform","translate(13px, 7px)");
  $(".pupil2").css("transform","translate(0px, 7px)");
}
