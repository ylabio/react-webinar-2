import React from 'react';
import PropTypes from "prop-types";
import './style.css';

function ArticleComments(props) {

  return (
    <div className="ArticleComments">
      {props.children}
    </div>
  )
}

ArticleComments.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(ArticleComments);
