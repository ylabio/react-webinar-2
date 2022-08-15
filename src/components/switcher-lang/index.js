import React from 'react';
import {languages} from './../../utils/localisation';

function SwitcherLang(props) {
	const handleChange = (e) =>{
		props.callback(e.target.value)}
  return (
    <select
      className={props.className}
      onChange={handleChange}
      name='language'
      id='lang-select'
    >
      {languages.map((lang, index) => (
        <option value={index}>{lang}</option>
      ))}
    </select>
  );
}

export default SwitcherLang;
