import React, {useCallback} from 'react'
import useStore from "../../utils/use-store";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import SwitcherLang from '../switcher-lang'

function Header({title}) {
  const cn = bem('Header');
  const store = useStore();

	const callbacks = {
    changeLanguage: useCallback((id) => store.get('catalog').changeLanguage(id), []),
	}
	return (
		<div className={cn()}>
			<h1>{title}</h1>
			<SwitcherLang className={cn('item')} callback={callbacks.changeLanguage}/>
		</div>
		
	)
}

export default Header;