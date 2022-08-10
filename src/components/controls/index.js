import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';

function Controls({openPopup, countAndSum}){
  const cn = bem('Controls');

  const cb = {
    openPopup: useCallback((e) => {
      e.stopPropagation();
      openPopup(true);
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('information')}>
        <div className={cn('text')}>
          В корзине:
        </div>
        <div className={cn('calc')}>
          {countAndSum.count
            ? ` ${countAndSum.count} ${plural(countAndSum.count, 'товар', 'товара', 'товаров')} 
              / ${countAndSum.sum.toLocaleString('ru-RU')} ₽`
            : ' пусто'}
        </div>
      </div>
      <button onClick={cb.openPopup}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openPopup: propTypes.func.isRequired,
  countAndSum: propTypes.object.isRequired,
}

Controls.defaultProps = {
  openPopup: () => {},
  countAndSum: {},
}

export default React.memo(Controls);