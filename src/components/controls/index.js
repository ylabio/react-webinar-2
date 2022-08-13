import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import BasketSimple from '../basket-simple';
import './style.css';

function Controls({onHomeClick, onBasketOpen, sum, amount, text}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <Link className={cn('toHome')} to={'/'} onClick={onHomeClick}>
        {text.home}
      </Link>
      <BasketSimple sum={sum} amount={amount} onOpen={onBasketOpen} text={text} />
    </div>
  );
}

Controls.propTypes = {
  onHomeClick: propTypes.func.isRequired,
  onBasketOpen: propTypes.func.isRequired,
  text: propTypes.object.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
};

Controls.defaultProps = {};

export default React.memo(Controls);
