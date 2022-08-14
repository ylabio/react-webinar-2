import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import langs from "../../utils/langs";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Language({ lang, onSelectChange }) {
  const cn = bem('Language');

  const callbacks = {
    onChange: useCallback((e) => onSelectChange(e.target.value), [])
  };

  return (
    <select className={cn()} value={lang} onChange={callbacks.onChange}>
			{langs.map((elem) => <option key={elem.lang} value={elem.lang}>{elem.lang}</option>)}
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
