import React from 'react';
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import dateFormating from '../../utils/date-formatting';
import treeToList from '../../utils/tree-to-list';

function Comment({ comment, level, ...props }) {
  const cn = bem('Comment');

  const parentId = !props.parentId ? comment._id : props.parentId;

  const paddingLeft = (level > 0 && level < 10) ? 30 : 0;
  const name = comment.author.profile?.name ? comment.author.profile.name : props.name;
  const childrenOfMaxNesting = level === 8
    ? treeToList(comment.children, (item) => ({
      _id: item._id,
      dateCreate: item.dateCreate,
      author: item.author,
      text: item.text
    }))
    : [];

  return (
    <div style={{ paddingLeft: paddingLeft }} className={cn()}>
      <div className={cn('head')}>
        <div className={cn('name')}>{name}</div>
        <div className={cn('time')}>{dateFormating(comment.dateCreate)}</div>
      </div>
      <div className={cn('body')}>{comment.text}</div>
      <a className={cn('link')} onClick={() => props.setVisibleTextArea({ parentId: parentId, name: name })}>Ответить</a>
      {level < 8
        ? comment.children.map(item =>
          <div key={item._id} className={cn('child')}>
            {props.renderItem(item, level + 1)}
          </div>
        )
        : childrenOfMaxNesting.map(item =>
          <div key={item._id} className={cn('child')}>
            {props.renderItem(item, level + 1, comment._id)}
          </div>)
      }
      {(comment._id === props.visibleTextArea.parentId) &&
        <div className={cn('form')}>
          {props.renderForm(parentId)}
        </div>
      }
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
  level: propTypes.number.isRequired,
  setVisibleTextArea: propTypes.func.isRequired,
  visibleTextArea: propTypes.object.isRequired,
  name: propTypes.string,
  renderItem: propTypes.func,
  renderForm: propTypes.func,
}

Comment.defaultProps = {
  name: '',
  renderItem: (item, level) => {
    return item.toString()
  },
  renderForm: (id) => { },
}

export default React.memo(Comment)