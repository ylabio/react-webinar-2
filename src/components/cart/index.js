import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import numberFormat from "utils/number-format";
import useLanguage from "utils/use-language";

function Cart(props) {
  const cn = bem('Cart');
  const translation = useLanguage()

  const callbacks = {
    onAdd: useCallback(() => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.item.description}</p>
      <p
        className={cn('description')}>{translation('producingCountry')}: <span>{props.item.maidIn.title}</span>
      </p>
      <p
        className={cn('description')}>{translation('category')}: <span>{props.item.category.title}</span>
      </p>
      <p
        className={cn('description')}>{translation('yearOfIssue')}: <span>{props.item.edition}</span>
      </p>
      <p
        className={cn('price')}>{translation('price')}: {numberFormat(props.item.price)} ₽</p>
      <button onClick={callbacks.onAdd}>{translation('add')}</button>
    </div>
  );
}

Cart.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
};

Cart.defaultProps = {
  item: {maidIn: {}, edition: '', description: '', category: {}, price: 0},
};

export default React.memo(Cart);
