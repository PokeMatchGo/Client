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

$(".login-show").on("click", function(){
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

$("#login-form").on("submit", function(e){
e.preventDefault();
  let email = $('#login-email').val()
  let password = $('#login-password').val()
  login({ email, password })
})

$('#register-form').on('submit', function(e){
    e.preventDefault();
  let email = $('#register-email').val()
  let password = $('#register-password').val()
  let name = $('#register-name').val()
  register({ email,password,name })
})

function generateCard(){
    $.ajax({
      url:"http://localhost:3000/user/pokemon/random",
      method:"post",
      headers : {
          'token' : localStorage.getItem('token')
      }
    }).done(user=>{

    }).fail(err=>{
      alert(err)
    })
  }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.removeItem('token')
}


function register(user){
  $.ajax({
    url:"http://localhost:3000/user/register",
    method:"post",
    data:user
  }).done(user=>{
    onclick()
    localStorage.setItem('token',user.access_token)
    loginG()
    generateCard()
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
    onclick()
    localStorage.setItem('token',user.access_token)
    loginG()
  }).fail(err=>{
    alert(err)
  })
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  onclick('google')
  $.ajax({
    url:"http://localhost:3000/user/googleSignIn",
    method:"post",
    headers:{
      googleidtoken:id_token
    }
  }).done(user=>{
    onclick()
    localStorage.setItem('token',user.access_token)
    loginG()
    generateCard()
  }).fail(err=>{
    alert(err)
  })
}

function loginG() {
    $('#homepagePoke').show('slow')
    $('#login-form').hide()
    $('#register-form').hide()
    $('.login-container').hide()
}

function onclick(src){
  resetEyes()
  if(validate() || src == 'google'){
    $(".login-mouth").css("height","38px");
    $(".login-button").fadeOut("fast");
    $(".login-input").fadeOut("fast");
    $(".login-p").fadeOut("fast");
    $(".login-span").fadeOut("fast");
    $(".login-pokemon").fadeOut("fast");
    $(".login-leafs").fadeOut("fast");
    
    $(".login-red").fadeIn();
    $(".login-circle").fadeIn();
    $(".login-squareC2").fadeIn();
    $(".login-container").css("width","150px");
    $(".login-container").css("height","150px");
    $(".login-container").css("transform-origin","-25px");
    $(".login-container").css("animation","catch 3s ease 1s forwards");
    $(".login-squareC2").css("animation","catch2 3s ease 1s forwards");
    $(".login-done").css("animation","done .5s ease 3s forwards");
  }else{
    $(".login-pokemon").addClass("mad");
    $(".login-pokemon, .f").css("background-color","#d9aa78");
    $(".email").css("border-color","#e74c3c");
    
    setTimeout(function(){ 
    $(".login-pokemon").removeClass("mad");
    $(".login-pokemon, .f").css("background-color","#78d9ad");
    $(".email").css("border-color","#b8e994");
     }, 300);
  }
}

function resetEyes(){
  $(".pupil").css("transform","translate(13px, 7px)");
  $(".pupil2").css("transform","translate(0px, 7px)");
}
