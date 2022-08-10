import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

import "./style.css";
import {formatter} from "../../utils";

function Item({item, btnClick, btnTitle= 'Кнопка', code}) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {code}
      </div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {formatter(item.price)}
      </div>
        {item.count && (
            <div className={cn('count')}>
                <span>{item.count}</span>
                <span>шт</span>
            </div>
        )}
      <div className={cn('actions')}>
        <button onClick={() => btnClick(item.code)}>
            {btnTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    btnClick: propTypes.func.isRequired,
    btnTitle: propTypes.string,
    code: propTypes.number
}

export default React.memo(Item);
