import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import Button from '../../shared/ui/button';

function Controls() {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <span className={cn('text')}>В корзине:</span>
        <span className={cn('cart')}>пусто</span>
      </div>
      <Button text='Перейти' />
    </div>
  )
}

Controls.propTypes = {
}

Controls.defaultProps = {
}

export default React.memo(Controls);
