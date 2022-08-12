import React from 'react';
import useSelector from '../../utils/use-selector';
import translation from './translation';

function Translate({ text }) {
  if (!text) return null;

  const { language } = useSelector(state => ({
    language: state.language.language,
  }));

  let data;

 
  for (const item in translation) {
    const current = translation[item];
    const fileText = current.ru.toLowerCase().trim();
    const formatted = text.toLowerCase().trim();


    if (fileText === formatted) {
      data = current;
      break;
    }
  }

  if (!data) throw Error('No translation found!');

  const translated = language === 'ru' ? data.ru : data.en;

  return <>{translated}</>
}

export default Translate;