import React, { useCallback, useState } from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import './style.css';

function AnswerComment(props) {
  const cn = bem('AnswerComment');

  const [text, setText] = useState('');

  const callbacks = {
    changeText: useCallback((text) => setText(text), []),
    answerComment: useCallback(() => {
      props.answerComment(text, props.parentId, 'comment');
      props.setVisibleTextArea(props.idArticle);
      setText('');
    }, [text])
  }

  const placeholder = `Мой ответ для ${props.visibleTextArea.name}`

  return (
    <div style={{ paddingLeft: 30 }} className={cn()}>
      {props.exists
        ? <>
          <div className={cn('title')}>Новый ответ</div>
          <textarea onChange={(e) => callbacks.changeText(e.target.value)} value={text} className={cn('text')} placeholder={placeholder} />
          <div className={'btns'}>
            <button className={cn('button')} onClick={() => callbacks.answerComment()}>Отправить</button>
            <button className={cn('button')} onClick={() => props.setVisibleTextArea({ name: '', parentId: props.idArticle })}>Отмена</button>
          </div>
        </>
        : <div className={cn('auth')}>
          <a className={cn('link')} onClick={() => props.onSignIn()}>Войдите</a>, чтобы иметь возможность отвечать.{' '}
          <span onClick={() => props.setVisibleTextArea({ name: '', parentId: props.idArticle })}>Отмена</span>
        </div>}
    </div>
  )
}

AnswerComment.propTypes = {
  parentId: propTypes.string.isRequired,
  exists: propTypes.bool,
  setVisibleTextArea: propTypes.func.isRequired,
  visibleTextArea: propTypes.object.isRequired,
  idArticle: propTypes.string.isRequired,
  answerComment: propTypes.func,
  onSignIn: propTypes.func,
}

AnswerComment.defaultProps = {
  exists: false,
  answerComment: () => { },
  onSignIn: () => { },
}

export default React.memo(AnswerComment)