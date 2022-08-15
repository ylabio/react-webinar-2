import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';


function MainMenu({}) {
  const cn = bem('MainMenu');
  return (
    <div className={cn()}>
    </div>
  )
}

MainMenu.propTypes = {
}

MainMenu.defaultProps = {
}

export default React.memo(MainMenu);
