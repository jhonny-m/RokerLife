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

Position = function (positionX,positionY){
	var self = {};
	self.x= positionX;
	self.y= positionY;
	self.update = function (moveX,moveY){
		self.x += moveX;
		self.y += moveY;
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
	
}