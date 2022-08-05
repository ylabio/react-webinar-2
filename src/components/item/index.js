import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

// Для лучшей читабельности кода. Вроде ничего не руинит.
// Нигде больше не используется, не имеет специальных стилей, не вызывает лишних рендеров, вынесение бессмыслено
const Simple = React.memo(({cn, bemIndex, text}) => <div className={cn(bemIndex)}>{text}</div>)

function Item({
  item,
  handleBtn,
  btnText
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
      {
        item.count && 
        <Simple cn={cn} bemIndex={'count'} text={`${item.count} шт.`} />
      }
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
  btnText: propTypes.string
}

Item.defaultProps = {
  handleBtn: () => {},
  btnText: "Добавить"
}

export default React.memo(Item);
