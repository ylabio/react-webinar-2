import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

// Создал HOC по документации React.js
// Сомневаюсь в правильности наименования getList
function getList(WrappedComponent, items, callback) {
  const cn = bem('List');

  return (
    <ul className={cn()}>
      {items.map((item) =>
        <WrappedComponent item={item} onClick={callback} key={item.code} />
      )}
    </ul>
  )
}

export default getList;
