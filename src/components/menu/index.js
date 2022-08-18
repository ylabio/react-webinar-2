import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom"

function Menu({links}){
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      {links.map((link, index) => {
        return <Link key={index} className={cn('link')} to={link.path}>{link.name}</Link>
      }
      )}
    </div>
  )
}

Menu.propTypes = {
}

Menu.defaultProps = {
}

export default React.memo(Menu);
