import React from "react";

function Item({itemInfo: {selected, title, code, counter}, deleteItem, selectItem}) {

  return <div key={code} className='List__item'>
    <div className={'Item' + (selected ? ' Item_selected' : '')}
         onClick={selectItem}>
      <div className='Item__number'>{code}</div>
      <div className='Item__title'>{title}{counter > 0 ? ` | Выделялось ${counter} раз` : ''}</div>
      <div className='Item__actions'>
        <button onClick={deleteItem}>
          Удалить
        </button>
      </div>
    </div>
  </div>
}

export default Item