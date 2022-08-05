import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({
  items,
  handleBtn,
  btnText
}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}> 
      {/* 
        key одинаковые в модальнике и в списке товаров.
        Мне стало интересно, нужно ли делать их разными.
        Ответ: https://ru.reactjs.org/docs/lists-and-keys.html#keys-must-only-be-unique-among-siblings
        Вкратце: нет, они должны быть полностью уникальными только в пределах одного списка
      */}
        <Item item={item} handleBtn={handleBtn} btnText={btnText}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  handleBtn: propTypes.func,
  btnText: propTypes.string
}

List.defaultProps = {
  handleBtn: () => {},
  btnText: "Добавить"
}

export default React.memo(List);
