var ysdk = null;
var inMenuFlag = true;

function InitYaSDK(){
	console.log('Yandex SDK begin initialized');
  if(window['YaGames'] != null)	YaGames
    .init()
    .then(ysdk => {
        console.log('Yandex SDK initialized');
        window.ysdk = ysdk;
				window.lang = ysdk.environment.i18n.lang;

				if(ysdk.deviceInfo._type != null) ysdk.getFlags().then(flags => {
				  window.score_mul_flag = parseFloat(flags.scoremul);
				});
    });
}

InitYaSDK();

function updscore(){
	if(window['ysdk']!=null)
	  ysdk.getLeaderboards()
	  .then(lb => {
		lb.setLeaderboardScore('lead', parseInt(score));
	  });
	  else console.log("ysdk == null");
}

document.addEventListener("visibilitychange", function() {
	  if (document.visibilityState === "hidden") {
			unityInstance.SendMessage('MenuCamera', 'PreBanner');
			$('video').each(function() {
			  this.pause();
			});
			window['MusEnable'] = false;
			pauseMusic();
	  }
	  else if(!advInScr){
			unityInstance.SendMessage('MenuCamera', 'PostBanner');
			window['MusEnable'] = true;
			if(!inMenuFlag)playMusic();
	  }
	});

function setSize() {
    var unityContainer = document.getElementById("unityContainer");
    unityContainer.style.width = window.innerWidth + "px";
    unityContainer.style.height = window.innerHeight + "px";
  }

function yabanner(end){

	if(window['ysdk']==null){
		window['MusEnable'] = true;
				end();
		return;
	}

	window['MusEnable'] = false;
	pauseMusic();
  advInScr = true;
  unityInstance.SendMessage('MenuCamera', 'PreBanner');
  $('video').each(function() {
	  this.pause();
	});

  ysdk.adv.showFullscreenAdv({callbacks: {onClose: function(){
		window['MusEnable'] = true;
	  unityInstance.SendMessage('MenuCamera', 'PostBanner');
	  end();
	  advInScr = false;
	}}});
}

var advInScr = false;

function yarbanner(reward,end){
	window['MusEnable'] = false;
	pauseMusic();
	if(window['ysdk']==null){
		window['MusEnable'] = true;
		end();
		return;
	}

  advInScr = true;
  unityInstance.SendMessage('MenuCamera', 'PreBanner');
  $('video').each(function() {
	  this.pause();
	});

  ysdk.adv.showRewardedVideo({callbacks: {
	  onRewarded:reward,
	  onClose: function(){
		unityInstance.SendMessage('MenuCamera', 'PostBanner');
		window['MusEnable'] = true;
		end();
		advInScr = false;
	}}});
}
