import React from 'react'
import propTypes from 'prop-types'
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

CommentsList.propTypes = {
  items: propTypes.array,
  renderItem: propTypes.func.isRequired
}
CommentsList.defaultProps = {
  items: []
}

export default React.memo(CommentsList)