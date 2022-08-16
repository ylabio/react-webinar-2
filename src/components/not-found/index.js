import React from "react"
import './style.css';
import propTypes from 'prop-types';

function NotFound(props) {

  return (
    <div className="NotFound">{props.translate(props.language, 'EMPTY_PAGE') || 'Такой страницы не существует'}</div>
  )
}

NotFound.propTypes = {
  translate: propTypes.func.isRequired,
  language: propTypes.string.isRequired
}

NotFound.defaultProps = {
  translate: () => {},
};

export default React.memo(NotFound)