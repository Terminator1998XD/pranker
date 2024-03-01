function setTemp(tempVar){
  tempVar = 100-(((42.0 - tempVar) / (42.0 - 34.6))*100);
  _setTemp(tempVar);

  $('#thermometerText').text(String(temp).substring(0,4));

  let score_mul2 = parseInt((6.0-(42.0-temp)));
  if(score_mul == score_mul2) return;
  score_mul = Math.max(score_mul2,1);
  $('#mulsc').fadeOut(150, function() {
    $(this).text(score_mul).fadeIn(150);
  });
}

let gradients = [
  ['#237686',0],
  ['#34476f',10],
  ['#5b426c',20],
  ['#965666',30],
  ['#ba835c',40],
  ['#d0c746',50],
  ['#e74c3c',90]
]
function _setTemp(temperature) {
  let inner = document.querySelector('#thermometer');
  // Ограничиваем значения температуры от 0 до 100 (можно изменить по необходимости)
  temperature = Math.max(0, Math.min(100, temperature));
  // Вычисляем ширину для внутреннего элемента на основе значения температуры
  var background = "linear-gradient(to top";

  for(let i = 0; i < gradients.length; i++){
    let g = gradients[i];
    if(temperature >= g[1]){
      background+=","+g[0]+" "+g[1]+"%";
    }
    else{
      background+=", "+g[0]+" "+(temperature)+"%";
           background+=", #a09ea2 "+g[1]+"%";
       break;
     }
  }

  // Применяем новую ширину
  inner.style.background = background + ')';
}

var tempInterval = null;
var temp = 36.6;

document.addEventListener('DOMContentLoaded', function() {
  setTemp(temp);
});

function ResetTemp(){
  if(tempInterval != null){
    clearInterval(tempInterval);
	tempInterval = null;
  }
  temp = 36.6;
  setTemp(36.6);
}

function addTemp(grad){
  temp += grad;
  if(temp > 42.0) temp = 42.0;
  if(tempInterval == null){
    tempInterval = setInterval(clearTemp,2000);
  }
  setTemp(temp);
}

function clearTemp(){
  temp -= 0.1;
  if(temp < 36.7){
    clearInterval(tempInterval);
    tempInterval = null;
  }
  setTemp(temp);
}
