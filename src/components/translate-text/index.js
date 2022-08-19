import React from 'react';
import dictonary from '../../dictonary';
import useSelector from '../../utils/use-selector';

function TranslateText(props) {
	const currLanguage = useSelector(state => state.language.currLanguage);

	return dictonary[currLanguage][props.tid];
}

export default TranslateText;