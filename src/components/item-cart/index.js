import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CustomButton from "../castom-button";
import {formattingNumber} from "../../utils";

function ItemCart(props) {
  const cn = bem('ItemCart');

  const callbacks = {
    onDeleteProduct: useCallback(() => {
      props.onDeleteProduct(props.item.code)
    }, [props.onDeleteProduct])
  };

  return (
      <div className={cn()}>
        <div className={cn('number')}>
          {props.item.code}
        </div>
        <div className={cn('title')}>
          {props.item.title}
        </div>
        <div className={cn('price')}>
          {formattingNumber(props.item.price)}
        </div>
        <span className={cn('count')}>
            {`${(props.item.count)} шт.`}
        </span>
        <div className={cn('button')}>
          <CustomButton action={callbacks.onDeleteProduct}
                        valueButton={'Удалить'}/>
        </div>
      </div>
  )
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  onDeleteProduct: propTypes.func.isRequired,

}

ItemCart.defaultProps = {
  onDeleteProduct: () => {}
}

export default React.memo(ItemCart);
