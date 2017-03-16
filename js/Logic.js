AnimationLogic= function(){
	
}

HooverLogic = function(){
	
}

ClickLogic = function(){
	
}


CheckState = function(action,personalStats){
	if(personalStats.hunger == 1 && action != "Eating"){
		return "Hungry";
	}
	if(personalStats.energy ==1 && action != "Sleeping"){
		return "Tired";
	}
	if(personalStats.money < FoodPrice && action != "Eating"){
		return "Poor";
	}
	else{
		return "Normal";
	}
}

SongWritting = function(time,personalStats,musicianStats){
	musicianStats.songBook.writeSong(musicianStats.songwritting.level, time);
	musicianStats.songwritting.gainExperience(time);
	personalStats.hunger.updateLoss(time);
	personalStats.energy.updateLoss(time);
}

Practicing = function(time,personalStats,musicianStats){
	musicianStats.songBook.practiceSong(time);
	musicianStats.musicianship.gainExperience(time);
	personalStats.hunger.updateLoss(time);
	personalStats.energy.updateLoss(time);
}
Playing = function(time,personalStats,musicianStats){
	
}
Eating = function(time,personalStats,musicianStats){
	
}
Sleeping = function(time,personalStats,musicianStats){
	
}

PlayerAction = function(time,action,personalStats,musicianStats){
	switch(action){
		case "SongWritting":
			SongWritting(time,personalStats,musicianStats);
			break;
		case "Practicing":
			Practicing(time,personalStats,musicianStats);
			break;
		case "Playing":
			Playing(time,personalStats,musicianStats);
			break;
		case "Sleeping":
			Eating(time,personalStats,musicianStats);
			break;
		case "Eating":
			Sleeping(time,personalStats,musicianStats);
			break;
		case "Action":
			
			break;
		default:
			
	}
}