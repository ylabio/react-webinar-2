import React, { useCallback } from 'react';
import propTypes from 'prop-types';

const selectOptions = ['RU', 'EN'];

function LanguageSelect(props) {
	const callbacks = {
    setCurrLanguage: useCallback((e) => props.setCurrLanguage(e.target.value), [props.setCurrLanguage, props.currLanguage])
  };

	return (
		<select value={props.currLanguage} onChange={callbacks.setCurrLanguage}>
			{selectOptions.map((selectOption, index) => <option value={selectOption} key={`option_${index}`}>{selectOption}</option>)}
		</select>
	)
}

LanguageSelect.propTypes = {
	currLanguage: propTypes.string,
  setCurrLanguage: propTypes.func
}

LanguageSelect.defaultProps = {
  currLanguage: 'RU',
	setCurrLanguage: () => {}
}

export default LanguageSelect;