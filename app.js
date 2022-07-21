import {counter, createElement} from './utils.js';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {HTMLElement} DOM всей страницы.
 */
function App({store}) {
  // Выбор состояния из store
  const {items} = store.getState();

  return (
    createElement('div', {className: 'App'},
      createElement('div', {className: 'App__head'},
        createElement('h1', {textContent: 'Приложение на чистом JS'}),
      ),
      createElement('div', {className: 'Controls'},
        createElement('button', {
          textContent: 'Добавить',
          onclick: () => {
            const code = counter();
            store.createItem({code, title: `Новая запись ${code}`})
          }}),
      ),
      createElement('div', {className: 'App__center'},
        createElement('div', {className: 'List'},
          // Перебираем записи и на каждую возвращаем элемент
          ...items.map(item =>
            createElement('div', {className: 'List__item'},
              createElement('div', {
                  className: 'Item' + (item.selected ? ' Item_selected' : ''),
                  onclick: () => store.selectItem(item.code)
                },
                createElement('div', {className: 'Item__number', textContent: item.code}),
                createElement('div', {className: 'Item__title', textContent: item.title}),
                createElement('div', {className: 'Item__actions'},
                  createElement('button', {
                    textContent: 'Удалить',
                    onclick: () => store.deleteItem(item.code)
                  }),
                )
              )
            )
          )
        )
      )
    )
  );
}

export default App;
