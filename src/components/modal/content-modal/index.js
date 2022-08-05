import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import List from '../../list';

function ContentModal({basket, sum}) {
  const products = Object.values(basket);
  return (
    <div className='Content-modal'>
      <List items={products} />
      <div className='summary'>
        <span>Итого</span>
        <span>{sum}</span>
      </div>
    </div>
  )
}

ContentModal.propTypes = {
  basket: propTypes.object.isRequired,
  sum: propTypes.string.isRequired,
}

export default React.memo(ContentModal);
