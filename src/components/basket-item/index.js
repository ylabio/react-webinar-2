import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

import { formatNumber } from '../../utils';
import './style.css';

function Item({item, callback}) {
  const cn = bem('Item');

  return (
    <div className={cn({'selected': item.selected})}>
        <div className={cn('number')}>
            {/* {item.count ? serialNumber : item.code} */}
            {item.code}
            {/* {item.code} */}
        </div>

        <div className={cn('title')}>
            {item.title}
        </div>

        <div className={cn('price')}>
            {formatNumber(item.price) + " ₽"}
        </div>

        <div className={cn('count')}>
            {formatNumber(item.count) + " шт"}
        </div>

        <div className={cn('actions')}>
          <button onClick={() => callback(item)}>
            Удалить
          </button>
        </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  callback: propTypes.func.isRequired
}

export default React.memo(Item);
