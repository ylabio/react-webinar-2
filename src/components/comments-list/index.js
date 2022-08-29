import React from 'react'
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css'

function CommentsList(props) {
  const cn = bem("CommentsList")

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>{props.t('comments.title')}: ({props.count})</h2>
      {props.comments.map((comment) => 
        <React.Fragment key={comment._id}>
          <div className={cn('item')} style={{marginLeft: `${comment.indent < 600 ? comment.indent : 600}px`}}>
            {/* рендер комментария */}
            {props.renderComment(comment)}
          </div>
          {/* рендер формы ответа к комментарию */}
          {comment._id === props.replyId && props.renderForm(props.t, 'comment', comment._id, comment.indent)}
        </React.Fragment>
      )}
      {/* рендер формы ответа к товару, показываем когда не активна форма ответа к комментарию */}
      {!props.replyId && props.renderForm(props.t, 'article', props.articleId)}
    </div>
  )
}

export default React.memo(CommentsList)

CommentsList.propTypes = {
  articleId: propTypes.string,
  replyId: propTypes.string,
  comments: propTypes.arrayOf(propTypes.object),
  count: propTypes.number,
  renderComment: propTypes.func,
  renderForm: propTypes.func,
  t: propTypes.func
}

CommentsList.defaultProps = {
  comments: [],
  count: 0,
  renderComment: () => {},
  renderForm: () => {},
  t: (text) => text
}