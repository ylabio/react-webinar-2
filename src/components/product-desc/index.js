import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function ProductDesc({product, onAdd, text}) {
  const cn = bem('ProductDesc');

  const callbacks = {
    onAdd: useCallback(() => onAdd(product._id), [onAdd, product])
  };

  return (
    <div className={cn()}>
      <p>{product.description}</p>
      <p>
        {text.madeIn}
        <b>{product.madeIn} ({product.madeInCode})</b>
      </p>
      <p>
        {text.category}
        <b>{product.category}</b>
      </p>
      <p>
        {text.edition}
        <b>{product.edition}</b>
      </p>
      <h2 className={cn('price')}>
        {text.price}
        {numberFormat(product.price)}
      </h2>
      <button className={cn('add')} onClick={callbacks.onAdd}>
        {text.add}
      </button>
    </div>
  )
}

ProductDesc.propTypes = {
  product: propTypes.object.isRequired,
  onAdd: propTypes.func,
  text: propTypes.object,
}

ProductDesc.defaultProps = {
  onAdd: () => {},
  text: {},
}

export default React.memo(ProductDesc);
