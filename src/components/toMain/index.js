import React from 'react';
import { Link } from 'react-router-dom';

function ToMain({ language, words }) {
  console.log('TOMAIN', words);
  return (
    <Link className='Link' to='/'>
      {language == 'ru' ? words.ru.buttonToMain : words.eng.buttonToMain}
    </Link>
  );
}

export default ToMain;
