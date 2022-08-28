import React, {useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";

function LocaleSelect() {

  const {lang, setLang, t} = useTranslate();

  const options = {
    lang: useMemo(() => ([
      {_id: 'ru', title: 'Русский'},
      {_id: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Select onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default React.memo(LocaleSelect);
