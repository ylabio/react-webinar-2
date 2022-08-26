import React from 'react'
import './styles.css'

const format = (dateString) => {
  const dateFormat = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
  })
  const date = new Date(dateString)
  return dateFormat.format(date).replace('г.,', 'в')
}

function ArticleComment({
  depth,
  id,
  user,
  date,
  text,
  onReply,
  me
}) {

  return (
    <div className='ArticleComment' style={{paddingLeft: 30 * depth > 150 ? 150 : 30 * depth}}>
      <div className='ArticleComment-head'>
        <span className={`ArticleComment-name ${me == user._id ? 'ArticleComment-name__me' : ''}`}>{user.name}</span>
        <span className='ArticleComment-date'>{format(date)}</span>
      </div>
      <div className='ArticleComment-text'>
        {text}
      </div>
      <div className='ArticleComment-reply' onClick={() => onReply(id)}>
        Ответить
      </div>
    </div>
  )
}

export default ArticleComment