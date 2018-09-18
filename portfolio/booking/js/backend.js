(function() {

  var URLGet = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URLGet);
    xhr.send();
  }

  // Функция отправки данных на сервер
  var URLPush = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
/*
    if (xhr.readyState == 4) {
      console.log('Запрос завершен!');
    } else {
      console.log('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }*/
/*
    xhr.addEventListener('load', function () {
      if(xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });*/

    xhr.open('POST', URLPush);

    xhr.setRequestHeader('Content-type', 'multipart/form-data');

    /*
    xhr.onreadystatechange = function () {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        console.log('Запрос завершен!');
      } else {
        console.log('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    }
    */

    xhr.addEventListener('load', function () {
      if(xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });

    xhr.send(data);
  };

})();
