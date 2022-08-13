import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import BasketSimple from '../basket-simple';
import './style.css';

function Controls({local, onHomeClick, onBasketOpen, sum, amount}) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <Link className={cn('toHome')} to={'/'} onClick={onHomeClick}>
        {local.common.homeLink}
      </Link>
      <BasketSimple sum={sum} amount={amount} onOpen={onBasketOpen} local={local} />
    </div>
  );
}

Controls.propTypes = {
  onHomeClick: propTypes.func.isRequired,
  onBasketOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  local: propTypes.object
};

Controls.defaultProps = {};

export default React.memo(Controls);
