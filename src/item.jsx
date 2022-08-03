import React from "react";

function Item({itemInfo: {selected, title, code, counter}, deleteItem, selectItem}) {
  const numberOfTimes=new Map()
  const number=[2,3,4,22,23,24,32,33,34]
  number.forEach(el=>numberOfTimes.set(el,el))

  return <div key={code} className='List__item'>
    <div className={'Item' + (selected ? ' Item_selected' : '')}
         onClick={selectItem}>
      <div className='Item__number'>{code}</div>
      <div className='Item__title'>{title}{counter > 0 ? ` | Выделялось ${counter} ${numberOfTimes.has(counter)?'раза':'раз'}` : ''}</div>
      <div className='Item__actions'>
        <button onClick={deleteItem}>
          Удалить
        </button>
      </div>
    </div>
  </div>
}

export default Item