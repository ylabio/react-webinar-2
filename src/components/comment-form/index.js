import React, {useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import {useParams} from "react-router-dom";

function CommentForm(props) {
  
  const cn = bem('CommentForm');
  
  const [textarea, setTextarea] = useState('');

  const params = useParams()

  return (
    <>
      {props.sessionExists ?
        <div className={cn()}>
          <div className={cn('header')}>
            <div className={cn('title')}>{props.t('comments.newComment')}</div>
            {params.id !== props.currentAnswer &&
              <div className={cn('cross')} onClick={props.resetCurrentForm}>&#9746;</div>}
          </div>
          <textarea rows="5"
                    placeholder={props.t('comments.text')}
                    className={cn('textarea')}
                    onChange={(e) => setTextarea(e.target.value)}
                    value={textarea}
          />
          <button className={cn('submitButton')}
                  onClick={() => {
                    props.postNewComment(textarea)
                    setTextarea('')
                  }}>{props.t('comments.send')}
          </button>
        </div> :
        <div className={cn('sessionExists')}>
          <span className={cn('redirectButton')} onClick={props.redirect}>{props.t('comments.signInRedirect')}</span>{props.t('comments.opportunityToComment')}
        </div>
      }
    </>
  )
}

CommentForm.propTypes = {
  currentAnswer: propTypes.string,
  postNewComment: propTypes.func,
  resetCurrentForm: propTypes.func,
  redirect: propTypes.func,
  sessionExists: propTypes.bool
}

CommentForm.defaultProps = {
  redirect: () => {
  },
  postNewComment: () => {
  },
  resetCurrentForm: () => {
  },
}

export default React.memo(CommentForm);
