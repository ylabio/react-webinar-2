import {cn as bem} from '@bem-react/classname'
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function LoginComments({onNavigate}) {

  // CSS классы по БЭМ
  const cn = bem('LoginComments');

  return (
    <div className={cn()}>
      <span onClick={onNavigate}>Войдите</span>, чтобы иметь возможность комментировать
    </div>

  )
}

LoginComments.propTypes = {
  onNavigate: propTypes.func.isRequired
}

LoginComments.defaultProps = {
  onNavigate: () => {
  }
}

export default React.memo(LoginComments);
