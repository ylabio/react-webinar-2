import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginError({t, errorCode}) {

  // CSS классы по БЭМ
  const cn = bem('LoginError');

  return (
    <div className={cn()}>
      {t(`login.error`)}{errorCode}
    </div>
  )
}

LoginError.propTypes = {
  t: propTypes.func,
  errorCode: propTypes.string
}

LoginError.defaultProps = {
  t: (text) => text,
  errorCode: ''
}

export default React.memo(LoginError);