(function () {

  //Генерируем случайное число в диапазоне
  var numbGenerate = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Функция создания элемента
  var elementCreate = function(elTag, elClass) {
    var newElement = document.createElement(elTag);

    if (elClass) {
      newElement.classList.add(elClass);
    }

    return newElement;
  }

  // Функция сортировки
  var compareRandom = function(a, b) {
    return Math.random() - 0.5;
  }

  // Функция создания 1-й метки
  var markGenerate = function(markButtonClass, markButtonX, markButtonY, avatarUrl, adsTitle, markId) {
    var adsItemElement = window.util.elementCreate('button', markButtonClass);
    adsItemElement.style.left = markButtonX + 25 + 'px';
    adsItemElement.style.top = markButtonY + 70 + 'px';
    adsItemElement.appendChild(window.adsCreate.avatarCreate(avatarUrl, adsTitle, 40, 40));
    adsItemElement.id = markId;

    return adsItemElement;
  }


  // Функция создания всплывающего сообщения
  var popupCreate = function (message) {
    var body = document.querySelector('body');
    var screenHeigth = document.documentElement.clientHeight;
    var popupElement = elementCreate('div', 'popup-block');
    var popupElementCloseBtn = elementCreate('button', 'popup-block-close');
    popupElementCloseBtn.addEventListener('click', function(e) {
      e.preventDefault;

      target = e.target;
      target.parentNode.remove();
    });
    popupElement.textContent = message;

    popupElement.appendChild(popupElementCloseBtn);

    body.appendChild(popupElement);

    var popupElementHeight = popupElement.offsetHeight; // Высота элемента
    var popupElementTop = (screenHeigth - popupElementHeight) / 2;
    console.log('popupElementTop: ' + popupElementTop);
    popupElement.style.top = popupElementTop + 'px';
  };

  window.util = {
    numbGenerate: numbGenerate,
    elementCreate: elementCreate,
    compareRandom: compareRandom,
    markGenerate: markGenerate,
    popupCreate: popupCreate
  };

})();
