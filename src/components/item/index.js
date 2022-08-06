import React, {useCallback} from 'react';
import Simple from '../simple';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({
  item,
  handleBtn,
  btnText,
  children
}) {
  const cn = bem('Item');

  const callbacks = {
    handleBtn: useCallback((e) => {
      e.stopPropagation();
      handleBtn(item.code) 
    }, [handleBtn, item])
  };

  return (
    <div className={cn()}>
      <Simple cn={cn} bemIndex={'number'} text={item.code} />
      <Simple cn={cn} bemIndex={'title'} text={item.title} />
      <Simple cn={cn} bemIndex={'price'} text={`${item.price.toLocaleString('ru')} ₽`} />
      { children }
      <div className={cn('actions')}>
        <button onClick={callbacks.handleBtn}>
          {btnText}
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  handleBtn: propTypes.func,
  btnText: propTypes.string.isRequired,
  children: propTypes.element
}

Item.defaultProps = {
  handleBtn: () => {},
  children: null
}

export default React.memo(Item);
