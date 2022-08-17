import React from 'react';
import './style.css';
import Select from "../language-select";
import propTypes from "prop-types";

function PageHead(props){
  return (
    <div className='PageHead'>
      <h1>{props.title}</h1>
      <Select changeLanguage={props.changeLanguage} language={props.language}/>
    </div>
  )
}

PageHead.propTypes = {
  title: propTypes.string,
  language: propTypes.string,
  changeLanguage: propTypes.func,
}

PageHead.defaultProps = {
}

export default React.memo(PageHead);
