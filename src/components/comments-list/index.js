import React from 'react'
import './styles.css'

function CommentsList({
  items,
  renderItem
}) {
  return (
    <div className='CommentsList'>
      <h2>Комментарии{`(${~(items.length - 1) && items.length - 1})`}: </h2>
      {items?.map(item => renderItem(item))}
    </div>
  )
}

export default CommentsList