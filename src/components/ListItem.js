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
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
