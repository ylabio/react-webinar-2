import React, {useCallback} from 'react'
import useStore from "../../utils/use-store";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import SwitcherLang from '../switcher-lang'
import propTypes from 'prop-types';

function Header(props) {
  const cn = bem('Header');
  const store = useStore();

	const callbacks = {
    changeLanguage: useCallback((id) => store.get('catalog').changeLanguage(id), []),
	}
	return (
		<div className={cn()}>
			<h1>{props.title}</h1>
			<SwitcherLang lang={props.lang} className={cn('item')} callback={callbacks.changeLanguage}/>
		</div>
		
	)
}
Header.propTypes = {
  title: propTypes.string,
  lang: propTypes.number,
}

Header.defaultProps = {
}

export default React.memo(Header);