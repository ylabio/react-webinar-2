import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './styles.css';

function ItemDescription({ itemData }) {
  const cn = bem('ItemDescription');

  const { description, maidIn, maidInCode, category, edition, price } = itemData;
  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {description}
      </div>
      <div className={cn('maidIn')}>
        <span className={cn('label')}>Страна производитель: </span>
        <span className={cn('info')}>{maidIn} ({maidInCode})</span>
      </div>
      <div className={cn('category')}>
        <span className={cn('label')}>Категория: </span>
        <span className={cn('info')}>{category}</span>
      </div>
      <div className={cn('edition')}>
        <span className={cn('label')}>Год выпуска: </span>
        <span className={cn('info')}>{edition}</span>
      </div>
      <div className={cn('price')}>
        <span className={cn('price-label')}>Цена: </span>
        <span className={cn('price-info')}>{price} ₽</span>
      </div>
    </div>
  )
}

ItemDescription.propTypes = {
  description: propTypes.string,
  maidIn: propTypes.string,
  maidInCode: propTypes.string,
  category: propTypes.string,
  edition: propTypes.string,
  price: propTypes.string
}

ItemDescription.defaultProps = {
  description: "",
  maidIn: "",
  maidInCode: "",
  category: "",
  edition: "",
  price: ""
}

export default React.memo(ItemDescription);
