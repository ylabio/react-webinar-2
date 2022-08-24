import React, {useMemo} from 'react';
import Select from '../../components/common/select';
import useTranslate from '../../hooks/use-translate';

function LocaleSelect() {
  const {lang, setLang, t} = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        {value: 'ru', title: 'Русский'},
        {value: 'en', title: 'English'}
      ],
      []
    )
  };

  return <Select onChange={setLang} value={lang} options={options.lang} />;
}

export default React.memo(LocaleSelect);
