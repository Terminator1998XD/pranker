var ui_playclick_lock = false;
function ui_playclick(){
  if(!ui_playclick_lock)
  {
	  ui_playclick_lock = true;
    _advprompt = [];
	  yabanner(function(){
		ui_playclick_lock = false;
		showLesson(function(){
		  inMenuFlag = false;
		  unityInstance.SendMessage('MenuCamera', 'Play');
      AddScore(1);
		  playMusic();
		  $('#unityContainer').focus();
		},true);
	  });
  }
}

var lessonEndCallback;
function showLesson(lessonEnd,check){//если check == true, значит если пользователь видел обучение скипаем

  if(check && localStorage['lesson'] != null || window.lang != 'ru'){
    lessonEnd();
    return;
  }

  $('#lsw').hide();
  lessonEndCallback=lessonEnd;
  $('.overlay > .content').hide();
  $('#lesson').show();
  localStorage['lesson'] = true;
}

function lessonEnd(){
  $('video').each(function() {
    this.pause();
  });
  $('#lesson').hide();
  $('#lsw').show();
  lessonEndCallback();
}

function conv_s(seconds){
  let m = parseInt(seconds / 60);
  let s = parseInt(seconds % 60);
  if(m < 10) m = '0'+m;
  if(s < 10) s = '0'+s;
  return m + ":" + s;
}

var Timer = null;
var Timer_Seconds = 0;

function Timer_Tick(){
  if (document.visibilityState === "hidden") return;
  Timer_Seconds++;
  $('#time').fadeOut(100, function() {
    $(this).text(conv_s(Timer_Seconds)).fadeIn(100);
  });
}

function TimerGo(){
  Timer_Seconds = 0;
  Timer = setInterval(Timer_Tick, 1000);
}

function TimerContinue(){
  Timer = setInterval(Timer_Tick, 1000);
}

function Win(){
  if(Timer!=null)clearInterval(Timer);

  $('#time2').text(conv_s(Timer_Seconds));

  let myrec = localStorage['myrec'];
  if(myrec != null){
    myrec = parseInt(myrec);
    if(myrec > Timer_Seconds){
      localStorage['myrec'] = Timer_Seconds;
      $('.time_rec').text(conv_s(Timer_Seconds));
    }
    else $('.time_rec').text(conv_s(myrec));
  }
  else{
    localStorage['myrec'] = Timer_Seconds;
    $('.time_rec').text(conv_s(Timer_Seconds));
  }

  $('#k1').show();
  inMenuFlag = true;
  pauseMusic();
  AddScore(100);
  $('.overlay > .content').hide();
  $('#win').show();
  $('.overlay').show(500);
  ResetTemp();
}

function changeLevel(to){
  yabanner(function(){
    unityInstance.SendMessage('MenuCamera', 'ChangeLevel',to);
  });
}

function ItemSelect(index){
  unityInstance.SendMessage('Player','ItemSelectGUI',parseInt(index));
  $('#unityContainer').focus();
}

function PlayerFocus(){
  unityInstance.SendMessage('Player', 'PlayerFocus');
  $('#unityContainer').focus();
}

function SosedFocus(){
  unityInstance.SendMessage('Player', 'SosedFocus');
  $('#unityContainer').focus();
}

function addItem(item){
  item.Name = item.Name.replace(' ', '&nbsp;');
  let itemDiv = $('<div class="item">').html('<img src="items/'+item.Texture+'"</img>'+item.Name).attr('title',item.holder).hover(function(){
    window.itemdGUI.text($(this).attr('title'));
  }).mouseout(function(){
    window.itemdGUI.text(lang == 'ru' ? "Инвентарь" : "Inventory");
  }).click(function(){
    ItemSelect(this.ItemIndex);
    $('.itemselect').addClass("item").removeClass('itemselect');
    $(this).addClass('itemselect').removeClass('item');
    $('#unityContainer').focus();
  });
  itemDiv[0].ItemIndex = item.ItemIndex;

  $('#items').append(itemDiv);
}
