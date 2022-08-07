import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CustomButton from "../castom-button";
import {formattingNumber} from "../../utils";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAddProduct: useCallback(() => {
      props.onAddProduct(props.item.code, props.item.title, props.item.price)
    }, [props.onAddProduct])
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
        <div className={cn('button')}>
          <CustomButton action={callbacks.onAddProduct}
                        valueButton={'Добавить'}/>
        </div>
      </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddProduct: propTypes.func.isRequired,
}

Item.defaultProps = {
  onAddProduct: () => {}
}

export default React.memo(Item);
