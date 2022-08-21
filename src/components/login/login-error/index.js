import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginError({t}) {

  // CSS классы по БЭМ
  const cn = bem('LoginError');

  return (
    <div className={cn()}>
      {t(`login.error`)}
    </div>
  )
}

LoginError.propTypes = {
  t: propTypes.func,
}

LoginError.defaultProps = {
  t: (text) => text,
}

export default React.memo(LoginError);