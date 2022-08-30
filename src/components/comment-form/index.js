import React, {useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import {useParams} from "react-router-dom";
import Input from "../input";

function CommentForm(props) {

  const [value, setValue] = useState('');

  const params = useParams()


  const cn = bem('CommentForm');

  return (
    <>
      {props.sessionExists ?
        <div className={cn()}>
          <div className={cn('header')}>
            <div className={cn('title')}>{props.item ? 'Новый ответ' : 'Новый комментарий'}</div>
          </div>
          <textarea placeholder={props.item ? `Мой ответ для ${props.userName}` : 'Текст'}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
          />
          <div>
            <button className={cn('submitButton')}
                       onClick={() => {
                         props.createComment(value)
                         setValue('')
                       }}>Отправить
          </button>
            {params.id !== props.current ? <button className={cn('submitButton')} onClick={props.resetPlace}>Отмена</button> : null}</div>

        </div> :
        <div className={cn('sessionExists')}>
          <span className={cn('redirectButton')} onClick={props.redirect}>Войдите</span>, чтобы иметь возможность комментировать
        </div>
      }
    </>
  )
}

CommentForm.propTypes = {
  current: propTypes.string,
  createComment: propTypes.func,
  resetPlace: propTypes.func,
  redirect: propTypes.func,
  exists: propTypes.bool,
  userName: propTypes.string,
  item: propTypes.bool,
}

CommentForm.defaultProps = {
}

export default React.memo(CommentForm);