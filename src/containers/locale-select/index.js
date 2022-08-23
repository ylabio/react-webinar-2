import React, {useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import SelectSorting from "../../components/select-sorting";

function LocaleSelect() {

  const {lang, setLang, t} = useTranslate();


  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <SelectSorting onChange={setLang} value={lang} options={options.lang}/>
  );
}

export default React.memo(LocaleSelect);
