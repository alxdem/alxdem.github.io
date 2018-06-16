'use strict';

var tocContent = document.querySelector('.toc-content'); // Блок с контентом, из которого будем строить оглавление
var arrTocElements = tocContent.querySelectorAll('h2, h3'); // Массив со всем заголовками
var tocHeader = document.querySelector('.toc-header'); // Блок для вывод оглавления

// Создание элемента
var createNewElement = function(tagName, className) {
  var newElement = document.createElement(tagName);
  newElement.classList.add(className);

  return newElement;
}

// Функция создания оглавления
var tocInit = function() {
  var tocList = createNewElement('ul', 'toc-list');
  var tocTitleNumb = 1; // Порядковый номер для задания ID заголовкам в тексте

  for(var i = 0; i < arrTocElements.length; i++) {
    var tocListElement = createNewElement('li', 'toc-list-item'); // Создаем элемент списка в оглавлении
    var tocListLink = createNewElement('a', 'toc-list-link'); //Создание ссылки-якоря на заголовок
    var tocItemTag = arrTocElements[i].tagName; // Получаем тег заголовка (h2 или h3 и т. д.)
    var itemTitle = arrTocElements[i];
    var tocTitleId = 'toc-title-' + tocTitleNumb; // Задаем ID заголовкам в тексте
    itemTitle.id = tocTitleId;

    tocListElement.classList.add('toc-list-item-' + tocItemTag); // Задаем класс для стилизации, в зависимости от уровня заголовка
    tocListLink.href = '#' + tocTitleId;
    tocListLink.textContent = arrTocElements[i].textContent;

    tocListElement.appendChild(tocListLink);
    tocList.appendChild(tocListElement);

    tocTitleNumb++; // Увеличиваем порядковый номер на 1 для следующего заголовка
  }

  tocHeader.appendChild(tocList);

}

tocInit();
