import propTypes from 'prop-types'
import React from 'react'
import format from '../../utils/formatDate'
import depthPadding from '../../utils/depthPadding'
import './styles.css'

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
    <div className='ArticleComment' style={depthPadding(depth)}>
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

ArticleComment.propTypes = {
  depth: propTypes.number,
  id: propTypes.string.isRequired,
  user: propTypes.object.isRequired,
  date: propTypes.string,
  text: propTypes.string,
  onReply: propTypes.func,
  me: propTypes.string
}
ArticleComment.defaultProps = {
  depth: 0,
  date: new Date(0).toString(),
  text: 'undefined',
  onReply: () => {},
  me: '-1'
}

export default React.memo(ArticleComment)