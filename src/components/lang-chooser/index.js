import { cn as bem } from "@bem-react/classname";
import React, { useCallback, useState } from 'react';
import localization from '../../localization.json';
import useStore from '../../utils/use-store';
import './style.css';

function LanguageChooser() {
  const cn = bem('LangChooser');
  const store = useStore();
  const [lang, setLang] = useState(store.get('localization').getLanguage());

  const callbacks = {
    // Смена языка интерфейса
    changeLanguage: useCallback(id => {
      setLang(id);
      store.get('localization').setLanguage(id)
    }, []),
  }

  const array = [];
  Object.keys(localization.languages).forEach((key, index) => {
    array.push(key);
  });
  
  return (
    <div className={cn()}>
    {
      array.map((value, index) => {
      
        let style;
        switch (value) {
          default: style = 'normal'; break;
          case lang: style = 'selected'; break;
        }

        return <div
          className={cn(style)}
          key={index}
          onClick={
            lang == value ? null : (e) => { callbacks.changeLanguage(value) }
          }
        >{value}</div>
      })

    }
    </div>
  );
};

export default React.memo(LanguageChooser);