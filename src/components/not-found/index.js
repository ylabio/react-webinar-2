import React from "react"
import './style.css';
import propTypes from 'prop-types';

function NotFound(props) {

  return (
    <div className="NotFound">{props.translate(props.language, props.codesNotFound.CODE_14) || 'Такой страницы не существует'}</div>
  )
}

NotFound.propTypes = {
  codesNotFound: propTypes.object.isRequired,
  translate: propTypes.func.isRequired,
  language: propTypes.string.isRequired,
}

NotFound.defaultProps = {
  codesNotFound: {},
  translate: () => {},
};

export default React.memo(NotFound)