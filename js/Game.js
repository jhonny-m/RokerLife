var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
//temp
ctx.fillStyle=grey;
ctx.fillRect(0, 0,width, height);
ctx.fillStyle=red;
ctx.fillRect(width/2-100, height/2-100,200, 200);
ctx.fillStyle = yellow;
ctx.font = "20px Lucida Console"
ctx.fillText("Rocker Life",width/2-45, height/2-10);
ctx.fillText("In Development",width/2-70, height/2+10);
//


imageLoader= function(sources,array){
	for(i  in sources){
		totalAssets++;
		var img = new Image();
		img.src= sources[i];
		array[i]=img;
		array[i].onload = function(){
			loadedAssets++;
		}
	}
	checkLoad();

}
checkLoad = function(){
	if(loadedAssets==totalAssets){
		game= newGame();
		requestAnimationFrame(GameLoop);
	}
	else{
		setTimeout(checkLoad,50);
	}
}

NewGame = function(){
  var player = Player(100,100,32,80,sprites.player);
  var buttons = [
    Button(300,20,90,30,sprites.practice,"Practicing");
    Button(300,50,90,30,sprites.songwritting,"SongWritting");
    Button(300,80,90,30,sprites.playing,"Playing");
  ]
  var map = 
  var scene = Scene(player,buttons);

}

GameLoop = function() {

}


var sprites;
var game;
imageLoader(sources,sprites);
