import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import { Link } from 'react-router-dom';

function Entry({t, link}) {
  const cn = bem('Entry');

  return (
    <div className={cn()}>
      <Link to={link}>
        <button>{t('auth.entry')}</button>
      </Link>
    </div>
  )
}

Entry.propTypes = {
  t: propTypes.func,
  link: propTypes.string.isRequired
}

Entry.defaultProps = {
  t: (text) => text
}

export default React.memo(Entry);
