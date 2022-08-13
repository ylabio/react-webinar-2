import {cn as bem} from "@bem-react/classname";
import React from 'react';
import './style.css';

function Page404() {
  const cn = bem('page404');

  return (
    <div className={cn()}>
      <h1>...упс. Такой страницы не существует</h1>
    </div>
  )
}

export default React.memo(Page404);
