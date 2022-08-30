import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsCounter(props) {
  const cn = bem('CommentsCounter');

  return (
    <div className={cn()}>
      <p>Комментарии ({props.length})</p>
    </div>
  )
}

CommentsCounter.propTypes = {
  length: propTypes.number.isRequired
}

CommentsCounter.defaultProps = {
 length: 0
}

export default React.memo(CommentsCounter);
