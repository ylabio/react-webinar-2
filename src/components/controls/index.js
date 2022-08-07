import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';
import CustomButton from "../castom-button";
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import {formattingNumber, total} from "../../utils";

function Controls(props) {
  const cn = bem('Controls');
  const quantityItems = props.cart.length

  const callbacks = {
    onOpenModal: useCallback(() => {
      props.onOpenModal()
    }, [props.onOpenModal])
  };

  return (
      <div className={cn()}>
        <div className={cn('title')}>
          <span className={cn('title-default')}>В корзине:</span>
          {quantityItems
              ? <b>
                {quantityItems} {plural(quantityItems,'товар','товара','товаров')} / {formattingNumber(total(props.cart))}
              </b>
              : <b>пусто</b>}
        </div>
        <div className={cn('button')}>
          <CustomButton action={callbacks.onOpenModal} valueButton={'Перейти'}/>
        </div>
      </div>

  )
}

Controls.propTypes = {
  onOpenModal: propTypes.func.isRequired, // Обязательное свойство - функция
  cart: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {
  onOpenModal: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);
