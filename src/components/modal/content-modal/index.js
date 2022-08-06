import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import List from '../../list';

const ProductCount = (item) => <span>{item.count} шт</span>;

function ContentModal(props) {
  const products = Object.values(props.basket);
  return (
    <div className='Content-modal'>
      <List
        items={products}
        callback={props.delete}
        text={'Удалить'}
        component={ProductCount}
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
