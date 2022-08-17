import React from 'react';
import { cn as bem } from "@bem-react/classname";
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './style.css'
import translate from '../../utils/translate';

export default function Menu({ lang }) {
  const cn = bem('Menu');

  return (
    <ul className={cn()}>
      <li className={cn('item')}>
        <Link className={cn('link')} to='/'>{translate(lang, 'Главная')}</Link>
      </li>
    </ul>
  )
}

Menu.propTypes = {
  lang: propTypes.string
}

Menu.defaultProps = {
  lang: 'ru'
}
