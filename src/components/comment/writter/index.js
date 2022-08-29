import { cn as bem } from '@bem-react/classname';
import { debounce } from 'lodash';
import propTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import './style.css';

/**
 * Component description
 */

function CommentWritter({ isAuth, isReply, text, onChange, onSubmit, onCancel, onSignin, shift, t }) {
  const cn = bem('CommentEditor');

  /* const [value, change] = useState('');

  const onChange = useCallback(event => {
    change(event.target.value);
  }, [change]);

  useEffect(() => {
    change(value);
  }, [value]); */

  return (
    <div className={cn()} style={{ paddingLeft: 30 * shift > 300 ? '300px' : (30 * shift) + 'px' }}>{isAuth ?
      <>
        <div className={cn('title')}>{isReply ? t("comments.newReplay") : t("comments.newComment")}</div>
        <textarea className={cn('textarea')} onChange={e => onChange(e.target.value)} value={text} />
        <div className={cn('actions')}>
          <button className={cn('button')} onClick={onSubmit} disabled={!text.length}>{t("comments.submit")}</button>
          {isReply ? <button className={cn('button')} onClick={onCancel}>{t("comments.cancel")}</button> : null}
        </div>
      </>
      :
      <div className={cn('actions')} >
        <div className={cn('loglink')} onClick={onSignin}>{t("comments.signin")}</div>
        <div className={cn('logmessage')}>{isReply ? t("comments.forReply") : t("comments.forComment")}.</div>
        {isReply ? <div className={cn('logcancel')} onClick={onCancel}>{t("comments.cancel")}</div> : null}
      </div>
    }</div>
  );
}

CommentWritter.propTypes = {
  isAuth: propTypes.bool,
  isReply: propTypes.bool,
  text: propTypes.string,
  onChange: propTypes.func,
  onSubmit: propTypes.func,
  onCancel: propTypes.func,
  onSignin: propTypes.func,
  shift: propTypes.number,
  t: propTypes.func
}

CommentWritter.defaultProps = {
  isAuth: false,
  isReply: false,
  text: '',
  onChange: () => { },
  onSubmit: () => { },
  onCancel: () => { },
  onSignin: () => { },
  shift: 0,
  t: () => { }
}

export default React.memo(CommentWritter);