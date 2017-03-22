
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
