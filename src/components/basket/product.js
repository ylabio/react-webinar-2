import React, {useCallback, useMemo} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

/** Utils */
import {toSpacedNum} from "../../utils.js";

/** Components */
import Item from "../item";

function Product(props) {
  const cn = bem('Basket');

  const callbacks = {
    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.product.code);
    }, [props.onDelete]),
  };

  return (
    <Item
      title={props.product.title}
      code={props.product.code}
      actions={<button onClick={callbacks.onDelete}>Удалить</button>}
    >
      <div className={cn('list-item-info')}>
        <div>{toSpacedNum(props.product.price) + ' ₽'}</div>
        <div>{props.product.selectCount} шт.</div>
      </div>
    </Item>
  );
}

Product.propTypes = {
  product: propTypes.object,
  onDelete: propTypes.func,
};

Product.defaultProps = {
  onDelete: () => {},
};

export default React.memo(Product);
