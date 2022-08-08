import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import List from '../../list';
import BasketItem from '../../basket-item';

function ContentModal(props) {
  const products = Object.values(props.basket);
  return (
    <div className='Content-modal'>
      <List
        items={products}
        callback={props.delete}
        text={'Удалить'}
        component={BasketItem}
      />
      <div className='summary'>
        <span>Итого</span>
        <span>{props.sum}</span>
      </div>
    </div>
  )
}

ContentModal.propTypes = {
  basket: propTypes.object.isRequired,
  sum: propTypes.string.isRequired,
  isOpen: propTypes.bool.isRequired,
  delete: propTypes.func
}

ContentModal.defaultProps = {
  delete: () => {}
}

export default React.memo(ContentModal);
