Player = function(x,y,sizeX,sizeY,sprite){
	var self = {};
	self.drawable = Drawable(x,y,sizeX,sizeY,sprite);
	self.boundingBox = BoundingBox(x,y,sizeX,sizeY);
	self.personalStats = PersonalStats();
	self.musicianStats = MusicianStats();


	

	
	self.update = function(time, action){
		
	}
	
	self.draw = function(ctx){
		
	}
	return self;
}

Button = function(x,y,sizeX,sizeY,sprite){
	var self  = {};
	self.drawable = Drawable(x,y,sizeX,sizeY,sprite);
	self.boundingBox = BoundingBox(x,y,sizeX,sizeY);
	self.clickable = Clickable(x,y,sizeX,sizeY,action);
	
	self.update = function(time){
		
	}
	
	self.draw = function(ctx){
		
	}
	
}


ActionWindow = function(){
	
}


Scene = function(){
	var self = {};
	self.player = player;
	self.sceneButtons = buttons;
	self.map = map;
	self.currentAction = "idle";
	
	self.update= function(){
		
	}
	
	self.draw =  function(){
		
	}
}

GameScreen = function(){
	
}

Game =  function(){
	var self = {}
	self.mouse = Mouse();
}