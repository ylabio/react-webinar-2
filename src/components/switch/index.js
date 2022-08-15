import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import style from './style.css';

const cn = bem('Switch');

function Switch(){
  const store = useStore();

  const select = useSelector(state => ({
	  lang: state.common.language
  }));

  const callbacks = {
	  setLanguage: useCallback(() => {store.get('common').setLanguage()}, []),
  };

	return (
	  <div className={cn()}>
		  <span>Ру</span>
		  <label className={cn('container')}>
			  <input type="checkbox" onChange={callbacks.setLanguage} checked={select.lang === 'en'}/>
			  <span className={cn('slider round')} />
		  </label>
		  <span>En</span>
	  </div>
  );
}

export default React.memo(Switch);
