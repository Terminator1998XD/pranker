var MusEnable = true;
var UserMusEnable = true;
var MusVolume = 0.3;

function setVolume(vol){
  MusVolume = vol;
  if(mus instanceof Audio)mus.volume = vol;
}

var music = [];
for(let i = 1; i < 7; i++) music.push('music/'+i+".mp3");

var currentMusic = 0;

function curmusic(){
	return music[currentMusic];
}

function nextMusic(){
	currentMusic++;

	if(currentMusic >= music.length){
		currentMusic = 0;
	}

	playMusic();
}

function playMusic(){
	let _m = curmusic();

	if(!(_m instanceof Audio)){
		_m = new Audio(_m);
		_m.volume = MusVolume;
		_m.addEventListener("ended", nextMusic);
		music[currentMusic] = _m;
	}

	if(MusEnable && UserMusEnable)_m.play();
}

function pauseMusic(){
		let mus = curmusic();
		if(mus instanceof Audio)mus.pause();
}
