import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";


function MainMenu({words}) {
  const cn = bem('MainMenu');
  return (
    <div className={cn()}>
      <Link to='/' className={cn('navigate')}>{words.main}</Link>
    </div>
  )
}

MainMenu.propTypes = {
}

MainMenu.defaultProps = {
}

export default React.memo(MainMenu);
