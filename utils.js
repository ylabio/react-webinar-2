/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @return {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);
  // Назначение атрибут и свойств
  for (const name of Object.keys(props)) {
    switch (name) {
      // Свойства
      case 'id':
      case 'className':
      case 'textContent':
      case 'onclick':
        element[name] = props[name];
        break;
      // Всё остальное это атрибуты, например href у ссылки
      default:
        element.setAttribute(name, props[name]);
    }
  }
  // Вставка подчиненных узлов
  for (let child of children) {
     element.append(child);
  }
  return element;
}


/**
 * Рендер приложения в указанный элемент DOM
 * @param root {HTMLElement} Элемент DOM куда вставить app
 * @param app {HTMLElement} Элемент приложения
 */
export function render(root, app){
  // Удаляем содержимое root
  while (root.lastElementChild) {
    root.removeChild(root.lastElementChild);
  }
  // Вставляем новое
  root.append(app);
}

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
