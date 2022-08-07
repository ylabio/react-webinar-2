import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { categoriesNumber } from '../../utils';


function TotalPrice(props) {

  const cn = bem('TotalPrice');

  const price = props.items.reduce((sum, el) => sum + el.price * el.total, 0);

  return (
    <div className={cn('sum')}>
      {categoriesNumber(price)}
    </div>
  )
}

TotalPrice.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

TotalPrice.defaultProps = {
  items: [],
}

export default React.memo(TotalPrice);
