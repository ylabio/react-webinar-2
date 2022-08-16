import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import {Link} from "react-router-dom";
import propTypes from "prop-types";


function MainMenu({words}) {
  const cn = bem('MainMenu');
  return (
    <div className={cn()}>
      <Link to='/' className={cn('navigate')}>{words.main}</Link>
    </div>
  )
}

MainMenu.propTypes = {
  words: propTypes.objectOf(propTypes.string)
}

MainMenu.defaultProps = {}

export default React.memo(MainMenu);
