import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function FormEntry({onSignIn, changeId, t, padding}) {
  const cn = bem('FormEntry');

  return (
    <div className={cn()} style={{'paddingLeft': 40 + padding}}>
      <div className={cn('entry')}><span onClick={()=>onSignIn()}>{t('comments.signIn')}</span>{t('comments.toBeAnleToAnswer')}.</div>
      <button onClick={()=>{changeId('')}}>{t('comments.cancelButtonName')}</button>
    </div>
  )
}

FormEntry.propTypes = {
  onSignIn: propTypes.func.isRequired,
  padding: propTypes.number,
  changeId: propTypes.func.isRequired,
  t: propTypes.func
}

FormEntry.defaultProps = {
  t: (text) => text,
  padding: 0
}

export default React.memo(FormEntry);
