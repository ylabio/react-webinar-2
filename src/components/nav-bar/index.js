import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";

function NavBar({lang}) {
  const cn = bem('NavBar');

  return (
    <div className={cn()}>
      <Link to="/">
        <span className={cn('link')}>{lang.main}</span>
      </Link>
    </div>
  )
}

NavBar.propTypes = {
  lang: propTypes.object,
}

NavBar.defaultProps = {
  lang: {},
}

export default React.memo(NavBar);
