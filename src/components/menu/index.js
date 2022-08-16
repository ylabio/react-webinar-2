import React from "react";
import {withLocale} from "../../contexts/locale.context";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import "./style.css"

function Menu({lang}) {
  const cn = bem('Menu');
  return (
    <div className={cn()}>
      <Link to="/" className={cn('nav')} style={{"color": "#0087E9"}}>{lang.handle('home')}</Link>
    </div>
  )
}

Menu.propTypes = {
  lang: propTypes.object
}

export default React.memo(withLocale(Menu));