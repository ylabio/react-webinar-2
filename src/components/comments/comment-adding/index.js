import React, {useState, useEffect, useCallback} from 'react';
import {Link} from "react-router-dom";
import debounce from "lodash.debounce";
import propTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";


function CommentAdding(props){
  // Внутренний стейт по умолчанию с переданным message
  const [message, setMessage] = useState(props.message);

  // Задержка для вызова props.handleChange
  const setMessageThrottle = useCallback(
    debounce(value => props.handleChange(value), 300),
    [props.handleChange]
  );

  // Обработчик изменений в textarea
  const handleChange = useCallback(evt => {
    setMessage(evt.target.value);
    setMessageThrottle(evt.target.value);
  }, [setMessage, setMessageThrottle]);

  const handleCancelCommentLogin = useCallback(() => {
    props.handleCancel('article')
  }, [props.handleCancel]);

  // Обновление стейта, если передан новый message
  useEffect(() => {
    setMessage(message);
  }, [message]);

  const cn = bem('CommentAdding');
  if (!props.isAuth) {
    return (
      <div className={cn()}>
        <Link to={'/login'} className={cn('link')}>Войдите</Link>
          , чтобы иметь возможность {props.target === 'article' ? 'комментировать' : 'ответить'}.
        {props.target === 'comment' &&
          <button className={cn('cancel')} onClick={handleCancelCommentLogin}>Отмена</button>
        }
      </div>
    )
  }
  return (
    <div className={cn()}>
      <h3 className={cn('title')}>{props.target === 'comment' ? 'Новый ответ' : 'Новый комментарий'}</h3>
      <form onSubmit={props.handleSubmit}>
        <textarea
          className={cn('textarea')}
          placeholder={props.target === 'comment' ? `Мой ответ для ${props.author.name}` : "Текст"}
          rows="5"
          onChange={handleChange}
        />
        <button type="submit" className={cn('button')}>Отправить</button>
        {props.target === 'comment' &&
          <button type="button" className={cn('button')} onClick={props.handleCloseCommentAnswer}>Отмена</button>
        }
      </form>
    </div>
  )
}

CommentAdding.propTypes = {
  isAuth: propTypes.bool.isRequired,
  message: propTypes.string,
  target: propTypes.oneOf(['article', 'comment']).isRequired,
  author: propTypes.object,
  handleSubmit: propTypes.func,
  handleChange: propTypes.func,
  handleCloseCommentAnswer: propTypes.func,
}

CommentAdding.defaultProps = {
  message: '',
  title: 'Новый комментарий',
}

export default React.memo(CommentAdding);
