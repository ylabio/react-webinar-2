import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Item({onCLickButton, price, titleButton, title, code, count,place}) {
  const cn = bem('Item');

  const increaseNumber = () => {
    onCLickButton(code)
  }

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {place}
      </div>
      <div className={cn('info')}>
        <div className={cn('title')}>{title}</div>
        <div className={cn('info_price')}>
          <div className={cn('price')}>{`${price.toLocaleString('ru')} ₽`}</div>
          {count && <div className={cn('amount')}>{`${count} шт`}</div>}
        </div>
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
  items: propTypes.arrayOf(propTypes.object).isRequired,
  price:propTypes.number,
  titleButton:propTypes.string,
  title:propTypes.string,
  code:propTypes.string,
  count:propTypes.number,
  place:propTypes.number,
  onCLickButton: propTypes.func
}

Item.defaultProps = {
  items: [],
  price:0,
  titleButton:'',
  title:'',
  code:'',
  count:0,
  place:0
}



export default React.memo(Item);
