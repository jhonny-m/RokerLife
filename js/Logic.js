AnimationLogic= function(){

}

HooverLogic = function(){

}

ClickLogic = function(){

}

SongWritting = function(time,personalStats,musicianStats){
	var songs = musicianStats.songBook.songsWritten;
	musicianStats.songBook.writeSong(musicianStats, time);
	musicianStats.songwritting.gainExperience(time);
	if ( musicianStats.songBook.songsWritten!= songs){
		return false;
	}
	else {
		 return true;
	}
}

Practicing = function(time,personalStats,musicianStats){
	var songs = musicianStats.songBook.songsPracticed;
	musicianStats.songBook.practiceSong(time);
	musicianStats.musicianship.gainExperience(time);
	if ( musicianStats.songBook.songsWritten!= songs){
		return false;
	}
	else {
		 return true;
	}
}
Playing = function(time,personalStats,musicianStats,size){
	var number =	musicianStats.showBook.showsPlayed;
	musicianStats.showBook.playShow(size, musicianStats,time);
	musicianStats.charisma.gainExperience(time);
	if (number != musicianStats.showBook.showsPlayed){
		var show = musicianStats.showBook.shows[number];
		var fameExp= show.audience * show.quality;
		musicianStats.fame.gainExperience(FameRate*fameExp);
		return false;
	}
	else {
		return true;
	}
}


PlayerAction = function(time,action,personalStats,musicianStats){
	switch(action){
		case "SongWritting":
			return SongWritting(time,personalStats,musicianStats);
			break;
		case "Practicing":
			return Practicing(time,personalStats,musicianStats);
			break;
		case "Playing":
			return Playing(time,personalStats,musicianStats);
			break;
		case "Action":
			break;
		default:
			return true;
	}
}
