import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { categoriesNumber } from '../../utils';


function CartFooter(props) {

  const cn = bem('Footer');

  return (
        <div className={cn('wraper')}>
          <div className={cn('name')}>
            Итого 
          </div>
          <div className={cn('price')}>
            {categoriesNumber(props.totalPrice)}
          </div>
        </div>
  );
}

export default React.memo(CartFooter);
