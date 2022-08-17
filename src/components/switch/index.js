import propTypes from 'prop-types';
import React from 'react';
import {cn as bem} from "@bem-react/classname";
import style from './style.css';

const cn = bem('Switch');

function Switch({setLanguage, lang}){
	return (
	  <div className={cn()}>
	    <span>Ру</span>
	      <label className={cn('container')}>
		    <input type="checkbox" onChange={setLanguage} checked={lang === 'en'}/>
		    <span className={cn('slider round')} />
		  </label>
		  <span>En</span>
	  </div>
  );
}

Switch.propTypes = {
  setLanguage: propTypes.func,
  lang: propTypes.string
}

Switch.defaultProps = {
  setLanguage: ()=>{},
  lang: 'ru'
}

export default React.memo(Switch);
