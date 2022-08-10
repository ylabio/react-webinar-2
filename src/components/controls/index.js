import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';

function Controls({openPopup, showCountAndSum}){
  const cn = bem('Controls');

  const cb = {
    openPopup: useCallback((e) => {
      e.stopPropagation();
      openPopup(true);
    }, []),
    showSum: useCallback(() => {
      return showCountAndSum().sum;
    }, []),
    showCount: useCallback(() => {
      return showCountAndSum().count;
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('information')}>
        <div className={cn('text')}>
          В корзине:
        </div>
        <div className={cn('calc')}>
          {cb.showCount()
            ? ` ${cb.showCount()} ${plural(cb.showCount(), 'товар', 'товара', 'товаров')} 
              / ${cb.showSum().toLocaleString('ru-RU')} ₽`
            : ' пусто'}
        </div>
      </div>
      <button onClick={cb.openPopup}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openPopup: propTypes.func.isRequired,
  showCountAndSum: propTypes.func.isRequired,
}

Controls.defaultProps = {
  openPopup: () => {},
  showCountAndSum: () => {},
}

export default React.memo(Controls);