import React from 'react';
import './styles.css';

function Select(props) {
  return (
    <div className="Select">
      <select className="Select-menu" value={props.language} onChange={(e)=>props.changeLanguage(e.target.value)}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
    </div>
  )
}

Select.propTypes = {}

Select.defaultProps = {}

export default React.memo(Select);
