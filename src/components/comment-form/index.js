import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import { useNavigate } from "react-router-dom";

function CommentForm(props) {
  const cn = bem('CommentForm');
  const navigate = useNavigate();

  const [form, setForm] = useState({ text: '', err: false });

  const cb = {
    addComment: useCallback((e) => {
      e.preventDefault();

      const body = {
        text: `${form.text}`,
        parent: {
          _id: props.commentId,
          _type: "comment"
        }
      }

      if (form.text.trim() === '') {
        setForm({ ...form, err: true })
      } else {
        props.addComment(props.token, body);
      }
    }, [form.text]),

    closeComment: useCallback((e) => {
      e.preventDefault();
      props.closeComment(props.commentId);
    }, []),

    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),
  };

  return (
    <div className={cn()}>
      {
        props.exists
          ? <form className={cn('form')} onSubmit={cb.addComment}>
            <label>{props.t('comment.new-comment')}</label>
            <textarea onChange={(e) => setForm({ text: e.target.value, err: false })}
              value={form.text} />
            {form.err && <div className={cn('err')}>{props.t('form.err')}</div>}
            <div className={cn('buttons')}>
              <button>{props.t('comment.send')}</button>
              <button onClick={cb.closeComment}>{props.t('comment.cancel')}</button>
            </div>
          </form>
          : <div className={cn('not-auth')}>
            <span className={cn('link')} onClick={cb.onSignIn}>
              {props.t('auth.signIn')}
            </span>
            {props.t('comment.text')}
            <span className={cn('cancel')} onClick={cb.closeComment}>{props.t('comment.cancel')}</span>
          </div>
      }
    </div>
  )
}

CommentForm.propTypes = {
  commentId: propTypes.string,
  addComment: propTypes.func,
  closeComment: propTypes.func,
  exists: propTypes.bool,
  token: propTypes.string,
  t: propTypes.func,
}

CommentForm.defaultProps = {
  commentId: '',
  addComment: () => { },
  closeComment: () => { },
  exists: false,
  token: '',
  t: (text) => text,
}

export default React.memo(CommentForm);
