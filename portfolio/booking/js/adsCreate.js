(function () {

  // Функция создания элементов на карте
  var adsCreate = function(adsArr) {
    var fragment = document.createDocumentFragment(); // Создаем фрагмент для вывода всех меток

    adsArr.forEach(function(item, idx) {
      fragment.appendChild(window.util.markGenerate('map__pin', item.location.x, item.location.y, item.author.avatar, item.offer.title, 'mark' + idx)); // Помещаем все метки во фрагмент
    });

    mapPins.appendChild(fragment); // Вставляем фрагмент в блок с картой
  }


  // Функция создания блока объявления с данными и вывод его на экран
  var adBlockCreate = function(targetNumb, arrData) {
    var adBlockElement = window.util.elementCreate('article', 'map__card');
    adBlockElement.classList.add('popup');

    var adBlockElementClose = window.util.elementCreate('button', 'popup__close'); // Кнопка закрыть
    adBlockElementClose.setAttribute('type', 'button');
    adBlockElementClose.textContent = 'Закрыть';

    adBlockElement.appendChild(adBlockElementClose);

    var adBlockElementAvatar = avatarCreate(arrData[targetNumb].author.avatar, arrData[targetNumb].offer.title, 70, 70); // Аватар
    adBlockElement.appendChild(adBlockElementAvatar);

    var adBlockElementTitle = window.util.elementCreate('h3', 'popup__title'); // Заголовок
    adBlockElementTitle.textContent = arrData[targetNumb].offer.title;

    adBlockElement.appendChild(adBlockElementTitle);

    var adBlockElementAddress = window.util.elementCreate('p', 'popup__text'); // Адрес
    adBlockElementAddress.classList.add('popup__text--address');
    adBlockElementAddress.textContent = arrData[targetNumb].offer.address;
    adBlockElement.appendChild(adBlockElementAddress);

    var adBlockElementPrice = window.util.elementCreate('p', 'popup__text'); // Цена
    adBlockElementPrice.innerHTML = arrData[targetNumb].offer.price + ' &#x20bd;<span>/ночь</span>';
    adBlockElement.appendChild(adBlockElementPrice);

    var adBlockElementType = window.util.elementCreate('h4', 'popup__type'); // Тип жилья
    adBlockElementType.textContent = arrData[targetNumb].offer.type;
    adBlockElement.appendChild(adBlockElementType);

    var adBlockElementGuests = window.util.elementCreate('p', 'popup__text'); // Для гостей
    adBlockElementGuests.classList.add('popup__text--capacity');
    adBlockElementGuests.textContent = arrData[targetNumb].offer.rooms + ' комнаты для ' + arrData[targetNumb].offer.guests + ' гостей';
    adBlockElement.appendChild(adBlockElementGuests);

    var adBlockElementTime = window.util.elementCreate('p', 'popup__text'); // Время заезда/выезда
    adBlockElementTime.classList.add('popup__text--time');
    adBlockElementTime.textContent = 'Заезд после ' + arrData[targetNumb].offer.checkin + ', выезд до ' + arrData[targetNumb].offer.checkout;
    adBlockElement.appendChild(adBlockElementTime);

    var adBlockElementFeatures = window.util.elementCreate('ul', 'popup__features'); // Фичи
    var adBlockElementFeaturesArr = arrData[targetNumb].offer.features;
    for( var i = 0; i < adBlockElementFeaturesArr.length; i++) {
      var adBlockElementFeaturesItem = window.util.elementCreate('li', 'popup__feature'); // Создание элемента списка
      adBlockElementFeaturesItem.classList.add('popup__feature--' + adBlockElementFeaturesArr[i]);
      adBlockElementFeatures.appendChild(adBlockElementFeaturesItem);
    }
    adBlockElement.appendChild(adBlockElementFeatures);

    var adBlockElementDescription = window.util.elementCreate('p', 'popup__description'); // Описание
    adBlockElementDescription.textContent = arrData[targetNumb].description;
    adBlockElement.appendChild(adBlockElementDescription);

    var adBlockElementPhotos = window.util.elementCreate('div', 'popup__photos'); // Фотографии квартиры
    for(var i = 0; i < arrData[0].offer.photos.length; i++) {
      var adBlockElementPhotosItem = window.util.elementCreate('img', 'popup__photo'); // Фотографии квартиры
      adBlockElementPhotosItem.setAttribute('width', '45');
      adBlockElementPhotosItem.setAttribute('height', '40');
      adBlockElementPhotosItem.setAttribute('alt', 'Фотография жилья');
      adBlockElementPhotosItem.setAttribute('src', arrData[targetNumb].offer.photos[i]);
      adBlockElementPhotos.appendChild(adBlockElementPhotosItem);
    }

    adBlockElement.appendChild(adBlockElementPhotos);


    map.insertBefore(adBlockElement, mapFiltersContainer); // Вставляем элемент в map перед mapFiltersContainer

    // Кнопка Закрыть на открывшемся окне о доме
    var adBlockCloseBtnHandler = function(e) {
      e.preventDefault();
      var target = e.target;
      while (target !== map) {
        if (target.tagName === 'BUTTON') {
          target.parentNode.remove();
        }
        target = target.parentNode;
        return;
      }

    }

    var adBlockCloseBtns = document.querySelectorAll('.popup__close'); // Созданные кнопки закрыть
    adBlockCloseBtns.forEach(function(itemBtn){
      itemBtn.addEventListener('click', adBlockCloseBtnHandler);
    });

  }

  // Функция создания аватара
  var avatarCreate = function(avatarUrl, adsTitle, avatarWidth, avatarHeight) {
    var adsImg = window.util.elementCreate('img'); // Создаем img для аватара метки
    adsImg.width = avatarWidth;
    adsImg.height = avatarHeight;
    adsImg.src = avatarUrl;
    adsImg.draggable = false;
    adsImg.setAttribute('alt', adsTitle);

    return adsImg;
  }

  window.adsCreate = {
    adsCreate: adsCreate,
    adBlockCreate: adBlockCreate,
    avatarCreate: avatarCreate
  };

})();
