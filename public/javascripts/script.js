
/**
 *
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 *
 */
Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 *
 */
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

var click = 0;
team = [];
id = 0;

/**
 *
 */
function getPokemon(){
    click ++;
    if (click == 6) {
      //$('.btnGo').removeAttr("onclick");
      $('.btnGo').attr('disabled', true);
      $('.listTeam').append('<h1 style="margin-top:20px;">completed!\nsave your team</h1>');
      $('.btnSave').attr('disabled',false);

    }

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
          team.push(pokemon);


          getData(name,img, types, experience, abilities);

        });
}

function getData(name, img, types, experience, abilities) {
    var card = "<div id='card' style='margin-top:50px;'>"+
                "<h4 style='text-align:center;margin-top:5px;'>"+ name +"</h4>"+"<div id='pkAdd'>"+"<img id='imgPK' src='"+img+"'>"+"</div>"+"<div class='row rowAtt'>"+"<div class='col-6 text-center'>"+
                "<h5>TYPES</h5>"+"</div>"+"<div class='col-6 text-center'>"+"<span>"+types+"</span>"+"</div>"+"</div>"+"<div class='row rowAtt'>"+"<div class='col-6 text-center'>"+"<h5>EXPERIENCE</h5>"+
                "</div>"+"<div class='col-6 text-center'>"+"<span>"+experience+"</span>"+"</div>"+"</div>"+"<div class='row rowAtt'>"+"<div class='col-6 text-center'>"+"<h5>ABILITIES</h5>"+"</div>"+
                "<div class='col-6 text-center abilities'>"+"<span>"+abilities+"</span>"+"</div>"+"</div>";
    $(".listTeam").after(card);
    $("#card").hide().fadeIn("fast");
}

/**
 *
 */
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

function showAll(){




  $(".teamlist").empty();
  $(".btnFilt").removeClass('active');
  $("#showAll").addClass( "active" );
  if ($(".btnFilt").hasClass("active") == false) {
    $(".btnFilt").css("background-color", "#ffc107");
  }


  if (localStorage.length === 0) {
      $('.teamlist').empty();
      $('.teamlist').append('<h1 style="text-align: center;">no team found</h1>');
      return;

  }
var pathname = window.location.pathname;

var data = {};
var teams2 = [];
for (var i = 0; i < localStorage.length; i++) {

  t = jQuery.parseJSON(localStorage.getItem(localStorage.key(i)));
  teams2[i] = t;
  data[t[7]] = t;

}




teams2.sort(function(a,b){

return new Date(b[7]) - new Date(a[7]);
});
teams2.reverse()


if (pathname == '/team/list') {



  vrb = 0;
  alltypes = [];
  for (var i = 0 ; i < teams2.length ; i++) {

      teamName = teams2[i][6];
      img = [];
      experience = 0;
      types = [];
      types2 = [];
      for (var j = 0; j < 6; j++) {
          img.push(teams2[0 + vrb][j][0].img);
      }
      for (var s = 0; s < 6; s++) {
          experience += teams2[0 + vrb][s][0].experience;
      }
      for (var x = 0; x < 6; x++) {
          types.push(teams2[0 + vrb][x][0].types + "\n");
          types2.push(teams2[0 + vrb][x][0].types);
      }
      alltypes[i] = types2;

      getTeam(teamName,img,experience,types,filtrer);
      vrb += 1;
  }

}
}


/**
 *
 */
$( document ).ready(function() {

  var pathname = window.location.pathname;
  if (pathname == '/team/list') {
  $.get( "https://pokeapi.co/api/v2/type/"  , function( data ) {

    //  alltypes = [];
      for (var i = 0; i < data.results.length; i++) {
        //alltypes[i] = data.results[i].name;
        $('#myBtnContainer').append('<button class="btnFilt" id="'+data.results[i].name+'"  onclick="getFiltrer(id)">'+ data.results[i].name + '</button>')
      }

  });

  showAll();
}
});

/**
 *
 */
function getTeam(teamName, img,experience,types){



  var teamcard = '<div class="col-4 colTeam text-center">'+
        '<a class="aTeam" onclick="edit(id)" id="'+teamName+'"  href="#">'+
        '<div id="Team-card">'+
			  '<h4 style="text-align:center;margin-top:5px;">'+teamName+'</h4>'+
			  '<div id="imgES">'+
        '<img id="" src="'+img[0]+'"width="96" height="96">'+
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
					'<span class="types" >'+types+'</br></span>'+
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
      item = jQuery.parseJSON(localStorage.getItem(pathname));
      teamName = item[6];
      img = [];
      experience = 0;
      types = [];
      for (var i = 0; i < item.length-2; i++) {
        img.push(item[i][0].img);
      }
      for (var s = 0; s < item.length-2; s++) {
        experience += item[s][0].experience;
      }
      for (var j = 0; j < item.length-2; j++) {
        types.push(item[j][0].types + ' ');
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


/**
 *
 */
function changeName(){

  allName = [];

  for (var i = 0; i < localStorage.length; i++) {

    t = jQuery.parseJSON(localStorage.getItem(localStorage.key(i)));
    allName[i] = t[6].toString();

    //console.log(t[6]);
  }




    name = $('#Team-card').attr("name");
    newteamID = $('#inpChangeName').val();
    oldname = $('#newName').text();
    if (newteamID == ""  ) {
        alert("insert name");
        return;
    }else if ( oldname == newteamID ) {
      alert("Insert new name");
      return;
    }else if (allName.includes(newteamID)) {
        alert('Name already exist!');
        return;
    }



    newteamID = newteamID.split(' ');
    item = jQuery.parseJSON(localStorage.getItem(name));
    item[6] = newteamID;
    $('#newName').text(newteamID);
    $('#Team-card').attr('name',newteamID);
    localStorage.setItem(newteamID,JSON.stringify(item));
    localStorage.removeItem(name);
    $('#inpChangeName').val('');
    location.href = '/team/'+newteamID+'/edit';
}


function getFiltrer(id){

  if (localStorage.length == 0) {
      $('.teamlist').empty();
      $('.teamlist').append('<h1 style="text-align: center;">no team found</h1>');

  }else

  $(".teamlist").empty();
  $(".btnFilt").removeClass('active');
  $("#"+id).addClass( "active" );
  if ($(".btnFilt").hasClass("active") == false) {
    $(".btnFilt").css("background-color", "#ffc107");
  }
  //$("#"+id).css("background-color", "red");
  var data = {};
  var teams2 = [];
  for (var i = 0; i < localStorage.length; i++) {

    t = jQuery.parseJSON(localStorage.getItem(localStorage.key(i)));
    teams2[i] = t;
    data[t[7]] = t;

  }


  teams2.sort(function(a,b){

  return new Date(b[7]) - new Date(a[7]);
});
  teams2.reverse()

  vrb = 0;
  alltypes = [];
  new1 = [];


  for (var i = 0; i < teams2.length; i++) {


    teamName = teams2[i][6];
    img = [];
    experience = 0;
    types = [];
    types2 = [];
    for (var j = 0; j < 6; j++) {
        img.push(teams2[i + vrb][j][0].img);
    }
    for (var s = 0; s < 6; s++) {
        experience += teams2[i + vrb][s][0].experience;
    }
    for (var x = 0; x < 6; x++) {
        types.push(teams2[i + vrb][x][0].types + "\n");
        types2.push(teams2[i + vrb][x][0].types);
    }

//////////////////////////////////////////////////////////////

    for (var x = 0; x < 6; x++) {
        alltypes.push(teams2[i][x][0].types);

    }


    for (var s = 0; s < alltypes.length; s++) {

      if (alltypes[s].includes(id) == true) {
          getTeamFiltrered(teamName, img,experience,types);
          break;
      }else {}
    }

    alltypes = [];

  }


    if (  $(".teamlist").is(':empty')) {
          $('.teamlist').append('<h1 style="text-align: center;">no team found</h1>');
    }



}


function getTeamFiltrered(teamName, img,experience,types){



  var teamcard = '<div id="filtered" class="col-4 colTeam text-center">'+
        '<a class="aTeam" onclick="edit(id)" id="'+teamName+'"  href="#">'+
        '<div id="Team-card">'+
			  '<h4 style="text-align:center;margin-top:5px;">'+teamName+'</h4>'+
			  '<div id="imgES">'+
        '<img id="" src="'+img[0]+'"width="96" height="96">'+
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
					'<span class="types" >'+types+'</br></span>'+
				'</div>'+
			  '</div>'+
			  '</div>'+
        '</a>'+
        '</div>';



  $(".teamlist").append(teamcard);

}
