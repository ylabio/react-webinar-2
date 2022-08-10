import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import List from '../../list';
import CartItem from '../../cart/item';


function ContentModal(props) {
  const products = Object.values(props.cart);
  return (
    <div className='Content-modal'>
      <List
        items={products}
        callback={props.delete}
        component={CartItem}
        text = {'Удалить'}
      />
      <div className='Content-total'>
        <span>Итого</span>
        <span>{props.sum}</span>
      </div>
    </div>
  )
}

ContentModal.propTypes = {
  cart: propTypes.object.isRequired,
  sum: propTypes.string.isRequired,
  isOpen: propTypes.bool.isRequired,
  delete: propTypes.func
}

ContentModal.defaultProps = {
  delete: () => {}
}

export default React.memo(ContentModal);
