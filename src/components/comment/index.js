import { cn as bem } from "@bem-react/classname";
import React, { useMemo } from 'react';
import "./style.css"
import propTypes from 'prop-types';


function Comment({ comment }) {

  const { author, text, dateCreate, padding } = comment
  const cn = bem('Comment');

  return (
    <div className={cn("")} >
      <div style={{ paddingLeft: padding }}>
        <p className={cn('info')}>
          User №1
          <span>
            {dateCreate}
          </span>
        </p>
        <div className={cn('text')}>
          {text}
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
}

export default React.memo(Comment);
