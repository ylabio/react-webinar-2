import React, { useState } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Send({ action, title, cancel, isReply, t, value, ...restProps }) {
 
  // CSS классы по БЭМ
  const cn = bem('Send');

  return (
    <div className={cn()}>
      <span className={cn('title')}>{title}</span>
      <textarea className={cn('field')}
                autoFocus={isReply}
                value={value}
                {...restProps}/>
      <div>
        <button className={cn("action")} 
                onClick={action}
                disabled={!value}>
          {t('send.post')}
        </button>
        { isReply && <button className={cn("action")} onClick={cancel}>{t('send.cancel')}</button> }
      </div>
    </div>
  )
}


Send.propTypes = {
  action: propTypes.func,
  title: propTypes.string,
  cancel: propTypes.func,
  isReply: propTypes.bool.isRequired,
  t: propTypes.func,
  value: propTypes.string,
}

Send.defaultProps = {
  action: () => {},
  title: '',
  cancel: () => {},
  t: () => {},
  value: '',
}

export default React.memo(Send);
