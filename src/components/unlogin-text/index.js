import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function UnloginText({ text, redirect, children }) {
  const cn = bem('UnloginText');

  return (
    <p className={cn()}>
      <span className={cn('enter')} onClick={redirect}>Войдите</span>
      , чтобы иметь возможность {text}
      {children}
    </p>
  )
}

UnloginText.propTypes = {
  text: propTypes.string,
  redirect: propTypes.func,
  children: propTypes.node,
}

export default React.memo(UnloginText);
