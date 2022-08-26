import React, { useState } from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Send({ action, ...restProps }) {
 
  // CSS классы по БЭМ
  const cn = bem('Send');

  return (
    <div className={cn()}>
      <span className={cn('title')}>Новый комментарий</span>
      <textarea className={cn('field')} 
                placeholder='Текст'
                {...restProps}/>
      <button className={cn('action')} onClick={action}>Отправить</button>
    </div>
  )
}


Send.propTypes = {
  action: propTypes.func,
}

Send.defaultProps = {
  action: () => {},
}

export default React.memo(Send);
