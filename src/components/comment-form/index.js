import React, {useState, useCallback} from 'react'
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css'

function CommentForm(props) {
  const cn = bem("CommentForm")

  // внутренний стейт для хранения текста комментария
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  // флаг того, что оставляем комментарий к товару, а не отвечаем на другой комментарий. 
  const isArticleComment = props.commentType === 'article'

  // применяем отступ, если это не комментарий к товару
  const style = !isArticleComment ? {marginLeft: `${props.indent}px`} : null

  const callbacks = {
    // Добавление комментария
    onAdd: useCallback((e) => {
      e.preventDefault();

      if (!text) return setError(props.t('comment.error'))
      
      props.onAdd(text, props.commentType, props.parentId)
    }, [props.onAdd, props.parentId, props.commentType, text, setError]),

    onChange: useCallback((e) => {
      setError('')
      setText(e.target.value)
    }, [])
  };

  return (
    <form className={cn()} onSubmit={callbacks.onAdd} style={style}>
      <label className={cn('label')} htmlFor="comment">{isArticleComment ? props.t('comment.formLabel') : props.t('reply.formLabel')}</label>
      <textarea id="comment" className={cn('textarea')} name='textarea' value={text} onChange={callbacks.onChange}/>
      <div className={cn('controls')}>
        <button className={cn('button')} type='submit'>{props.t('reply.send')}</button>
        {/* добавляем кнопку отмены к форме ответа на комментарий */}
        {!isArticleComment && <button className={cn('button')} type='button' onClick={props.onCancel}>{props.t('reply.cancel')}</button>}
        {error && <span className={cn('error')}>{error}</span>}
      </div>
    </form>
  )
}

export default React.memo(CommentForm)

CommentForm.propTypes = {
  parentId: propTypes.string,
  commentType: propTypes.string,
  indent: propTypes.number,
  onCancel: propTypes.func,
  onAdd: propTypes.func,
  t: propTypes.func
}

CommentForm.defaultProps = {
  indent: null,
  onCancel: () => {},
  onAdd: () => {},
  t: (text) => text
}