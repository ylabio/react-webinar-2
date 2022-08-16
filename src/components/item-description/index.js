import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './styles.css';

function ItemDescription({ itemData, onAdd, _id, text }) {
  const cn = bem('ItemDescription');

  const { description, maidIn, maidInCode, category, edition, price } = itemData;

  const callbacks = {
    onAdd: useCallback((e) => onAdd(_id), [onAdd, _id])
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('description')}>
          {description}
        </div>
        <div className={cn('maidIn')}>
          <span className={cn('label')}>{text.maidIn}</span>
          <span className={cn('info')}>{maidIn} ({maidInCode})</span>
        </div>
        <div className={cn('category')}>
          <span className={cn('label')}>{text.category}</span>
          <span className={cn('info')}>{category}</span>
        </div>
        <div className={cn('edition')}>
          <span className={cn('label')}>{text.edition}</span>
          <span className={cn('info')}>{edition}</span>
        </div>
        <div className={cn('price')}>
          <span className={cn('price-label')}>{text.price}</span>
          <span className={cn('price-info')}>{price} ₽</span>
        </div>
      </div>
      <button className={cn('add')}
        onClick={callbacks.onAdd}>
        {text.add}
      </button>
    </div>
  )
}

ItemDescription.propTypes = {
  itemData: propTypes.object,
  onAdd: propTypes.func,
  _id: propTypes.string,
  text: propTypes.object
}

ItemDescription.defaultProps = {
  itemData: {},
  onAdd: () => { },
  _id: "",
  text: {}
}

export default React.memo(ItemDescription);
