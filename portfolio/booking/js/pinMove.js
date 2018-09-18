(function () {

  var mapPinMain = document.querySelector('.map__pin--main'); // Главная метка на карте
  var CONST_PINMAIN_WIDTH = mapPinMain.clientWidth; // Ширина главной метки
  var CONST_PINMAIN_HEIGHT = mapPinMain.clientHeight; //Высота главной метки
  var mainAddressInput = document.querySelector('#address'); // Поле адреса в форме ввода

  var mapPinMainButtonMousedown = function(e) {
    e.preventDefault();

    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    var mouseMoveHandler = function(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftLeft = mapPinMain.offsetLeft - shift.x;
      var shiftTop = mapPinMain.offsetTop - shift.y;

      if(shiftLeft < 0) {
        shiftLeft = 0;
      }

      if(shiftTop < 0) {
        shiftTop = 0;
      }

      if(shiftLeft >= mapPins.offsetWidth - mapPinMain.offsetWidth) {
        shiftLeft = mapPins.offsetWidth - mapPinMain.offsetWidth;
      }

      if(shiftTop >= mapPins.offsetHeight - mapPinMain.offsetHeight - 15) {
        shiftTop = mapPins.offsetHeight - mapPinMain.offsetHeight - 15;
      }

      mapPinMain.style.top = shiftTop + 'px';
      mapPinMain.style.left = shiftLeft + 'px';
    };

    var mouseUpHandler = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler); // Обработаем перемещение мыши
    document.addEventListener('mouseup', mouseUpHandler); // Отпускание мыши
  }

  mapPinMain.addEventListener('mousedown', mapPinMainButtonMousedown); // Обработаем нажатие (без отпускания) на главную метку

  // Определяем адрес(координаты) установленной нами метки и записываем их в поле формы
  var mainAddressInputInit = function() {
    var mapPinMainX = mapPinMain.offsetLeft + CONST_PINMAIN_WIDTH / 2; // Адрес слева - половина ширины метки
    var mapPinMainY = mapPinMain.offsetTop + CONST_PINMAIN_HEIGHT / 2; // Адрес сверху - половина высоты метки
    mainAddressInput.value = mapPinMainX + ', ' + mapPinMainY;
  }


  mainAddressInputInit(); // Определяем адрес(координаты) установленной нами метки и записываем их в поле формы

  window.pinMove = {
    mainAddressInputInit: mainAddressInputInit
  };

})();
