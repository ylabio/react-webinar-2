import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import { Link } from "react-router-dom";
import './styles.css';


function Menu({language, translate, links}) {
  const cn = bem('Menu');
  return (
    <div className={cn()}>
      {links.map(item => <Link className={cn('item')} key={item.href} to={item.href}>{translate(language, item.title)}</Link>)}
    </div>
  )
}

Menu.propTypes = {
  language: propTypes.string,
  translate: propTypes.func,
  links: propTypes.array.isRequired
}

Menu.defaultProps = {
  language: 'RU',
  translate: (langugage, key) => key,
}

export default React.memo(Menu);
