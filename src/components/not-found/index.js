import React from "react"
import './styles.css';
import changeLanguage from "../../utils/changeLanguage";

function NotFound(props) {

  return (
    <div className="NotFound">{changeLanguage(props.language, 'EMPTY_PAGE')}</div>
  )
}

export default React.memo(NotFound)