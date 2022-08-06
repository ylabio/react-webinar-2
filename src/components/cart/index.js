import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import List from '../list';
import './style.css'
import propTypes from 'prop-types';

const Cart = (props) => {
  return (
      <ModalLayout head={<h1>Корзина</h1>} closeHandler={props.closeHandler}>
        <div style={{height: "74px"}}/>
        <List items={props.shoppingCart}
              onItemClickCallback={props.removeFromCartCallback}
              actionType={"Удалить"}
        />
        <div className="summary">
          <p className='summary-title'>Итого</p>
          <p className='summary-value'>{props.totalCartPrice.toLocaleString()} ₽</p>
        </div>
      </ModalLayout>
  );
};

Cart.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  shoppingCart: PropTypes.arrayOf(propTypes.object).isRequired,
  removeFromCartCallback: PropTypes.func.isRequired,
  totalCartPrice: PropTypes.number.isRequired
};

export default React.memo(Cart);