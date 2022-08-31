import React, {useState, useCallback} from 'react'
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import Textarea from '../textarea';
import './style.css'

function CommentForm(props) {
  const cn = bem("CommentForm")

  // внутренний стейт для хранения текста комментария
  const [text, setText] = useState('')
  // флаг того, что оставляем комментарий к товару, а не отвечаем на другой комментарий. 
  const isArticleComment = props.commentType === 'article'

  const callbacks = {
    // Добавление комментария
    onAdd: useCallback((e) => {
      e.preventDefault();

      props.onAdd(text, props.commentType, props.parentId)
    }, [props.onAdd, props.parentId, props.commentType, text]),

    onChange: useCallback((value) => {
      setText(value)
    }, [])
  };

  return (
    <form className={cn()} onSubmit={callbacks.onAdd}>
      <label className={cn('label')} htmlFor="comment">{isArticleComment ? props.t('comment.formLabel') : props.t('reply.formLabel')}</label>
      <Textarea id="comment" className={cn('textarea')} name='textarea' value={text} onChange={callbacks.onChange}/>
      <div className={cn('controls')}>
        <button disabled={text ? false : true} className={cn('button')} type='submit'>{props.t('reply.send')}</button>
        {/* добавляем кнопку отмены к форме ответа на комментарий */}
        {!isArticleComment && <button className={cn('button')} type='button' onClick={props.onCancel}>{props.t('reply.cancel')}</button>}
      </div>
    </form>
  )
}

export default React.memo(CommentForm)

CommentForm.propTypes = {
  parentId: propTypes.string,
  commentType: propTypes.string,
  onCancel: propTypes.func,
  onAdd: propTypes.func,
  t: propTypes.func
}

CommentForm.defaultProps = {
  onCancel: () => {},
  onAdd: () => {},
  t: (text) => text
}