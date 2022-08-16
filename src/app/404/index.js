import React from 'react';
import LayoutError from '../../components/layout-error';
import dictionary from '../../dictionary';

function Error404() {

  let lang = 1;
  switch(navigator.language){
    case 'ru-RU': lang = 1;
      break;
    case 'fn-FN': lang = 2;
      break;
    default: lang = 0;
  }

  return (
    <LayoutError errorText={dictionary.error404[lang]}>
    </LayoutError>
  )
}

export default React.memo(Error404);
