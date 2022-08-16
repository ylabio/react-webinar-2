import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import useLanguage from "../../utils/use-language";
import './style.css';

function Menu() {
  const cn = bem('Menu');

  const lng = useLanguage();

  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>{lng("toMain")}</Link>
    </div>
  );
};

/* Menu.propTypes = {
  
}

Menu.defaultProps = {
  
} */

export default React.memo(Menu);