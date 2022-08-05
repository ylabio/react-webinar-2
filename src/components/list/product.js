import React, {useCallback, useMemo} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

/** Utils */
import {toSpacedNum} from "../../utils.js";

/** Components */
import Item from "../item";

function Product(props) {
  const cn = bem('Product');

  const callbacks = {
    onAdd: useCallback((e) => {
      e.stopPropagation();
      props.onAdd(props.product);
    }, [props.onAdd]),
  };

  return (
    <Item
      title={props.product.title}
      code={props.product.code}
      actions={<button onClick={callbacks.onAdd}>Добавить</button>}
    >
      <div className={cn('price')}>
        {toSpacedNum(props.product.price) + ' ₽'}
      </div>
    </Item>
  );
}

Product.propTypes = {
  product: propTypes.object,
  onAdd: propTypes.func,
};

Product.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Product);
