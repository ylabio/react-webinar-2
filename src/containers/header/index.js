import React, { useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import Select from '../../components/select';
import LoginNav from '../../components/login-nav';
import LayoutFlex from '../../components/layout-flex';

function Header() {
	const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
		user: state.auth.user
  }));

	const {lang, setLang, t} = useTranslate();
	
  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

	const callbacks = {
    onLogout: useCallback(() => store.get('auth').logout(), []),
  };

	return (
		<>
			<LoginNav isAuth={select.isAuth} user={select.user} onLogout={callbacks.onLogout}/>
			<LayoutFlex flex="between" backgroundColor="gray">
				<h1>{t('title')}</h1>
				<Select onChange={setLang} value={lang} options={options.lang}/>
			</LayoutFlex>
		</>
	)
}

export default React.memo(Header);