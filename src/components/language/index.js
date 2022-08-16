import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import words from "../../utils/words";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Language({ lang, onSelectChange }) {
  const cn = bem('Language');

  const callbacks = {
    onChange: useCallback((e) => onSelectChange(e.target.value), [])
  };

  return (
    <select className={cn()} value={lang} onChange={callbacks.onChange}>
			{Object.keys(words).map((elem) => <option key={elem} value={elem}>{elem}</option>)}
		</select>
  )
}

Language.propTypes = {
  lang: propTypes.string.isRequired,
  onSelectChange: propTypes.func,
}

Language.defaultProps = {
}

export default React.memo(Language);
