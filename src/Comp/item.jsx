import React from 'react'
import '../style.css';

export const Item = (props) => {
  return (
    <div key={props.code} className='List__item'>
      <div type={'text'} className={'Item' + (props.selected ? ' Item_selected' : '')}
        onClick={() => props.store.selectItem(props.code)}>
        <div className='Item__number'>{props.code}</div>
        <div className='Item__title'>{props.title}
          <span>
            {
              props.counter > 0
                ?
                <span> | Выделялось {props.counter} раз(а)</span>
                :
                ''
            }
          </span>
        </div>
        <div className='Item__actions'>
          <button onClick={() => props.store.deleteItem(props.code)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
