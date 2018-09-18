(function () {

  // Похожие объявления неподалеку
  var adArr = [];

  // Массив названий объявлений
  var adItemTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  // Массив с типами квартир
  var adType = ['palace', 'flat', 'house', 'bungalo'];

  // Массив со временем заезда
  var adTimeIn = ['12:00', '13:00', '14:00'];

  // Массив фич в номере
  var adFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Массив фотографий
  var adPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // Функция генерации объявлений. adArrGenerationNumb - текущий номер
  var adItemGeneration = function(adItemGenerationNumb) {
    var locationX = window.util.numbGenerate(300, 900); //случайное число, координата x метки на карте от 300 до 900
    var locationY = window.util.numbGenerate(150, 500) //случайное число, координата y метки на карте от 150 до 500
    var adItem = {
      'author': {
        'avatar': 'img/avatars/user0' + adItemGenerationNumb + '.png' //строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },

      'offer': {
        'title': adItemTitle[adItemGenerationNumb - 1],//строка, заголовок предложения, одно из фиксированных значений 'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'. Значения не должны повторяться.
        'address': locationX + ', ' + locationY,//строка, адрес предложения, представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
        'price': window.util.numbGenerate(1000, 1000000),//число, случайная цена от 1000 до 1 000 000
        'type': adType[window.util.numbGenerate(0, adType.length)], //строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        'rooms': window.util.numbGenerate(1, 6), //число, случайное количество комнат от 1 до 5
        'guests': window.util.numbGenerate(1, 10), //число, случайное количество гостей, которое можно разместить
        'checkin': adTimeIn[window.util.numbGenerate(0, adTimeIn.length)], //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        'checkout': adTimeIn[window.util.numbGenerate(0, adTimeIn.length)], //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        'features': arrRandomValue(adFeatures, 1), //массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
        'description': '', //пустая строка,
        'photos': arrRandomValue(adPhotos) //массив из строк 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg' и 'http://o0.github.io/assets/images/tokyo/hotel3.jpg' расположенных в произвольном порядке
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    }
    adArr.push(adItem);
  }

  // Выбираем несколько случайных значений из массива. В скобках - массив, с которым работаем. И type - если 0, то работаем со всем массивом, если 1 - то со случайным кол-вом элементов
  var arrRandomValue = function(arr, type) {
    var sortArr = arr.sort(window.util.compareRandom);
    var sortArrFinish = sortArr;
    if (type) {
      var arrRandomLength = window.util.numbGenerate(1, arr.length); // Берем случайную длину массива
      var sortArrFinish = sortArr.slice(0, arrRandomLength);
    }

    return sortArrFinish;
  }

  // Функция генерации объявлений. adCount - кол-во генерируемых объявлений
  var adArrGeneration = function(adCount) {

    for (var i = 1; i <= adCount; i++) {
      adItemGeneration(i);
    }
  }

  adArrGeneration(8); // Функция генерации объявлений. adCount - кол-во генерируемых объявлений

  window.adsGenerate = {
    adArr: adArr
  };

})();
