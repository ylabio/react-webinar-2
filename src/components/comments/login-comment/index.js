import {cn as bem} from '@bem-react/classname'
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function LoginComments({onNavigate, text, onBack}) {

  const cn = bem('LoginComments');

  return (
    <div className={cn()}>
      <span className={cn('button')} onClick={onNavigate}>Войдите</span>,
      {text}
      {onBack?<span className={cn('button',{color: 'green'})} onClick={onBack}>Отмена</span>: null}
    </div>

  )
}

LoginComments.propTypes = {
  onNavigate: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  onBack: propTypes.func
}

export default React.memo(LoginComments);
