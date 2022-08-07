import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils/numbers";

import './style.css';

function Item(props) {
  const cn = bem('Item');

  return (
      <div className={cn()}>
          <div className={cn('number')}>
              {props.item.code}
          </div>
          <div className={cn('title')}>
              {props.item.title}
          </div>
          <div className={cn('right')}>
              {/*<div className={cn('price')}>{`${numberFormat(props.item.price,)} ₽`} </div>*/}
              <span className={cn('price')}>{numberFormat(props.item.price || 0,  )} ₽</span>
              {props.amountRender ? <span className={cn('price')}>{props.item.amount || 0} шт</span> : null}
              <button className={cn('btn')} onClick={() => props.onChange(props.item.code)}>
                  {props.btnTitle}
              </button>
          </div>
      </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
    onChange: propTypes.func,
    amountRender: propTypes.bool,
    btnTitle: propTypes.string,
};

Item.defaultProps = {
    onChange: () => {}
};

export default React.memo(Item);
