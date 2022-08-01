import React from 'react';
import plural from 'plural-ru';

function ListItem({item, store}) {
  let numberOfSelectionsPlural;
  if (item.numberOfSelections) {
    numberOfSelectionsPlural = plural(
      item.numberOfSelections,
      'раз',
      'раза',
      'раз'
    );
  }

  const handleDeleteItem = event => {
    event.stopPropagation();
    store.deleteItem(item.code);
  };

  return (
    <div key={item.code} className="List__item">
      <div
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => store.selectItem(item.code)}
      >
        <div className="Item__number">{item.code}</div>
        <div className="Item__title">
          {item.title}{' '}
          {!!item.numberOfSelections && (
            <span className="Item__number-of-selections">
              | Выделялся {item.numberOfSelections} {numberOfSelectionsPlural}
            </span>
          )}
        </div>

        <div className="Item__actions">
          <button onClick={handleDeleteItem}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
