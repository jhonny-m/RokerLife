var StartLevel = 1;
var ExperienceRate= 0.01;
var ExperinceConstant = 100;
var MaxLevel = 100;
var BaseHealthState=100;
var BaseHungerLossRate= 0.02;
var BaseEnergyLossRate= 0.01;
var BaseHungerGainRate= 0.5;
var BaseEnergyGainRate= 0.1;
var StartingMoney = 100;
var DayLenght = 20*1000;
var BaseSongLenght = 5000;
var StatLevelSongLenght = 500;


Position = function(positionX,positionY){
	var self = {};
	self.x= positionX;
	self.y= positionY;
	self.update = function (moveX,moveY){
		self.x += moveX;
		self.y += moveY;
	}
	return self;
}

ObjectSprite = function(spritePositionX,spritePositionY,sizeX,sizeY,sprite){
	var self = {};
	self.spritePosition=Position(spritePositionX,spritePositionY);
	self.size = Position(sizeX,sizeY);
	self.sprite = sprite;
	
	self.draw = function(position){
		ctx.drawImage(self.sprite,self.spritePosition.x,self.spritePosition.y,self.size.x,self.size.y,position.x,position.y)
	}
	
	self.changeSpritePosition = function(){
		
	}
	
	return self;
}

Stat = function (name){
	var self = {};
	self.name = name;
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

HealthState = function(name){
	var self = {};
	self.maxState = BaseHealthState;
	self.currenState = BaseHealthState;
	self.stateLossRate = 0;
	self.stateGainRate = 0;
	self.statePercentage = 1.0;
	if(name=="hunger"){
		self.stateLossRate = BaseHungerLossRate;
		self.stateGainRate = BaseHungerGainRate;
	}
	else{
		self.stateLossRate = BaseEnergyLossRate;
		self.stateGainRate = BaseEnergyGainRate;
	}
	
	self.updatePercentage = function(){
		self.statePercentage = self.currenState / self.maxState;
	}
	
	self.updateLoss = function(time){
		self.currenState -= self.stateLossRate * time;
		if (self.currenState < 1){
			self.currenState=1;
		}
		self.updatePercentage();
	}
	self.updateGain = function(time){
		self.currenState += self.stateGainRate * time;
		if (self.currenState > self.maxState){
			self.currenState=self.maxState;
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

SongBook = function(){
	var self = {};
	self.songs = [];
	self.name = "Song number "
	self.songsWritten = 0;
	self.songsPracticed = 0;
	self.writeSong = function(level,time){
		if(self.songsWritten==self.songs.length){
			self.newSong(level);
		}
		self.songs[self.songsWritten].updateWritting(time);
		if(self.songs[self.songsWritten].isFullyWritten){
			self.songsWritten++;
		}
	}
	
	self.newSong = function(level){
		self.songs[self.songsWritten]= Song(self.name + self.songsWritten, level);
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

// lala = SongBook();
// lala.writeSong(1,10000);
// lala.writeSong(1,10000);
// lala.practiceSong(10000);
// lala.practiceSong(10000);
// console.log(lala.songs);