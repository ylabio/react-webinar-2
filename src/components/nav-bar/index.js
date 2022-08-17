import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";

function NavBar({links}) {
  const cn = bem('NavBar');
  const url = Object.keys(links)
  const link = Object.values(links)

  console.log(url, link)

  return (
    <div className={cn()}>
      {url.map((item, index) =>
        <Link to={item} key={item}>
          <span className={cn('link')}>{link[index]}</span>
        </Link>
      )}
    </div>
  )
}

NavBar.propTypes = {
  links: propTypes.arrayOf(propTypes.object),
}

NavBar.defaultProps = {
  links: [],
}

export default React.memo(NavBar);
