import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List({ items, buttonTitle, onClick, total }) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {items.map((item, index) =>
        <li key={item.code} className={cn('item')}>
          <Item
            item={item}
            index={index}
            buttonTitle={buttonTitle}
            onClick={onClick}
          />
        </li>
      )}
      {buttonTitle === 'Удалить' &&
        <div className={cn('total')}>
          <strong>Итого</strong>
          <strong>
            {`${total} \u20bd`}
          </strong>
        </div>}
    </ul>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  buttonTitle: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  total: propTypes.string
};

List.defaultProps = {
  total: '0'
};

export default React.memo(List);
