import React from 'react';
import useStore from '../../utils/use-store';
import LanguageLayout from '../../components/language-layout';

function Language() {
  const store = useStore();

  const callbacks = {
    changeToEng: React.useCallback(() => {
      store.get('language').changeLang('eng');
    }, []),
    changeToRu: React.useCallback(() => {
      store.get('language').changeLang('ru');
    }, []),
  };

  return (
    <LanguageLayout
      changeToRu={callbacks.changeToRu}
      changeToEng={callbacks.changeToEng}
    />
  );
}

export default Language;
