import { cn as bem } from "@bem-react/classname";
import React, { useCallback, useMemo, useState } from 'react';
import json from '../../localization.json';
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

  const array = useMemo(() => { // достаточно посчитать всего 1 раз
    const tmp = [];
    Object.keys(json.languages).forEach((key, index) => {
      tmp.push(key);
    });
    return tmp;
  }, []);
  
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