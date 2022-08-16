import React from 'react'
import "./style.css";

const ProgressBar = () => {
  return (
    <span className="Progressbar" role="progressbar">
      <span className="Progressbar-inner"></span>
      <span className="Progressbar-inner2"></span>
    </span>
  );
};

export default ProgressBar;