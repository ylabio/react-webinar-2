/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/** 
 * Проверка и улучшение отображения модалки
 * @param isActive
 */ 
export function checkModalDesign(isActive = false){
  if (!isActive) {
    document.body.style.overflowY = "auto";
    return;
  }

  const modalClassList = document.getElementsByClassName('Modal')[0].classList;
  const contentClassList = document.getElementsByClassName('Modal-content')[0].classList;

  // если контент переполнен, то модифицируем стили
  if (document.getElementsByClassName('Modal-content')[0].offsetHeight > window.innerHeight - 60) {
    modalClassList.add('Modal-overfilled');
    contentClassList.add('Modal-content-overfilled');
    document.body.style.overflowY = "hidden";
  } else {
    modalClassList.remove('Modal-overfilled');
    contentClassList.remove('Modal-content-overfilled');
    document.body.style.overflowY = "auto";
  }
}