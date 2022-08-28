import React, { useState } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Send({ action, title, cancel, isCancelBtn, t, ...restProps }) {
 
  // CSS классы по БЭМ
  const cn = bem('Send');

  return (
    <div className={cn()}>
      <span className={cn('title')}>{title}</span>
      <textarea className={cn('field')} 
                placeholder={t('send.placeholder')}
                {...restProps}/>
      <div>
        <button className={cn("action")} onClick={action}>{t('send.post')}</button>
        { isCancelBtn && <button className={cn("action")} onClick={cancel}>{t('send.cancel')}</button> }
      </div>
    </div>
  )
}


Send.propTypes = {
  action: propTypes.func,
  title: propTypes.string,
  cancel: propTypes.func,
  isCancelBtn: propTypes.bool.isRequired,
}

Send.defaultProps = {
  action: () => {},
  title: '',
  cancel: () => {},
}

export default React.memo(Send);
