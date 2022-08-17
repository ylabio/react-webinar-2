import React from "react";
import { Link } from "react-router-dom";
import './style.css';

function HeaderNotfFound() {
  return (
    <div className="HeaderNotfFound-container">
      <Link to='/'>Главная</Link>
    </div>
  )
}

export default React.memo(HeaderNotfFound);
