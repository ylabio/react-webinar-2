import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import { Link } from "react-router-dom";

function CommentMainForm(props) {
  const cn = bem('CommentMainForm');

  const [form, setForm] = useState({ text: '', err: false });

  const cb = {
    addComment: useCallback((e) => {
      e.preventDefault();

      const body = {
        text: `${form.text}`,
        parent: {
          _id: props.articleId,
          _type: "article"
        }
      }

      if (form.text.trim() === '') {
        setForm({ ...form, err: true })
      } else {
        props.addComment(props.token, body);
      }
    }, [form.text]),

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
            </div>
          </form>
          : <div className={cn('not-auth')}>
            <span className={cn('link')} onClick={cb.onSignIn}>
              {props.t('auth.signIn')}
            </span>
            {props.t('comment.text')}
          </div>
      }
    </div>
  )
}

CommentMainForm.propTypes = {
  addComment: propTypes.func,
  exists: propTypes.bool,
  articleId: propTypes.string,
  token: propTypes.string,
  t: propTypes.func,
}

CommentMainForm.defaultProps = {
  addComment: () => { },
  exists: false,
  articleId: '',
  token: '',
  t: (text) => text,
}

export default React.memo(CommentMainForm);
