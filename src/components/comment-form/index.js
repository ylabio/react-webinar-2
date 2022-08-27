import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {Link} from "react-router-dom";

function CommentForm(props) {
  const cn = bem('CommentForm');

  const [text, setText] = useState('');

  const cb = {
    addComment: useCallback((e) => {
      e.preventDefault();

      const body = {
        text: `${text}`,
        parent: {
          _id: props.idParent,
          _type: props.typeParent
        }
      }

      props.addComment(props.token, body);
      props.closeComment(props.comment._id);
    }, [text]),

    closeComment: useCallback((e) => {
      e.preventDefault();
      props.closeComment(props.comment._id);
    }, [props.comment.active]),
  };

  return (
    <>
      {
        props.exists
          ? <form className={cn()} onSubmit={cb.addComment}>
              <label>{props.t('comment.new-comment')}</label>
              <textarea onChange={(e) => setText(e.target.value)}
                        value={text}/>
              <div className={cn('buttons')}>
                <button>{props.t('comment.send')}</button>
                {props.typeParent === 'comment' && <button onClick={cb.closeComment}>{props.t('comment.cancel')}</button>}
              </div>
            </form>
          : <div className={cn('not-auth')}>
              <Link to="/login">
                {props.t('auth.signIn')}
              </Link>
            {props.t('comment.text')}
              {
                props.typeParent === 'comment' &&
                <span className={cn('cancel')} onClick={cb.closeComment}>{props.t('comment.cancel')}</span>
              }
            </div>
      }
    </>
  )
}

CommentForm.propTypes = {
  comment: propTypes.object,
  addComment: propTypes.func,
  closeComment: propTypes.func,
  exists: propTypes.bool,
  idParent: propTypes.string,
  typeParent: propTypes.string,
  token: propTypes.string,
  t: propTypes.func,
}

CommentForm.defaultProps = {
  comment: {},
  addComment: () => {},
  closeComment: () => {},
  exists: false,
  idParent: '',
  typeParent: '',
  token: '',
  t: (text) => text,
}

export default React.memo(CommentForm);
