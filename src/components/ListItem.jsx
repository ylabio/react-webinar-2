import React from 'react'

function ItemList({ item, store }) {
  const [state, setState] = React.useState(0)
  const counter = () => setState(state + 1)

  const changeText = (count, firstWord, secondWord) => {
    const num = count % 10
    let text = firstWord

    if (count >= 11 && count <= 21) {
      text = firstWord
    } else if (num >= 2 && num <= 4) {
      text = secondWord
    }
    return `${count}${' '}${text}`
  }
  return (
    <div key={item.code} className='List__item'>
      <div
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => store.selectItem(item.code)}>
        <div className='Item__number'>{item.code}</div>
        <div onClick={counter} className='Item__title'>
          {item.title}{' '}
          {state > 0 ? (
            <span className='Item__count'>| Выделялся {changeText(state, 'раз', 'раза')}</span>
          ) : null}
        </div>
        <div className='Item__actions'>
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default ItemList
