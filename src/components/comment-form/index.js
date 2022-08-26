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
              <label>Новый комментарий</label>
              <textarea onChange={(e) => setText(e.target.value)}
                        value={text}/>
              <div className={cn('buttons')}>
                <button>Отправить</button>
                {props.typeParent === 'comment' && <button onClick={cb.closeComment}>Отмена</button>}
              </div>
            </form>
          : <div className={cn('not-auth')}>
              <Link to="/login">
                Войдите
              </Link>
              , чтобы иметь возможность комментировать.&nbsp;
              {
                props.typeParent === 'comment' &&
                <span className={cn('cancel')} onClick={cb.closeComment}>Отмена</span>
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
}

CommentForm.defaultProps = {
  comment: {},
  addComment: () => {},
  closeComment: () => {},
  exists: false,
  idParent: '',
  typeParent: '',
  token: '',
}

export default React.memo(CommentForm);
