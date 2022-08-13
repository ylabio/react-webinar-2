import React from "react"
import './styles.css';
import changeLanguage from "../../utils/changeLanguage";
import propTypes from 'prop-types';

function NotFound(props) {

  return (
    <div className="NotFound">{changeLanguage(props.language, 'EMPTY_PAGE')}</div>
  )
}

NotFound.propTypes = {
  language: propTypes.string.isRequired
}

export default React.memo(NotFound)