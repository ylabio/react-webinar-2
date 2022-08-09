import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item({onCLickButton, price, titleButton, title, code, counter = 0}) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);
  const increaseNumber = () => {
    setCount(prevState => prevState + 1)
    console.log(price, titleButton, title, code, count)
    if (titleButton === 'добавить') {
      onCLickButton({title, code, price}, count)
    } else {
      onCLickButton(code)
    }
  }

  return (
      <div className={cn()}>
        <div className={cn('number')}>
          {code}
        </div>
        <div className={cn('info')}>
          <div className={cn('title')}>{title}</div>
          <div className={cn('price')}>{`${price} ₽`}</div>
          {counter > 0 ? <div>`${counter} шт`</div> : null}
        </div>
        <div className={cn('actions')}>
          <button onClick={increaseNumber}>
            {titleButton}
          </button>
        </div>
      </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);
