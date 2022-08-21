import React, { useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';
import LoginNav from '../../components/login-nav';
import LayoutFlex from '../../components/layout-flex';

function Header() {
	const {lang, setLang, t} = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

	return (
		<>
			<LoginNav />
			<LayoutFlex flex="between" backgroundColor="gray">
				<h1>{t('title')}</h1>
				<Select onChange={setLang} value={lang} options={options.lang}/>
			</LayoutFlex>
		</>
	)
}

export default Header;