import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginError({t}) {

  const cn = bem('LoginError');

  return (
    <div className={cn()}>
      {t(`login.error`)}
    </div>
  )
}

LoginError.propTypes = {
}

LoginError.defaultProps = {
}

export default React.memo(LoginError);