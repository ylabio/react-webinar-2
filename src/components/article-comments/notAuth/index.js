import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function NotAuth({ action, t }) {

  // CSS классы по БЭМ
  const cn = bem('Comments');

  return (
  <div className={cn('alert')}>
    <button className={cn('signIn')} onClick={action}>{t('send.login')}</button>
    <span>, {t('send.login-text')}</span>
  </div>
  );
}


NotAuth.propTypes = {
  action: propTypes.func,
}

NotAuth.defaultProps = {
  action: () => {},
}

export default React.memo(NotAuth);

