//Variables for the snakes and the ladders.
// Lengths MUST match!
snakes_trigger = [98, 95, 93, 87, 64, 62, 56, 49, 48, 16];
snakes_result =  [78, 75, 73, 24, 60, 19, 53, 11, 26, 6];
ladder_trigger = [80, 71, 51, 36, 21, 9, 4, 2];
ladder_result = [100, 91, 67, 28, 84, 31, 14, 38];

var players = new Array();
var currentPlayer = 0;

function Player(player_name, color){
  this.player_name = player_name;
  this.color = color;
  this.position = 1;
}

function shifter(position){
  var info = document.getElementById('info');
  for (var i in snakes_trigger){
    if (position == snakes_trigger[i]){
      info.className += "alert-danger";
      info.innerHTML = "Yikes! Hit a snake there! Back to " + snakes_result[i];
      return snakes_result[i];
    }
  }
  for (var j in ladder_trigger){
    if (position == ladder_trigger[j]){
	info.className = "alert-success";    
      info.innerHTML = "A ladder! Climb to " + ladder_result[j];
      return ladder_result[j];
    }
  }
  return position;

}

function addPlayer(playername, playercolor){
  info = document.getElementById('info'); 
  if (playername != ""){
    for( j in players){
      if (playername == players[j].player_name){
	info.className = "alert-warning";
        info.innerHTML = playername + " already taken. Please use a different name."
        return false;
      }
        
    }
    thisPlayer = new Player(playername, playercolor);
    thisPlayer.playerNumber = players.length + "player";
    players.push(thisPlayer);
    thisPlayer.nameslot = document.getElementById("player" + players.length);
    thisPlayer.nameslot.innerHTML = thisPlayer.player_name;
    thisPlayer.nameslot.style.color = thisPlayer.color;
    info.className = "alert-success";
    info.innerHTML = thisPlayer.player_name + " added.";
    for (var i = 1; i <= 100; ++i){
      cell = document.getElementById('position' + i);
      cell.innerHTML += '<div id = "' + thisPlayer.playerNumber + i + '" class = "gamePiece" style = "background:' + thisPlayer.color + ';" id=piece_' + i + '' + number + '"></div>';
    }
    document.getElementById(thisPlayer.playerNumber + '1').style.visibility = "visible";
      
    if (players.length == 4)
      moveToGame();

  }
  else{
    info.innerHTML = "Player name must be at least one character long";
    return false;
  }
  return true;
}

function addFormPlayer(){
  var playername = document.getElementById('playername').value;
  var playercolor = document.getElementById('playerColor');  
  var color = playercolor.options[playercolor.selectedIndex].value;
  addPlayer(playername, color);
}

function drawShifts(){
  for (i = 1; i <= 100; ++i){
    for (j in snakes_trigger){
      if (i == snakes_trigger[j])
        document.getElementById('position' + i).innerHTML = "Snake to " + snakes_result[j];
    
    }
    for (k in ladder_trigger){
      if (i == ladder_trigger[k])
        document.getElementById('position' + i).innerHTML = "Ladder to " + ladder_result[k];
    
    }
  }
}

function moveToGame(){
  info = document.getElementById('info');
  if (players.length > 1){
    drawShifts();
    document.getElementById('playerEntry').style.visibility = "hidden";
    document.getElementById('dice').style.visibility = "visible";
    document.getElementById('playForMeBtn').style.visibility = "visible";
    info.innerHTML = "Click the dice to start the game.";
  }
  else{
    info.innerHTML = "You need at least two players to start the game.";
  }
}

function loadDefaults(){
  defaults = new XMLHttpRequest();
  defaults.open("GET","default_players.xml", false);
  defaults.send();
  defaultsDoc= defaults.responseXML;
  player = defaultsDoc.getElementsByTagName("player");
  
  for (var i = 0; players.length < 4 ; ++i){
    player_name = player[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    player_color = player[i].getElementsByTagName("color")[0].childNodes[0].nodeValue;
    addPlayer(player_name, player_color);
  }
    
}

function playForMe(){
  while(takeTurn());
}

function takeTurn(){
  var info = document.getElementById('info');
  info.innerHTML = "";
  var roll = Math.round((Math.random() * 10 % 5) + 1); //roll a six sided dice
  document.getElementById('dice').innerHTML = roll;

  var thisTurn = document.getElementById('player' + currentPlayer);
  if (currentPlayer != 0){
    thisTurn.style.listStyleType="none";
    thisTurn.innerHTML = players[currentPlayer - 1].player_name ;
  }
  
  if (currentPlayer == players.length)
    currentPlayer = 0;  

  currentPlayer = currentPlayer + 1;
  current = players[currentPlayer - 1];
  
  if ( current.position + roll <= 100){
    document.getElementById(current.playerNumber + current.position).style.visibility = "hidden";
    current.position = shifter(current.position + roll);
    document.getElementById(current.playerNumber + current.position).style.visibility = "visible";
  }
  else
    info.className = "alert";
    info.innerHTML = current.player_name + " rolled " + roll + " which is over 100 so " + current.player_name + " will stay put!"

  thisTurn = document.getElementById('player' + currentPlayer);
  thisTurn.style.listStyleType="circle";
  thisTurn.innerHTML = current.player_name + ": " + current.position;

  if (current.position == 100){
    info.innerHTML = current.player_name + " wins!";
    document.getElementById('dice').style.visibility = "hidden";
    return false;
    
  }
  
  return true;
}
