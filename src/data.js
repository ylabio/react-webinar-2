import { counter } from './utils.js';

const titles = ['Название элемента', 'Некий объект', 'Заголовок', 'Короткое название', 'Запись', 'Пример выделенной записи', 'Седьмой'];

const items = titles.map(title => {
  return {
    code: counter(),
    title,
    selected: false,
    timesSelected: 0
  }
});

items[5].selected = true;
items[5].timesSelected++;

export default items;