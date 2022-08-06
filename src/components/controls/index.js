import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';

function Controls({changePopup, children, countAndSum, showCountAndSum}){
  const cn = bem('Controls');

  const callbacks = {
    changedPopup: useCallback((e) => {
      e.stopPropagation();
      changePopup();
    }, [])
  };

  return (
    <div className={cn()}>
      {
        showCountAndSum &&
        <div className={cn('information')}>
          <div className={cn('text')}>
            В корзине:
          </div>
          <div className={cn('calc')}>
            {countAndSum.count
              ? ` ${countAndSum.count} ${plural(countAndSum.count, 'товар', 'товара', 'товаров')} / ${countAndSum.sum} ₽`
              : ' пусто'}
          </div>
        </div>
      }
      <button onClick={callbacks.changedPopup}>{children}</button>
    </div>
  )
}

Controls.propTypes = {
  changePopup: propTypes.func.isRequired,
  children: propTypes.node,
  countAndSum: propTypes.object,
  showCountAndSum: propTypes.bool,
}

Controls.defaultProps = {
  changePopup: () => {},
  countAndSum: {},
  showCountAndSum: false
}

export default React.memo(Controls);
