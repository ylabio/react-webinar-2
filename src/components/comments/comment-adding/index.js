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
    debounce(value => props.handleChange(value), 600),
    [props.handleChange]
  );

  // Обработчик изменений в textarea
  const handleChange = useCallback(evt => {
    setMessage(evt.target.value);
    setMessageThrottle(evt.target.value);
  }, [setMessage, setMessageThrottle]);

  // Обновление стейта, если передан новый message
  useEffect(() => {
    setMessage(message);
  }, [message]);

  const cn = bem('CommentAdding');
  if (!props.isAuth) {
    return (
      <div className={cn()}>
        <Link to={'/login'} className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать
      </div>
    )
  }
  return (
    <div className={cn()}>
      <h3 className={cn('title')}>Новый комментарий</h3>
      <form onSubmit={props.handleSubmit}>
        <textarea
          className={cn('textarea')}
          placeholder="Текст"
          rows="5"
          onChange={handleChange}
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  )
}

CommentAdding.propTypes = {
  isAuth: propTypes.bool.isRequired,
  message: propTypes.string,
  handleSubmit: () => {},
  handleChange: () => {},
}

CommentAdding.defaultProps = {
  message: '',
}

export default React.memo(CommentAdding);
