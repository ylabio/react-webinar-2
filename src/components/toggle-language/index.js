import {cn as bem} from "@bem-react/classname";
import React, {useCallback} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import './style.css'

const LANGUAGES = ['en','ru'];

function ToggleLanguage() {
  const cn = bem('ToggleLanguage');
  console.log('ToggleLanguage');

  const store = useStore();
  const select = useSelector(state => ({
    language: state.language.language,
  }));

  const callbacks = {
    selectLanguage: useCallback((language) => store.get('language').selectLanguage(language), []),
  };

  return (
    <div className={cn('wrapper')}>
    {LANGUAGES.map(item=>  <p key={item} className={cn('item',{active: item ===select.language})} onClick={()=>callbacks.selectLanguage(item)}>{item}</p>
    )}
    </div>
  );
}

export default React.memo(ToggleLanguage);
