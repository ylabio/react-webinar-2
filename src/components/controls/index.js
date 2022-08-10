import React from 'react';
import './style.css';
import plural from 'plural-ru';
import { numberWithSpaces } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";

function Controls({store, onToggleModal}){
  const cn = bem('Controls');
  const pluralGoods = plural(store.numOfGoods(),'товар','товара','товаров')

  return (
    <div className={cn()}>
      <div className={cn('stats')}>
        В корзине:
        <span className={cn('stat')}>
          {store.numOfGoods() ?
            `${store.numOfGoods()} ${pluralGoods} / ${numberWithSpaces(store.sumOfGoods())} ₽`
            : 'пусто'}
        </span>
      </div>
      <button onClick={onToggleModal}>Перейти</button>
    </div>
  )
}
Controls.propTypes = {
  store: propTypes.object,
  onToggleModal: propTypes.func
}

Controls.defaultProps = {
  onToggleModal: () => {}
}

export default React.memo(Controls);
