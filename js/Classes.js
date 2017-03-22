Player = function(x,y,sizeX,sizeY,sprite){
	var self = {};
	self.drawable = Drawable(x,y,sizeX,sizeY,sprite);
	self.boundingBox = BoundingBox(x,y,sizeX,sizeY);
	self.personalStats = PersonalStats();
	self.musicianStats = MusicianStats();
	self.update = function(time, action){
		return PlayerAction(time,action,self.personalStats,self.musicianStats);
	}

	self.draw = function(ctx){
		self.drawable.draw(ctx);
	}
	return self;
}

Button = function(x,y,sizeX,sizeY,sprite, action){
	var self  = {};
	self.drawable = Drawable(x,y,sizeX,sizeY,sprite);
	self.clickable = Clickable(x,y,sizeX,sizeY,action);

	self.update = function(time,mouse){
		return self.clickable.isClicked(mouse);
	}

	self.draw = function(ctx){
		self.drawable.draw(ctx);
	}

}


ActionWindow = function(){
	var self = {};
	self.square = 0;
	self.text = 0;
	self.percentage = 0;
	return self;
}


Scene = function(){
	var self = {};
	self.player = player;
	self.sceneButtons = buttons;
	self.map = map;
	self.currentAction = "idle";

	self.update= function(time,mouse){
		for(i in self.sceneButtons){
			if(self.sceneButtons[i].update(time,mouse)){
				self.currentAction=self.sceneButtons[i].clickable.action;
			}
		}
		if(!self.player(time, self.currentAction)){
			self.currentAction="idle";
		}
	}

	self.draw =  function(ctx){
		self.map.draw(ctx);
		for(i in self.sceneButtons){
			self.sceneButtons[i].draw(ctx);
		}
		self.player.draw(ctx);
	}

}


GameScreen = function(scene){
	var self = {};
	self.scene = scene;

	return self;
}

Game =  function(player, gameScreen){
	var self = {}
	self.mouse = Mouse();
	self.player = player;
	self.activeScreen = gameScreen;
	self.canvas= document.getElementById("gameWindow");

	self.update = function(){
		self.activeScreen.update();
	}
	self.draw = function(){
		self.activeScreen.draw();
	}

}
