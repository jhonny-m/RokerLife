Vector2D = function(x,y){
	var self = {};
	self.x= x;
	self.y= y;
	self.update = function (nextX,nextY){
		self.x = nextX;
		self.y = nextY;
	}
	return self;
}

Mouse = function(){
	var self = {};
	self.position = Vector2D(0,0);
	self.click = false;
}

Animation = function(position,size,sprite){
	var self = {};
	self.currentPosition = Vector2D(position.x,position.y);
	self.size = Vector2D(size.x,size.y);
	self.sprite = sprite;
	
	self.draw = function(position,ctx){
		ctx.drawImage(self.sprite,self.currentPosition.x,self.currentPosition.y,self.size.x,self.size.y,position.x,position.y);
	}
	
	self.changeFrame = function(frameNumber){
		self.currentPosition.x = self.originalPosition.x + self.size.x * frameNumber;
	}
	self.changeRow = function(rowNumber){
		self.currentPosition.y = self.originalPosition.y + self.size.y * rowNumber;
	}
	return self;
}

Drawable = function(x,y,sizeX,sizeY,sprite){
	var self = {};
	self.position = Vector2D(x,y);
	self.size = Vector2D(sizeX,sizeY);
	self.animation = Animation(Vector2D(0,0),self.size,sprite);
	return self;
}

Clickable = function(x,y,sizeX,sizeY,action){
	var self = {};
	self.position = Vector2D(x,y);
	self.size = Vector2D(sizeX,sizeY);
	self.action = action;
	self.previusClick = false;
	
	self.isClicked = function(mouse){
		// If the mouse is over, and its the first frame it clicked
		if(InsideBox(self.position,self.size,mouse.position)&& mouse.click && !self.previousClick){
			self.previousClick = true;
			return false;
		}
		// if the mouse is over, and released a previusClick
		else if(InsideBox(self.position,self.size,mouse.position)&& !mouse.click && self.previousClick){
			self.previousClick = false;
			return true;
		}
		// if the mouse in no longer over 
		else if (!InsideBox(self.position,self.size,mouse.position)){
			self.previousClick = false;
			return false;
		}
		//mouse was previousClick but has not released yet
		else{
			return false;
		}
	}
	
	return self;
}

PersonalStats = function(){
	var self ={}
	self.hunger = HealthStat("hunger",BaseHungerLossRate,BaseHungerGainRate);
	self.energy = HealthStat("energy",BaseEngergyLossRate,BaseEnergyGainRate);
	self.money = StartingMoney;
	return self;
}

MusicianStats = function(){
	var self ={}
	self.musicianship = Stat();
	self.songwritting = Stat();
	self.charisma = Stat();
	self.fame = Stat();
	self.songBook= SongBook();
	return self;
}


Alerts = function(alertText){
		
}

DrawLayer = function(layerData, ctx, mapSize, tileSize,sprite){
	var spriteSize = Vector2D(sprite.width/tileSize.x, sprite.height/tileSize.y);
	for(i=0; i<layerData.length; i++){
		if (layerData[i]!=0){
			var spritePosition = Vector2D(((layerData[i]-1)% spriteSize.x)*tileSize.x, ~~((layerData[i]-1)/ spriteSize.x)*tileSize.x)
			var canvasPosition = Vector2D((i % mapSize.x)*tileSize.x, ~~(i/ mapSize.x)*tileSize.y);
			ctx.drawImage(sprite,spritePosition.x,spritePosition.y,tileSize.x,tileSize.y,canvasPosition.x,canvasPosition.y,tileSize.x,tileSize.y);
		}
		
	}
}

Map = function(backgroundLayer, foregroundLayer,tileSize,mapSize,sprite){
	var canvas = document.createElement('canvas');
	canvas.width = mapSize.x;
	canvas.height = mapSize.y;
	var ctx = canvas.getContext("2d");
	DrawLayer(backgroundLayer,ctx, mapSize,tileSize);
	DrawLayer(foregroundLayer,ctx, mapSize,tileSize);
	return canvas;
}

Stat = function (){
	var self = {};
	self.level = StartLevel;
	self.currentExperience = 0;
	self.experienceRate = ExperienceRate;
	self.nextLevelPercentage = 0.0;
	
	self.gainExperience = function(time){
		self.currentExperience += self.experienceRate * time;
		self.checkLevel();
		self.calculateNextLevelPercentage();		
	}
	self.checkLevel = function(){
		while(true){
			var nextLevelXP = ExperinceConstant * Math.pow((self.level+1),2) - ExperinceConstant * (self.level+1);
			if (self.currentExperience >= nextLevelXP){
				self.level++;
			}
			else {
				break;
			}
		}
	}
	self.calculateNextLevelPercentage= function(){
		var currentLevelXP = ExperinceConstant * Math.pow(self.level,2) - ExperinceConstant * self.level;
		var nextLevelXP = ExperinceConstant * Math.pow((self.level+1),2) - ExperinceConstant * (self.level+1);
		self.nextLevelPercentage = (self.currentExperience-currentLevelXP) / (nextLevelXP-currentLevelXP);
	}
	return self;
}

HealthStat = function(name,lossRate,gainRate){
	var self = {};
	self.maxStat = BaseHealthStat;
	self.currenStat = BaseHealthStat;
	self.statLossRate = 0;
	self.statGainRate = 0;
	self.statPercentage = 1.0;
	self.statLossRate = lossRate;
	self.statGainRate = gainRate;
	
	self.updatePercentage = function(){
		self.statPercentage = self.currenStat / self.maxStat;
	}
	
	self.updateLoss = function(time){
		self.currenStat -= self.statLossRate * time;
		if (self.currenStat < 1){
			self.currenStat=1;
		}
		self.updatePercentage();
	}
	self.updateGain = function(time){
		self.currenStat += self.statGainRate * time;
		if (self.currenStat > self.maxStat){
			self.currenStat=self.maxStat;
		}
		self.updatePercentage();
	}
	return self;
}

Clock = function(){
	var self = {};
	self.day = 1;
	self.hours =0;
	self.percentage = 0.0;
	self.dayLenght = DayLenght;
	self.updatePercentage = function(){
		self.percentage = self.hours/ self.dayLenght;
	}
	
	self.update = function(time){
		self.hours += time;
		while(true){
			if (self.hours >= self.dayLenght){
				self.day++;
				self.hours -= self.dayLenght;
			}
			else
				break;
		}
		self.updadePercentage();
	}
	return self;
}

Song = function(name,statLevel){
	var self = {};
	self.name = name;
	self.progress =0;
	self.practice =0;
	self.maxProgress =BaseSongLenght + StatLevelSongLenght * statLevel;
	
	self.updateWritting = function(time){
		self.progress += time;
		if (self.progress>self.maxProgress){
			self.progress = self.maxProgress;
		}
 	}
	
	self.updatePractice = function(time){
		self.practice += time;
		if (self.practice>self.maxProgress){
			self.practice = self.maxProgress;
		}
 	}
	
	self.isFullyWritten = function(){
		if( self.progress >= self.maxProgress)
				return true;
		else
			return false;
	}
	
	self.isFullyPracticed = function(){
		if( self.practice >= self.maxProgress)
				return true;
		else
			return false;
	}
	return self;
}

BoundingBox = function(x,y,sizeX,sizeY){
	var self = {}
	self.up = Vector2D(x + sizeX/2, y); 
	self.down = Vector2D(x + sizeX/2, y+sizeY); 
	self.left = Vector2D(x , y + sizeY/2); 
	self.right = Vector2D.x + sizeX, y + sizeY/2); 

	return self;
}


InsideBox = function(box, size, dot){
	if ((box.x <= dot.x && box.x+size.x >= dot.x) && (box.y <= dot.y && box.y+size.y >= dot.y)){
		return true;
	} 
	else{
		return false;
	}
}	

SongBook = function(){
	var self = {};
	self.songs = [];
	self.name = "Song number "
	self.songsWritten = 0;
	self.songsPracticed = 0;
	self.writeSong = function(level,time){
		if(self.songsWritten==self.songs.length){
			self.songs[self.songsWritten]= Song(self.name + self.songsWritten, level);
		}
		self.songs[self.songsWritten].updateWritting(time);
		if(self.songs[self.songsWritten].isFullyWritten){
			self.songsWritten++;
		}
	}
	self.practiceSong = function(time){
		if(self.songsWritten>self.songsPracticed){
			self.songs[self.songsPracticed].updatePractice(time);
			if(self.songs[self.songsPracticed].isFullyPracticed())
				self.songsPracticed++;
		}
	}
	
	return self;
}

LiveShow = function(size){
	var self = {}
	
}

DrawVerticalBar = function(position, size, percentage, color, ctx){
	ctx.fillStyle="Grey";
	ctx.fillRect(position.x,position.y,size.x,size.y);
	ctx.fillStyle=color;
	ctx.fillRect(position.x,(position.y + size.y - size.y * percentage),size.x,(size.y*percentage));
}

DrawHorizontalBar = function(position, size, percentage, color, ctx){
	ctx.fillStyle="Grey";
	ctx.fillRect(position.x,position.y,size.x,size.y);
	ctx.fillStyle=color;
	ctx.fillRect(position.x,position.y,(size.x*percentage),size.y);
}

//var canvas = document.getElementById('gameWindow');
//var ctx = canvas.getContext('2d');

