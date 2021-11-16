
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}



click = 0;
team = [];
id = 0;




function getPokemon(){
        click += 1;
        number = getRandomInt(899);
        $.get( "https://pokeapi.co/api/v2/pokemon/" + number  , function( data ) {
        //number = data.id;
        name = data.name ;
        experience =  data.base_experience ;
        var abilities = [];
        var types = [];
        img = data.sprites.front_default;




        for (let i = 0; i < data.types.length; i++) {


            types.push(data.types[i].type.name);
            console.log(data.types[i].type.name);

        }
        for (let i = 0; i < data.abilities.length; i++) {

            abilities.push(data.abilities[i].ability.name + '  ');
        }





          var pokemon =
                 [{
                    "number": number,
                    "name": name,
                    "abilities": abilities,
                    "types": types,
                    "img": img,
                    "experience": experience
                }];



          //console.log(pokemon);
          team.push(pokemon);



          getData(name,img, types, experience, abilities);
          if (click == 6) {
            $('.btnGo').attr('disabled',true);
              $('.listTeam').append('<h1 style="margin-top:20px;">completed!\nsave your team</h1>');
            //setTimeout(function() { alert("completed!\nsave your team"); }, 600);
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
      teamID = $('#inpName').val();
      teamID = teamID.split(' ');
      var d = new Date();
      team.push(teamID,d);

      localStorage.setItem(teamID,JSON.stringify(team));
      team = [];
      location.reload();
    }
}




$( document ).ready(function() {
  var pathname = window.location.pathname;

  if (pathname == '/team/list') {

    //console.log(jQuery.parseJSON(localStorage.getItem(localStorage.key(1))));

    for (var i = 0 ; i < localStorage.length ; i++) {

        item = jQuery.parseJSON(localStorage.getItem(localStorage.key(i)));

        teamName = item[6];
        img = [];
        experience = 0;
        types = [];
        for (var z = 0; z < item.length-2; z++) {
          //img[z] += item[z][0].img;
          img.push(item[z][0].img)

        }
        for (var z = 0; z < item.length-2; z++) {
          experience += item[z][0].experience;

        }
        for (var z = 0; z < item.length-2; z++) {
          types.push(item[z][0].types + "\n");
        }


         getTeam(teamName,img,experience,types);






    }
  }
});



function getTeam(teamName, img,experience){
  var teamcard = '<div class="col-4 colTeam text-center">'+
        '<a class="aTeam" onclick="edit(id)" id="'+teamName+'"  href="#">'+
        '<div id="Team-card">'+
			  '<h4 style="text-align:center;margin-top:5px;">'+teamName+'</h4>'+
			  '<div id="imgES">'+
        '<img id="" src="'+img[0]+'" width="96" height="96">'+
        '<img id="" src="'+img[1]+'"width="96" height="96">'+
        '<img id="" src="'+img[2]+'"width="96" height="96">'+
        '<img id="" src="'+img[3]+'"width="96" height="96">'+
        '<img id="" src="'+img[4]+'"width="96" height="96">'+
        '<img id="" src="'+img[5]+'"width="96" height="96">'+
			  '</div>'+
			  '<div class="row rowOv">'+
			    '<div class="col-6 text-center">'+
					'<h5>EXPERIENCE</h5>'+
				'</div>'+
				'<div class="col-6 text-center">'+
					'<span>'+experience+'</span>'+
				'</div>'+
			  '</div>'+
			  '<div class="row rowBott">'+
			    '<div  class="col-6 text-center">'+
					'<h5>TYPES</h5>'+
				'</div>'+
				'<div style="padding-left:0px;padding-right:20px;" class="col-6 text-center">'+
					'<span class="types" >'+types+'</span>'+
				'</div>'+
			  '</div>'+
			  '</div>'+
        '</a>'+
        '</div>';
  $(".teamlist").append(teamcard);
}





function edit(id) {
      window.location.href = 'http://localhost:3000/team/'+id+'/edit';
}




$( document ).ready(function() {
  var pathname = window.location.pathname;

  if (pathname.substring(pathname.length - 5) == '/edit') {


      editTeam();

  }

});


function editTeam(){


      var pathname = window.location.pathname;
      pathname = pathname.slice(0,-5);
      pathname = pathname.split('/').pop();
      pathname = pathname.toString();

      console.log(pathname);
      item = jQuery.parseJSON(localStorage.getItem(pathname));

      console.log(item);


      teamName = item[6];

      img = [];
      experience = 0;
      types = [];
      for (var z = 0; z < item.length-2; z++) {
        //img[z] += item[z][0].img;
        img.push(item[z][0].img)

      }
      for (var z = 0; z < item.length-2; z++) {
        experience += item[z][0].experience;

      }
      for (var z = 0; z < item.length-2; z++) {

        types.push(item[z][0].types + ' ');
      }

  var teamcard = '<div class="col-12 colTeam text-center">'+
        '<div id="Team-card" name="'+teamName+'">'+
        '<h4 id="newName" style="text-align:center;margin-top:5px;">'+teamName+'</h4>'+
        '<div id="imgES">'+
        '<img id="" src="'+img[0]+'" width="96" height="96">'+
        '<img id="" src="'+img[1]+'"width="96" height="96">'+
        '<img id="" src="'+img[2]+'"width="96" height="96">'+
        '<img id="" src="'+img[3]+'"width="96" height="96">'+
        '<img id="" src="'+img[4]+'"width="96" height="96">'+
        '<img id="" src="'+img[5]+'"width="96" height="96">'+
        '</div>'+
        '<div class="row rowOv">'+
          '<div class="col-6 text-center">'+
          '<h5>EXPERIENCE</h5>'+
        '</div>'+
        '<div class="col-6 text-center">'+
          '<span>'+experience+'</span>'+
        '</div>'+
        '</div>'+
        '<div class="row rowBott">'+
          '<div class="col-6 text-center">'+
          '<h5>TYPES</h5>'+
        '</div>'+
        '<div style="padding-left:0px;padding-right:20px;" class="col-6 text-center">'+
          '<span>'+types+'</span>'+
        '</div>'+
        '</div>'+
        '</div>'+

        '</div>';


  $(".teamlist").after(teamcard);

}



function changeName(){
  name = $('#Team-card').attr("name");
  newteamID = $('#inpChangeName').val();
  newteamID = newteamID.split(' ');

  item = jQuery.parseJSON(localStorage.getItem(name));
  item[6] = newteamID;
  $('#newName').text(newteamID);
  $('#Team-card').attr('name',newteamID);
  localStorage.setItem(newteamID,JSON.stringify(item));
  localStorage.removeItem(name);
  $('#inpChangeName').val('');
  //location.reload();


}
