var ysdk = null;
var inMenuFlag = true;

function InitVKSDK(){
	console.log('VK SDK begin initialized');

	const queryString = window.location.search.slice(1);
  if (!queryString) {
      return {};
  }

  const paramsArray = queryString.split('&');
  window.paramsObject = {};

  paramsArray.forEach(param => {
      const [key, value] = param.split('=');
      paramsObject[key.toLowerCase()] = value.toLowerCase();
  });

	if (typeof iframeApi === 'undefined') {
			console.log('Cannot find iframeApi function, are we inside an iframe?');
			return;
	}

	iframeApi({
			appid: 33275,
			getLoginStatusCallback: function(status) {},
			userInfoCallback: function(info) {console.log(info);},
			adsCallback: adsCallback
	}).then(function(api){
		window.ysdk = api;
		console.log('VK SDK initialized');
		window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		if(localStorage['savelang'] != null) {
			window.lang = localStorage['savelang'];
		}
		else window.lang = paramsObject.lang == 'ru_ru' ? 'ru' : 'en';//ysdk.environment.i18n.lang;
		}
	}, function(code){
		console.log(code);
	});
}

InitVKSDK();

function updscore(){

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


	function adsCallback(data){
	  console.log(data);
	  if(adsCallback.onClose != null) adsCallback.onClose();
	  if(adsCallback.onRewarded != null) adsCallback.onRewarded();
	}

	var adv = {
	  showFullscreenAdv: function(info){
	    let cb = info.callbacks;
	    adsCallback.onClose = cb.onClose;
	    adsCallback.onRewarded = cb.onRewarded;
	    ysdk.showAds({interstitial: true});
	  },
	  showRewardedVideo: function(info){
	    let cb = info.callbacks;
	    adsCallback.onClose = cb.onClose;
	    adsCallback.onRewarded = cb.onRewarded;
	    ysdk.showAds({interstitial: false});
	  }
	}

function yabanner(end){

	window['MusEnable'] = false;
	pauseMusic();
  advInScr = true;
  unityInstance.SendMessage('MenuCamera', 'PreBanner');
  $('video').each(function() {
	  this.pause();
	});

  adv.showFullscreenAdv({callbacks: {onClose: function(){
		window['MusEnable'] = true;
	  unityInstance.SendMessage('MenuCamera', 'PostBanner');
	  end();
	  advInScr = false;
	}}});
}

var advInScr = false;

function yarbanner(reward,end){
	window['MusEnable'] = false;

  advInScr = true;
  unityInstance.SendMessage('MenuCamera', 'PreBanner');
  $('video').each(function() {
	  this.pause();
	});

  adv.showRewardedVideo({callbacks: {
	  onRewarded:reward,
	  onClose: function(){
		unityInstance.SendMessage('MenuCamera', 'PostBanner');
		window['MusEnable'] = true;
		end();
		advInScr = false;
	}}});
}
