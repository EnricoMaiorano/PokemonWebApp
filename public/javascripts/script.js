
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


click = 0;
team = [];
id = 0;




function getPokemon(){
      click += 1;

        $.get( "https://pokeapi.co/api/v2/pokemon/"+   Math.floor(Math.random() * 899), function( data ) {
        number = data.id;
        name = data.name ;
        experience =  data.base_experience ;
        var abilities = [];
        var types = [];
        img = data.sprites.front_default;
        for (let i = 0; i < data.types.length; i++) {
            //abilities  += data.abilities[i].ability.name;
            types.push(data.types[i].type.name);
        }
        for (let i = 0; i < data.abilities.length; i++) {
            //abilities  += data.abilities[i].ability.name;
            abilities.push(data.abilities[i].ability.name + '  ');
        }


          //var pokemon = [number, name, abilities, types, img, experience];
          var pokemon =
                 [{
                    "number": number,
                    "name": name,
                    "abilities": abilities,
                    "types": types,
                    "img": img,
                    "experience": experience
                }];


          //id = id + 1;

          team.push(pokemon);
          getData(name,img, types, experience, abilities);
          if (click == 6) {
            $('.btnGo').attr('disabled',true);
            setTimeout(function() { alert("completed!\nsave your team"); }, 600);
            $('.btnSave').attr('disabled',false);
          }

        });











}


function getData(name, img, types, experience, abilities) {

  var card = "<div id='card' style='margin-top:50px;'>"+
              "<h4 style='text-align:center;margin-top:5px;'>"+ name +"</h4>"+"<div id='pkAdd'>"+"<img id='imgPK' src='"+img+"'>"+"</div>"+"<div class='row rowAtt'>"+"<div class='col-6 text-center'>"+
              "<h5>TYPES</h5>"+"</div>"+"<div class='col-6 text-center'>"+"<span>"+types+"</span>"+"</div>"+"</div>"+"<div class='row rowAtt'>"+"<div class='col-6 text-center'>"+"<h5>EXPERIENCE</h5>"+"</div>"+"<div class='col-6 text-center'>"+
              "<span>"+experience+"</span>"+"</div>"+"</div>"+"<div class='row rowAtt'>"+"<div class='col-6 text-center'>"+"<h5>ABILITIES</h5>"+"</div>"+"<div class='col-6 text-center abilities'>"+"<span>"+abilities+"</span>"+"</div>"+
              "</div>";

  $(".listTeam").after(card);
  $("#card").hide().fadeIn("slow");

}





function saveTeam(){

  if($('#inpName').val() == ''){
     alert('Insert Name');
   }else{
      nameTeam = $('#inpName').val();
      team.unshift(nameTeam);
      localStorage.setItem('team',JSON.stringify(team));
      team = [];
      location.reload();
    }
}
