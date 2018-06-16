var switchBtnArr = document.querySelectorAll('.portfolio-switch-btn'); // Кнопки переключения типов работ в портфолио
var portfolioItemArr = document.querySelectorAll('.portfolio-item'); // Все элементы портфолио

// Обработчик клика по кнопке переключателя типов работ в портфолио
var switchBtnClickHandler = function(e) {
  var target = e.target.id; // Получаем id нажатого элемента
  var switchType = target.slice(12); // Получаем тип, оставляя только цифру
  var switchTypeName = 'portfolio-item-' + switchType;

  var timeout = 0;
  for (var i = 0; i < portfolioItemArr.length; i++) {
    portfolioItemArr[i].classList.add('noactive');
    if (portfolioItemArr[i].classList.contains(switchTypeName)) {
      setTimeout(
        (function (n) {
          return function() {
            portfolioItemArr[n].classList.remove('noactive');
          }
        })(i)
        ,
        timeout
      );
      timeout += 150;

    } else {
      portfolioItemArr[i].classList.add('noactive');
    }
  }

}

// Обработчик клика по кнопке "Показать все"
var switchBtnAllClickHandler = function() {
  var timeout = 0;

  for (var i = 0; i < portfolioItemArr.length; i++) {
    portfolioItemArr[i].classList.add('noactive');
    setTimeout(
      (function (n) {
        return function() {
          portfolioItemArr[n].classList.remove('noactive');
        }
      })(i)
      ,
      timeout
    );
    timeout += 150;
  }
}

// Выделяем активный переключатель
var switchBtnStateClickHandler = function(e) {
  for (var i = 0; i < switchBtnArr.length; i++) {
    switchBtnArr[i].classList.remove('active');

    var target = e.target;
    target.classList.add('active');
  }
}

switchBtnArr[0].addEventListener('click', switchBtnAllClickHandler); // Кнопка "Показать все"

for (var i = 1; i < switchBtnArr.length; i++) {
  switchBtnArr[i].addEventListener('click', switchBtnClickHandler);
}

// Выделяем активный переключатель
for (var i = 0; i < switchBtnArr.length; i++) {
  switchBtnArr[i].addEventListener('click', switchBtnStateClickHandler);
}


