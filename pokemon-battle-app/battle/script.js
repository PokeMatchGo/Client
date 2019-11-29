$(function(){

  //HTML objects
  var getMoviesBtn,
      mainPageContent,
      getImages,
      generateBattle,
      versus,
      newbattle;

  //Global values
  var winnercolor = "-webkit-gradient(linear, left top, left bottom, from(#00b09b), to(#96c93d))";

  var init = function (){
    var setHTMLObjects = function(){
      getMoviesBtn = $("#getMoviesBtn");
      mainPageContent = $("#mainPageContent");
      getImages = $("#getImages");
      generateBattle = $("#generate-battle");
      versus = $("#versus");
      newBattle = $("#newbattle");
    }();//End of setting html obj

    var setEvents = function (){
      // getMoviesBtn.on("click", getXML);
      generateBattle.click(function(){
        getFirstPokemon();
        getSecondPokemon();
        generateBattle.hide();
        versus.show();
      });//End of battle generator call
    }();// End of events
  }(); // End init

  function getXML(){
    //Get 20 first pokemons
    $.ajax(
      {
        method: "GET",
        dataType: "json",
        url: "https://pokeapi.co/api/v2/pokemon/",
        beforeSend: function(){
          var bekreftSend = confirm("Sikker på at du vil?");
          if(bekreftSend){
          mainPageContent.html("Skal til å sende ajax kall");
          } else {
            mainPageContent.html("ajax-kall stoppet");
            return false;
          }
        }
      }
    )
    .done(function(response){
      var htmlTxtComplete = "";

      for (var i = 0; i < 20; i++){
        var htmlTxt = "<article class='container-fluid'>";
        var name = response['results'][i]['name'];
        htmlTxt += "<h3>" + name + "</h3>"
        htmlTxt += "</article>";
        htmlTxtComplete += htmlTxt;
      }
      //Printing out results to HTML
      mainPageContent.html(htmlTxtComplete);
    })
    .fail(function(){
      console.log("Fail");
    })
    .always(function(){
      console.log("always");
    });
  }
  var getFirstPokemon = function(){
    var number = Math.floor((Math.random() * 190) + 1);
    //Get bulbasaur
    $.ajax(
      {
        method: "GET",
        dataType: "json",
        url: "https://pokeapi.co/api/v2/pokemon/" + number ,
        beforeSend: function(){
          $('#image').show();
        },
      }
    )
    .done(function(response){
      var text = "";
      var newHealth = 0;
      var name = response['name'];
      var img = response['sprites']['front_default'];
      var bulbaHealth = response['stats']['0']['base_stat'];
      var attackMove = response['moves']['0']['move']['name'];
      var pokemon =
      "<article class='w-25 rounded p-2' id='left-pokemon'>"
       + "<section class='w-100 p-1'><h2>" + name + "</h2></section>"
       + "<section class='health-wrapper w-100'>"
       +    "<span class='healthbar' id='bulbaHealth'>" + "<span id='bulbs'>" + bulbaHealth + "</span>" + "/100" + "</span>"
       +  "</section>"
       + "<img src='#' id='randImg'> "
       + "<button class='btn btn-primary w-100' id='show-attacks'>" + "Fight" + "</button>"
       + "<section class='hides' id='bulba-attack'>"
       +    "<button class='btn btn-warning' id='bulba-attacks' >" + "Use " +  attackMove + "</button>"
       + "</section>"
       + "</article>";


      mainPageContent.append(pokemon);
      $("#randImg").attr("src", img);
      $("#bulbaHealth").css("width", bulbaHealth + "%");
      //Printing out results to HTML

      $('#show-attacks').click(function(){
        $("#bulba-attack").show();
      });

      $("#bulba-attacks").click(function(){

        setTimeout(function(){
          $("#right-pokemon").removeClass("attack-animation");
          $("#randImg").removeClass("attacker-animation");
        }, 1000);
        var charsHealth = $("#charsHealth").text();
        newHealth = charsHealth -= 10;
        $("#right-pokemon").addClass("attack-animation");
        $("#randImg").addClass("attacker-animation");
        $("#charmendar-bar").css("width", newHealth + "%");
        $("#charsHealth").text(newHealth);
          if(charsHealth < 1){
            $("#right-pokemon").addClass("disabledbutton");
            $("#charsHealth").text(0);
            $("#left-pokemon").css({background: winnercolor });
            $("#bulba-attacks").hide();
            $("#left-pokemon").append("<p'>WINNER!</p>");
          }

    });
    })
    .fail(function(){
      console.log("Fail");
    })
    .always(function(){
      console.log("always");
    });
  }//End of bulbasaur
  var getSecondPokemon = function(){
    var number = Math.floor((Math.random() * 190) + 1);
    //Get info on charmendar
    $.ajax(
      {
        method: "GET",
        dataType: "json",
        url: "https://pokeapi.co/api/v2/pokemon/" + number,
        beforeSend: function(){
          $('#image').show();
        },
      }
    )
    .done(function(response){
      //Retriveing info on pokemon and setting up html structure
      var text = "";
      var newHealth = 0;
      var name = response['name'];
      var img = response['sprites']['front_default'];
      var health = response['stats']['0']['base_stat'];
      var attackMove = response['moves']['0']['move']['name'];
      var pokemon =
      "<article class='w-25 rounded p-2' id='right-pokemon'>"
       + "<section class='w-100 p-1'><h2>" + name + "</h2></section>"
       + "<section class='health-wrapper w-100'>"
       +    "<span class='healthbar' id='charmendar-bar'>" + "<span id='charsHealth'>" + health + "</span>" + "/100" + "</span>"
       +  "</section>"
       + "<img src='#' id='randImg1'> "
       + "<button class='btn btn-primary w-100' id='show-attack'>" + "Fight" + "</button>"
       + "<section class='hide'>"
       +    "<button class='btn btn-warning' id='char-attack'>" + "Use " + attackMove + "</button>"
       + "</section>"
       + "</article>";

      //Printing out pokemons
      mainPageContent.append(pokemon);
      $("#randImg1").attr("src", img);
      $(".healthbar").css("width", health + "%");

      //Show charmendars attacks
      $('#show-attack').click(function(){
        $(".hide").show();
      });

      //Attack bulbasaur function
      $("#char-attack").click(function(){

        setTimeout(function(){
          $("#left-pokemon").removeClass("attack-animation");
          $("#randImg1").removeClass("attacker-animation");
        }, 1000);

        var bulbs = $("#bulbs").text();
        newHealth = bulbs -= 10;

        $("#left-pokemon").addClass("attack-animation");
        $("#randImg1").addClass("attacker-animation");
        $("#bulbaHealth").css("width", newHealth + "%");
        $("#bulbs").text(newHealth);
        if(bulbs < 1){
          $("#left-pokemon").addClass("disabledbutton");
          $("#charsHealth").text(0);
          $("#right-pokemon").css({background: winnercolor });
          $("#right-pokemon").append("<p>WINNER!</p>");
          $("#bulbs").text(0);
        }
      });

    })//End of ajax response
    .fail(function(){
      console.log("Fail");
    })
    .always(function(){
      $('#image').hide();
      newBattle.show();
      console.log("always");
    });
  }//End of charmendar
  getFirstPokemon();
  getSecondPokemon();
  generateBattle.hide();
  versus.show();
});// End of document function
