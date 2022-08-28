import React from 'react';
import propTypes  from 'prop-types';
import './styles.css'

const CommentsTitle = (props) => {
  return (
    <div className="Comments-title">
      {props.title} ({props.count})
    </div>
  );
};

CommentsTitle.propTypes = {
  title: propTypes.string,
  count: propTypes.number
}

CommentsTitle.defaultProps = {
  title: "Комментарии",
  count: 0
}

export default React.memo(CommentsTitle);