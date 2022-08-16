import React from 'react';
import { Link } from 'react-router-dom';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import propTypes from 'prop-types';
import { langVars } from '../../utils/localisation';

function Menu({link, lang, ...props}) {
	const cn = bem('Menu');

  return (
    <>
      <Link className={cn()} to={link} {...props}>
        {langVars.basketSimple.main[lang]}
      </Link>
    </>
  );
}

Menu.propTypes = {
  lang: propTypes.number.isRequired,
  link: propTypes.string.isRequired,
}

Menu.defaultProps = {
  lang: 0,
	link: '/',
}

export default React.memo(Menu);
