var score = localStorage['score'];
score = score == null ? 0 : parseInt(score);
var score_mul = 1;
const isMobile = false;

document.addEventListener('DOMContentLoaded', function() {
  $('#_score').text(score);
  let myrec = localStorage['myrec'];
  if(myrec != null){
      $('.time_rec').text(conv_s(parseInt(myrec)));
  }
  window.itemdGUI = $('#itemd');
});

function MenuLoaded(){
  $('#ui').show();
  if(window.lang != 'ru') {
    unityInstance.SendMessage('MenuCamera', 'SetEnglish');
    translateBlocks();
  }
  $('#scoreBlock').show();
}

var mustTranslate = true;
function translateBlocks(){
  if(mustTranslate){
    _translateBlocks();
    $('[engtitle]').each(function() {
      $(this).attr('title', $(this).attr('engtitle'));
    });
    $('#enghideless').hide();
    mustTranslate = false;
  }
}

function _translateBlocks(){

  if(_translateBlocks.flag){
    $('[translate]').each(function() {
      $(this).attr('translate_ru',$(this).html());
    });
    _translateBlocks.flag = false;
  }

    $('[translate]').each(function() {
      const value = $(this).attr(lang == 'ru' ? 'translate_ru':'translate');
      $(this).html(value);
    $(this).show();
  });
}

_translateBlocks.flag = true;

function setlang(l){
  window.lang = l;
  _translateBlocks();
  localStorage['savelang'] = l;

  if(l == 'ru'){
    unityInstance.SendMessage('MenuCamera', 'SetEnglish');
  } else {
    unityInstance.SendMessage('MenuCamera', 'SetRussian');
  }

  unityInstance.SendMessage('MenuCamera', 'ChangeLevel', 0);  
}

function SetCursor(cursor){
	$('canvas').css({'cursor':cursor});
}

function setHolderText(_text){
  window.itemdGUI.text(_text);
}

function setSosedName(_name){
  $('#sosedfocus ._name').text(_name);
}

function AddScore(sc){
  score+=parseInt(parseInt(sc) * score_mul);
  updscore();
  localStorage['score'] = score;

  $('#_score').fadeOut(300, function() {
    $(this).text(score).fadeIn(300);
  });
}

function SetCompitePrank(n) {
  $('#pc').fadeOut(300, function() {
    $(this).text(n).fadeIn(300);
  });

  if(parseInt(n) > 0){
    AddScore(10);
    addTemp(2);
  }
}

function SetNeedPrank(n) {
  $('.pn').fadeOut(300, function() {
    $(this).text(n).fadeIn(300);
  });
}

function SetReadyPrank(n) {
  $('#pr').fadeOut(300, function() {
    $(this).text(n).fadeIn(300);
  });

  if(parseInt(n) > 0){
    AddScore(1);
  }
}

function InventoryChange(arr) {
  arr = JSON.parse(arr);

  for(let i = 0; i < arr.length; i++) {
	 arr[i]['ItemIndex'] = i;
  }

  arr.sort(function(a, b) {
    return a.Name.length - b.Name.length;
  });

  $('#items').html('');
  for(let i = 0; i < arr.length; i++) {
    addItem(arr[i]);
  }
}

function SetLevelName(name){
  $('#levelname').html(name);
}

function SetLevelSelector(_html){
  $('#levelselector').html(_html);
}

function ShowMenu(){
  $('.overlay > .content').hide();
  $('#startgame').show();
}

function ShowLose(){
  if(Timer!=null)clearInterval(Timer);
  $('#k1').hide();

  dead_advprompt(function(){
    $('#k1').show();
    $('.overlay').show(200);
    ShowMenu();
    inMenuFlag = true;
  }, function(){
    score=parseInt(score*2);
    $('#_score').text(score);
    updscore();
  }, function(){
    unityInstance.SendMessage('MenuCamera', 'GoNext');
    unityInstance.SendMessage('Player', 'PlayerFocus');
    $('#unityContainer').focus();
    playMusic();
  });

  inMenuFlag = true;
  ResetTemp();
  pauseMusic();
  $('.overlay > .content').hide();
  $('#lose').show();
  $('.overlay').show(500);
}
