import React from 'react'
import '../style.css';
import plural from 'plural-ru'

export const Item = (props) => {

  const deleteItem = (e,code) => {
    e.stopPropagation()
    props.store.deleteItem(code)

  }
  return (
    <div key={props.code} className='List__item'>
      <div type={'text'} className={'Item' + (props.selected ? ' Item_selected' : '')}
        onClick={() => props.store.selectItem(props.code)}>
        <div className='Item__number'>{props.code}</div>
        <div className='Item__title'>{props.title}
          <span>
            {
              props.counter > 0 && ` | Выделялось ${plural(props.counter,'%d раз', '%d раза', '%d раз')}`
               
            }
          </span>
        </div>
        <div className='Item__actions'>
          <button onClick={(e) => deleteItem(e,props.code)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
