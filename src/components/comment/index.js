import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import numberFormat from "../../utils/number-format";
import './style.css';

function Comment({comment}) {

  // CSS классы по БЭМ
  const cn = bem('Comment');

  return (
    <div style={{paddingLeft: `${comment.level*40}px`}} className={cn()}>
      
      <div className={cn('header')}>
        <span className={cn('userName')}>{comment.author?.profile?.name} </span>
        <span className={cn('date')}>{comment.dateCreate}</span>
      </div>

      <div className={cn('text')}>{comment.text}</div>

      <button className={cn('btn')} onClick={() => {}}>Ответить</button>

    </div>
  )
}

Comment.propTypes = {
}

Comment.defaultProps = {
}

export default React.memo(Comment);
