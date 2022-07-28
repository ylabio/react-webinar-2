import React from 'react';

function ListItem({item, store}) {
  return (
    <div key={item.code} className="List__item">
      <div
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => store.selectItem(item.code)}
      >
        <div className="Item__number">{item.code}</div>
        <div className="Item__title">
          {item.title}{' '}
          {item.numberOfSelections && (
            <span className="Item__number-of-selections">
              | Выделялся {item.numberOfSelections}
              {item.numberOfSelections > 1 && item.numberOfSelections < 5
                ? ' раза'
                : ' раз'}
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
