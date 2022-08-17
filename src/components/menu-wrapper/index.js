import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function MenuWrapper({children}) {
  const cn = bem('MenuWrapper');
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

MenuWrapper.propTypes = {}

MenuWrapper.defaultProps = {}

export default React.memo(MenuWrapper);
