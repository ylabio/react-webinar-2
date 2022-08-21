import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function AuthBox(props) {
  const cn = bem('AuthBox');
  return (
    <div className={cn()}>
        {props.children}
    </div>
  )
}

export default React.memo(AuthBox);
