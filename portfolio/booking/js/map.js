'use strict';

var map = document.querySelector('.map'); // Блок вокруг карты
var mapFiltersContainer = document.querySelector('.map__filters-container'); // Блок с фильтром
var mapPins = document.querySelector('.map__pins'); // Блок с картой и метками
var adForm = document.querySelector('.ad-form'); // Форма под картой
var adFormFieldsets = adForm.querySelectorAll('fieldset'); // Все fieldset в форме
var mapPinMain = document.querySelector('.map__pin--main'); // Главная метка на карте

var roomNumber = document.querySelector('#room_number'); // Поле с кол-вом комнат
var capacityNumber = document.querySelector('#capacity'); // Поле с кол-вом гостей

var successHandler = function (flatData) {
  var newData = flatData;
  window.newData = newData;
  console.log('newData: ' + newData);
};

var errorHandler = function () {
  console.log('Ошибка');
};

window.load(successHandler, errorHandler); // Загрузка данных с сервера

// Функция блокировки полей в форме. В state передаем состояние: true - блокируем форму, false - разблокируем
var adFormBloked = function(state) {
  if (state){
    for(var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].setAttribute('disabled', 'disabled');
    }
  } else {
    for(var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].removeAttribute('disabled', 'disabled');
    }
  }

}

adFormBloked(1);


// Функция закрытия попапа с информацией объявления
var adBlockClose = function () {
  var adBlocks = document.querySelectorAll('.map__card');

  for(var i = 0; i < adBlocks.length; i ++) {
    adBlocks[i].remove();
  }
}


// Клик по метке на карте
var mapPinClickButton = function(e) {
  var targetPin = e.target;
  while (targetPin !== mapPins) {
    if(targetPin.tagName === 'BUTTON'){

      adBlockClose();

      var targetPinNumb = targetPin.id.slice(4, 6); // Получаем номер объекта
      window.adsCreate.adBlockCreate(targetPinNumb, window.newData);

      return;
    }

    targetPin = targetPin.parentNode;
  }

}

// Обработчик клика по меткам на карте
var mapPinsInit = function() {
  var mapPinsItems = document.querySelectorAll('.map__pin'); // Все метки на карте
  // Вешаем обработчик на все метки, кроме главной
  mapPinsItems.forEach(function(item){
    if(!item.classList.contains('map__pin--main')) {
      item.addEventListener('click', mapPinClickButton);
    }
  });
}

// Клик по главной метке
var mapPinMainButtonClick = function() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormBloked(0);
  window.adsCreate.adsCreate(window.newData); // Функция создания элементов на карте
  window.pinMove.mainAddressInputInit(); // Определяем адрес(координаты) установленной нами метки и записываем их в поле формы
  mapPinsInit(); // Обработчик клика по меткам на карте
}


mapPinMain.addEventListener('mouseup', mapPinMainButtonClick); // Опускание мыши

// Выводим подсказку для пользователя о неправильности заполнения поля (текущее поле, сообщение)
var inputMessagePush = function(item, message) {
  item.setCustomValidity(message); // Установим сооющение об ошбике
}

// Проверка кол-ва комнат и гостей (чтобы не комнат не оказалось меньше, чем гостей)
var roomNumberChangeHandler = function() {

  var roomNumberValue = roomNumber.value;

  for(var i = capacityNumber.length - 1; i >= 0; i--) {
    if(capacityNumber[i].value > +roomNumberValue) { // Ставим плюс перед roomNumberValue, чтобы преобразовать в число (100 - читало как строку)
      capacityNumber[i].setAttribute('disabled', 'disabled');
      capacityNumber.value = '0';

      inputMessagePush(capacityNumber, 'Уточните количество гостей');
      capacityNumber.reportValidity();
    } else {
      capacityNumber[i].removeAttribute('disabled');
      inputMessagePush(capacityNumber, ''); // Удаляем сообщение об невалидности поля, иначе не даст отправить форму
    }
  }

}

var capacityNumberChangeHandler = function() {
  if(capacityNumber.checkValidity() == false) {
    console.log('validity');
    inputMessagePush(capacityNumber, ''); // Удаляем сообщение об невалидности поля, иначе не даст отправить форму
  }
}

roomNumber.onchange = roomNumberChangeHandler;
capacityNumber.onchange = capacityNumberChangeHandler;


// Отправка данных формы
var onSuccess = function (data) {
  console.log('Данные из формы отправленны');
};

var onError = function (data) {
  console.log('Ошибка!');

  window.util.popupCreate('Произошла ошибка на сервере. Данные не отправлены.');

};

adForm.addEventListener('submit', function (e) {
  e.preventDefault();

  window.upload(new FormData(adForm), onSuccess, onError);

});
