import React, {useCallback, useState} from 'react';

const LocalisationContext = React.createContext();
function LocalisationProvider({children}) {
  const [lang, setLang] = useState('ru');
  const switchLanguage = useCallback(iso => {
    setLang(iso)
  }, [lang]);

  return (
    <div>
      <LocalisationContext.Provider value={{lang, switchLanguage}}>
        {children}
      </LocalisationContext.Provider>
    </div>
  );
}

export {LocalisationContext, LocalisationProvider}
