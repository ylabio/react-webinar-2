import React, {useCallback} from 'react'
import useStore from "../../utils/use-store";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import SwitcherLang from '../switcher-lang'
import {langVars} from '../../utils/localisation'

function Header(props) {
  const cn = bem('Header');
  const store = useStore();

	const callbacks = {
    changeLanguage: useCallback((id) => store.get('catalog').changeLanguage(id), []),
	}
	return (
		<div className={cn()}>
			<h1>{langVars.main.heading[props.lang]}</h1>
			<SwitcherLang lang={props.lang} className={cn('item')} callback={callbacks.changeLanguage}/>
		</div>
		
	)
}

export default Header;