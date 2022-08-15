import { useState } from 'react';
import langsJson from '../langs.json';

export default function useLocalStorage() {
  const languageStoredInLocalStorage = localStorage.getItem('language');
  const [language, setLanguage] = useState(
    languageStoredInLocalStorage ? languageStoredInLocalStorage : 'Russian'
  );

  const storeLanguageInLocalStorage = (language) => {
    localStorage.setItem('language', language);
  };

  const handleSetLanguage = (language) => {
    setLanguage(language);
    storeLanguageInLocalStorage(language);
  };

  let content;

  language === 'Russian'
    ? (content = langsJson.content.Russian)
    : (content = langsJson.content.English);

  return [language, handleSetLanguage, content];
}
