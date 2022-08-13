import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import useSelector from '../../utils/use-selector';
import numberFormat from "../../utils/numberFormat";
import './style.css';

function ProductDesc({product, onAdd}) {
  const cn = bem('ProductDesc');

  const callbacks = {
    onAdd: useCallback(() => onAdd(product._id), [onAdd, product])
  };

  const select = useSelector(state => ({
    lang: state.language.value,
  }));

  return (
    <div className={cn()}>
      <p>{product.description}</p>
      <p>
        {select.lang === 'rus' ? 'Страна производитель: ': 'Producing country: '}
        <b>{product.madeIn} ({product.madeInCode})</b>
      </p>
      <p>
        {select.lang === 'rus' ? 'Категория: ': 'Category: '}
        <b>{product.category}</b>
      </p>
      <p>
        {select.lang === 'rus' ? 'Год выпуска: ': 'Manufacturing year: '}
        <b>{product.edition}</b>
      </p>
      <h2 className={cn('price')}>
        {select.lang === 'rus' ? 'Цена: ': 'Price: '}
        {numberFormat(product.price)}
      </h2>
      <button className={cn('add')} onClick={callbacks.onAdd}>
        {select.lang === 'rus' ? 'Добавить': 'Add'}
      </button>
    </div>
  )
}

ProductDesc.propTypes = {
  product: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

ProductDesc.defaultProps = {
  onAdd: () => {},
}

export default React.memo(ProductDesc);
