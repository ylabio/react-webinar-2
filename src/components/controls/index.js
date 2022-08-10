import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import {spaceInPrice} from "../../utils";


function Controls(props){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      В корзине: {!props.lengthCart
        ?
        <p className={cn('total')}> пусто</p>
        :
        <p className={cn('total')}>
          {props.lengthCart} {plural(props.lengthCart, 'товар', 'товара', 'товаров')} / {spaceInPrice(props.amount) + " "+"₽"}
        </p>}
      <div className={cn('actions')}>
        <button onClick={props.openModal}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
    amount: propTypes.number.isRequired,
    lengthCart: propTypes.number.isRequired,
};

Controls.defaultProps = {

};

export default React.memo(Controls);
